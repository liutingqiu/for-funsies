from pathlib import Path
import re
import subprocess


ROOT = Path(__file__).parent
HTML = ROOT / "site" / "throughput.html"
CSS = ROOT / "site" / "throughput.css"
JS = ROOT / "site" / "throughput.js"


def test_throughput_workbench_is_time_driven_and_wired():
    html = HTML.read_text(encoding="utf-8")
    css = CSS.read_text(encoding="utf-8")
    js = JS.read_text(encoding="utf-8")

    assert re.search(r'<link[^>]+href=["\'](?:\.\/)?throughput\.css["\']', html)
    assert re.search(r'<script[^>]+src=["\'](?:\.\/)?throughput\.js["\']', html)

    page_text = html.lower()
    assert any(term in page_text for term in ("workbench", "throughput", "processing", "queue"))
    assert any(term in page_text for term in ("status", "progress", "task"))
    assert "display" in css or "grid" in css or "flex" in css

    assert re.search(r"(?:const|let|var)\s+\w+\s*=\s*\[", js)
    assert re.search(r"set(?:Interval|Timeout)\s*\(", js)
    assert re.search(r"(?:status|progress|completed|processing|queue)", js, re.IGNORECASE)
    assert re.search(r"(?:textContent|innerHTML|classList|style\.)", js)

    subprocess.run(["node", "--check", str(JS)], check=True, capture_output=True, text=True)
