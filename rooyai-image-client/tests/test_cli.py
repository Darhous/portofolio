from __future__ import annotations

from pathlib import Path

import pytest

from rooyai_client import ImageResult, InsufficientCreditsError, ModelUnavailableError
from rooyai_client import cli as cli_module


class FakeClient:
    """يحاكي RooyaiClient دون أي اتصال شبكي فعلي."""

    instances: list["FakeClient"] = []

    def __init__(self, **kwargs) -> None:
        self.kwargs = kwargs
        self.generate_result = ImageResult(id="fake", base64_data="aGVsbG8=")
        self.generate_exception: Exception | None = None
        self.edit_result = ImageResult(id="fake-edit", base64_data="aGVsbG8=")
        self.edit_exception: Exception | None = None
        FakeClient.instances.append(self)

    def generate(self, prompt, **kwargs):
        if self.generate_exception:
            raise self.generate_exception
        return self.generate_result

    def edit(self, prompt, images, **kwargs):
        if self.edit_exception:
            raise self.edit_exception
        return self.edit_result


@pytest.fixture(autouse=True)
def fake_client(monkeypatch):
    FakeClient.instances.clear()
    monkeypatch.setattr(cli_module, "RooyaiClient", FakeClient)
    monkeypatch.setenv("ROOYAI_API_KEY", "env-key")
    return FakeClient


def test_generate_missing_api_key_exits_with_code_2(monkeypatch, capsys):
    monkeypatch.delenv("ROOYAI_API_KEY", raising=False)
    with pytest.raises(SystemExit) as excinfo:
        cli_module.main(["generate", "a cat"])
    assert excinfo.value.code == 2
    captured = capsys.readouterr()
    assert "مفتاح API" in captured.err


def test_generate_success_prints_arabic_message_by_default(capsys):
    exit_code = cli_module.main(["generate", "قطة"])
    assert exit_code == 0
    captured = capsys.readouterr()
    assert "لم يُطلب حفظ" in captured.out


def test_generate_success_english_lang(capsys):
    exit_code = cli_module.main(["--lang", "en", "generate", "a cat"])
    assert exit_code == 0
    captured = capsys.readouterr()
    assert "nothing saved" in captured.out


def test_generate_saves_output_file(tmp_path: Path):
    output = tmp_path / "cat.png"
    exit_code = cli_module.main(["generate", "قطة", "--output", str(output)])
    assert exit_code == 0
    assert output.read_bytes() == b"hello"


def test_generate_insufficient_credits_error_arabic(monkeypatch, capsys):
    class RaisingClient(FakeClient):
        def generate(self, prompt, **kwargs):
            raise InsufficientCreditsError("no credits", status_code=402)

    monkeypatch.setattr(cli_module, "RooyaiClient", RaisingClient)
    exit_code = cli_module.main(["generate", "قطة"])

    assert exit_code == 1
    captured = capsys.readouterr()
    assert "الرصيد غير كافٍ" in captured.err


def test_edit_requires_at_least_one_image_value_error(capsys):
    exit_code = cli_module.main(["edit", "make it blue"])
    assert exit_code == 2
    captured = capsys.readouterr()
    assert captured.err  # رسالة خطأ ما ظهرت


def test_edit_success_with_image(capsys):
    exit_code = cli_module.main(["edit", "make it blue", "--image", "https://a.com/1.png"])
    assert exit_code == 0


def test_models_check_ok(capsys):
    exit_code = cli_module.main(["models-check", "--model", "ultra"])
    assert exit_code == 0
    captured = capsys.readouterr()
    assert "يعمل بشكل طبيعي" in captured.out


def test_models_check_unavailable(monkeypatch, capsys):
    class UnavailableClient(FakeClient):
        def generate(self, prompt, **kwargs):
            raise ModelUnavailableError("down", status_code=403)

    monkeypatch.setattr(cli_module, "RooyaiClient", UnavailableClient)
    exit_code = cli_module.main(["models-check", "--model", "z-image-turbo"])
    assert exit_code == 1
    captured = capsys.readouterr()
    assert "معطّل مؤقتاً" in captured.out


def test_models_check_insufficient_credits_reports_ok_status(monkeypatch, capsys):
    class NoCreditsClient(FakeClient):
        def generate(self, prompt, **kwargs):
            raise InsufficientCreditsError("no credits", status_code=402)

    monkeypatch.setattr(cli_module, "RooyaiClient", NoCreditsClient)
    exit_code = cli_module.main(["models-check", "--model", "ultra"])
    assert exit_code == 0
    captured = capsys.readouterr()
    assert "الرصيد غير كافٍ" in captured.out
