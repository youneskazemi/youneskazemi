from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

RAW = Path(r"D:\youneskazemi\public\projects\project_png_raw")
OUT = Path(r"D:\youneskazemi\public\projects\covers")
OUT.mkdir(parents=True, exist_ok=True)

jobs = [
    ("latorin.png", "latorin", "hero"),
    ("apex78.png", "apex78", "hero"),
    ("rimelcosmetics.png", "rimelcosmetics", "hero"),
    ("gallerychiic.png", "gallerychiic", "hero"),
    ("jrfit.png", "jrfit", "hero"),
    ("rayan_ai.png", "rayan-ai", "hero"),
    ("ticktom.png", "ticktom", "contain"),
]

TARGET_W, TARGET_H = 1600, 1000

def crop_hero(im: Image.Image) -> Image.Image:
    w, h = im.size
    target_ratio = TARGET_W / TARGET_H
    crop_h = int(w / target_ratio)
    if crop_h > h:
        crop_h = h
        crop_w = int(h * target_ratio)
        left = (w - crop_w) // 2
        box = (left, 0, left + crop_w, h)
    else:
        box = (0, 0, w, crop_h)
    return im.crop(box)

def fit_contain(im: Image.Image, bg=(8, 10, 14)) -> Image.Image:
    canvas = Image.new("RGB", (TARGET_W, TARGET_H), bg)
    im = im.convert("RGBA")
    pad = 0.86
    max_w, max_h = int(TARGET_W * pad), int(TARGET_H * pad)
    ratio = min(max_w / im.width, max_h / im.height)
    nw, nh = int(im.width * ratio), int(im.height * ratio)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x, y = (TARGET_W - nw) // 2, (TARGET_H - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas

def polish(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    im = im.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.04)
    im = ImageEnhance.Sharpness(im).enhance(1.12)
    return im

def soft_edge(im: Image.Image) -> Image.Image:
    w, h = im.size
    edge = Image.new("L", (w, h), 0)
    ed = ImageDraw.Draw(edge)
    for i in range(0, 24):
        a = int(36 * (i / 23))
        ed.rectangle([i, i, w - 1 - i, h - 1 - i], outline=a)
    edge = edge.filter(ImageFilter.GaussianBlur(10))
    dark = Image.new("RGB", (w, h), (5, 6, 8))
    return Image.composite(dark, im, edge)

for fname, slug, mode in jobs:
    src = RAW / fname
    if not src.exists():
        print("MISSING", slug)
        continue
    im = Image.open(src)
    if mode == "hero":
        im = polish(crop_hero(im))
        im = soft_edge(im)
    else:
        im = fit_contain(im)
        im = ImageEnhance.Contrast(im).enhance(1.05)
        im = ImageEnhance.Sharpness(im).enhance(1.08)
    out = OUT / f"{slug}.jpg"
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print("OK", slug, im.size, out.stat().st_size)
print("done")
