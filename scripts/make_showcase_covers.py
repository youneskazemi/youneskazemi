from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

RAW = Path(r"D:\youneskazemi\public\projects\project_png_raw")
OUT = Path(r"D:\youneskazemi\public\projects\covers")
OUT.mkdir(parents=True, exist_ok=True)

# Canvas 16:10
CW, CH = 1600, 1000
BG = (5, 5, 8)

jobs = [
    # (raw, slug, mode, accent RGB)
    ("latorin.png", "latorin", "browser", (16, 185, 129)),
    ("apex78.png", "apex78", "browser", (167, 139, 250)),
    ("gallerychiic.png", "gallerychiic", "browser", (212, 165, 116)),
    ("jrfit.png", "jrfit", "browser", (59, 130, 246)),
    ("rayan_ai.png", "rayan-ai", "browser", (96, 165, 250)),
    ("rimelcosmetics.png", "rimelcosmetics", "browser", (190, 24, 93)),
    ("ticktom.png", "ticktom", "phone", (245, 158, 11)),
    ("cadinu.png", "cadinu", "browser", (99, 102, 241)),
    ("cadinu-viewport.png", "cadinu", "browser", (99, 102, 241)),  # fallback overwrite with viewport if better
    ("avcafebakery.png", "avcafebakery", "browser", (180, 83, 9)),
]

def crop_hero(im: Image.Image, ratio=16 / 10) -> Image.Image:
    w, h = im.size
    crop_h = int(w / ratio)
    if crop_h > h:
        crop_h = h
        crop_w = int(h * ratio)
        left = (w - crop_w) // 2
        return im.crop((left, 0, left + crop_w, h))
    return im.crop((0, 0, w, crop_h))

def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m

def soft_glow(canvas: Image.Image, box, color, blur=80, alpha=55):
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x0, y0, x1, y1 = box
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    rx, ry = (x1 - x0) // 2 + 40, (y1 - y0) // 2 + 40
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(*color, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(canvas.convert("RGBA"), layer)

def draw_browser(screen: Image.Image, accent, domain_hint=""):
    # screen already RGB, desired inner size
    chrome_h = 44
    pad = 3
    radius = 18
    bw, bh = screen.size[0] + pad * 2, screen.size[1] + chrome_h + pad
    browser = Image.new("RGBA", (bw, bh), (12, 12, 18, 255))
    # chrome bar
    d = ImageDraw.Draw(browser)
    d.rounded_rectangle([0, 0, bw - 1, bh - 1], radius=radius, fill=(14, 14, 20, 255))
    d.rectangle([0, chrome_h - 1, bw, chrome_h], fill=(255, 255, 255, 18))
    # traffic lights
    for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        x = 18 + i * 18
        d.ellipse([x, 15, x + 11, 26], fill=(*c, 220))
    # url pill
    url_l, url_r = 78, bw - 18
    d.rounded_rectangle([url_l, 10, url_r, 34], radius=8, fill=(0, 0, 0, 140))
    # paste screen
    browser.paste(screen.convert("RGB"), (pad, chrome_h))
    # clip outer rounded
    mask = rounded_mask((bw, bh), radius)
    out = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    out.paste(browser, (0, 0))
    out.putalpha(mask)
    return out

def draw_phone(screen: Image.Image, accent):
    # phone bezel
    sw, sh = screen.size
    # scale screen to phone proportions roughly
    target_h = 820
    ratio = target_h / sh
    nw, nh = int(sw * ratio), target_h
    screen = screen.resize((nw, nh), Image.Resampling.LANCZOS)
    bezel = 14
    top, bot = 36, 28
    pw, ph = nw + bezel * 2, nh + top + bot
    phone = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
    d = ImageDraw.Draw(phone)
    d.rounded_rectangle([0, 0, pw - 1, ph - 1], radius=42, fill=(18, 18, 22, 255))
    d.rounded_rectangle([4, 4, pw - 5, ph - 5], radius=38, fill=(8, 8, 12, 255))
    # notch-ish
    d.rounded_rectangle([pw // 2 - 40, 12, pw // 2 + 40, 22], radius=6, fill=(30, 30, 36, 255))
    # screen rounded
    smask = rounded_mask((nw, nh), 8)
    srgba = screen.convert("RGBA")
    srgba.putalpha(smask)
    phone.paste(srgba, (bezel, top), srgba)
    return phone

def drop_shadow(img: Image.Image, offset=(0, 28), blur=40, opacity=160):
    # shadow layer
    sh = Image.new("RGBA", (img.width + 120, img.height + 120), (0, 0, 0, 0))
    shadow = Image.new("RGBA", img.size, (0, 0, 0, opacity))
    shadow.putalpha(img.split()[-1] if img.mode == "RGBA" else Image.new("L", img.size, 255))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    ox, oy = 60 + offset[0], 60 + offset[1]
    sh.paste(shadow, (ox, oy), shadow)
    sh.paste(img, (60, 60), img if img.mode == "RGBA" else None)
    return sh

def compose_canvas(device: Image.Image, accent, max_w=1380, max_h=860):
    # scale device to fit canvas with margins
    ratio = min(max_w / device.width, max_h / device.height)
    nw, nh = int(device.width * ratio), int(device.height * ratio)
    device = device.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (CW, CH), (*BG, 255))
    # glow
    x = (CW - nw) // 2
    y = (CH - nh) // 2
    canvas = soft_glow(canvas, (x, y, x + nw, y + nh), accent, blur=90, alpha=48)
    # slight vignette
    vig = Image.new("L", (CW, CH), 0)
    vd = ImageDraw.Draw(vig)
    for i in range(80):
        a = int(50 * (i / 79) ** 1.5)
        vd.rectangle([i, i, CW - 1 - i, CH - 1 - i], outline=a)
    dark = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    dark.putalpha(vig.filter(ImageFilter.GaussianBlur(2)))
    # shadow under device
    sh = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.ellipse([x + 40, y + nh - 20, x + nw - 40, y + nh + 50], fill=(0, 0, 0, 100))
    sh = sh.filter(ImageFilter.GaussianBlur(28))
    canvas = Image.alpha_composite(canvas, sh)
    canvas.paste(device, (x, y), device)
    canvas = Image.alpha_composite(canvas, dark)
    return canvas.convert("RGB")

for fname, slug, mode, accent in jobs:
    src = RAW / fname
    if not src.exists():
        print("MISSING", slug)
        continue
    im = Image.open(src).convert("RGB")
    if mode == "browser":
        hero = crop_hero(im)
        # inner screenshot size
        inner_w = 1280
        ratio = hero.height / hero.width
        inner_h = int(inner_w * ratio)
        # cap height for 16:10 canvas room
        if inner_h > 720:
            inner_h = 720
            inner_w = int(inner_h / ratio)
        hero = hero.resize((inner_w, inner_h), Image.Resampling.LANCZOS)
        hero = ImageEnhance.Sharpness(hero).enhance(1.08)
        hero = ImageEnhance.Contrast(hero).enhance(1.04)
        device = draw_browser(hero, accent)
    else:
        # phone: use full image scaled
        device = draw_phone(im, accent)

    final = compose_canvas(device, accent)
    final = ImageEnhance.Contrast(final).enhance(1.03)
    out = OUT / f"{slug}.jpg"
    final.save(out, "JPEG", quality=90, optimize=True, progressive=True)
    print("OK", slug, final.size, out.stat().st_size)

print("done")
