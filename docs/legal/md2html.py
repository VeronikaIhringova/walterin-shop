"""Minimal converter for docs/legal/*.md -> Shopify policy HTML body (drops the H1; Shopify shows the policy title)."""
import re, sys, html

def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\*(.+?)\*', r'<em>\1</em>', s)
    s = re.sub(r'(?<![">])(https?://[^\s<)]+?)([.,;]?)(?=[\s)]|$|<)', r'<a href="\1">\1</a>\2', s)
    s = re.sub(r'\b([\w.+-]+@walterin\.com)\b', r'<a href="mailto:\1">\1</a>', s)
    return s

def convert(md):
    out, para, items = [], [], []
    def flush():
        nonlocal para, items
        if para: out.append('<p>' + '<br>\n'.join(inline(l) for l in para) + '</p>'); para = []
        if items: out.append('<ul>\n' + '\n'.join('<li>' + inline(i) + '</li>' for i in items) + '\n</ul>'); items = []
    for line in md.splitlines():
        if not line.strip(): flush(); continue
        if line.startswith('# '): flush(); continue
        m = re.match(r'(#{2,3}) (.*)', line)
        if m: flush(); lvl = len(m.group(1)); out.append(f'<h{lvl}>{inline(m.group(2))}</h{lvl}>'); continue
        if line.startswith('- '):
            if para: flush()
            items.append(line[2:]); continue
        if items: flush()
        para.append(line)
    flush()
    return '\n'.join(out) + '\n'

if __name__ == '__main__':
    sys.stdout.write(convert(open(sys.argv[1], encoding='utf-8').read()))
