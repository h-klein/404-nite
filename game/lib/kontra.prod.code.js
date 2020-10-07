var kontra = function () {
    let t, e, i = {};

    function s(t, e) {
        i[t] = i[t] || [], i[t].push(e)
    }

    function h(t, ...e) {
        (i[t] || []).map(t => t(...e))
    }

    function n() {
        return t
    }

    function r() {
        return e
    }
    class o {
        constructor({
            spriteSheet: t,
            frames: e,
            frameRate: i,
            loop: s = !0
        }) {
            this.spriteSheet = t, this.frames = e, this.frameRate = i, this.loop = s;
            let {
                width: h,
                height: n,
                margin: r = 0
            } = t.frame;
            this.width = h, this.height = n, this.margin = r, this._f = 0, this._a = 0
        }
        clone() {
            return new o(this)
        }
        reset() {
            this._f = 0, this._a = 0
        }
        update(t = 1 / 60) {
            if (this.loop || this._f != this.frames.length - 1)
                for (this._a += t; this._a * this.frameRate >= 1;) this._f = ++this._f % this.frames.length, this._a -= 1 / this.frameRate
        }
        render({
            x: t,
            y: e,
            width: i = this.width,
            height: s = this.height,
            context: h = r()
        }) {
            let n = this.frames[this._f] / this.spriteSheet._f | 0,
                o = this.frames[this._f] % this.spriteSheet._f | 0;
            h.drawImage(this.spriteSheet.image, o * this.width + (2 * o + 1) * this.margin, n * this.height + (2 * n + 1) * this.margin, this.width, this.height, t, e, i, s)
        }
    }

    function a() {
        return new o(...arguments)
    }
    a.prototype = o.prototype, a.class = o;
    let c = /(jpeg|jpg|gif|png)$/,
        d = /(wav|mp3|ogg|aac)$/,
        l = /^\//,
        u = /\/$/,
        p = new WeakMap,
        _ = "",
        f = "",
        g = "";

    function w(t, e) {
        return new URL(t, e).href
    }

    function m(t, e) {
        return [t.replace(u, ""), t ? e.replace(l, "") : e].filter(t => t).join("/")
    }

    function x(t) {
        return t.split(".").pop()
    }

    function y(t) {
        let e = t.replace("." + x(t), "");
        return 2 == e.split("/").length ? e.replace(l, "") : e
    }
    let b = {},
        v = {},
        A = {};

    function S() {
        window.__k || (window.__k = {
            dm: p,
            u: w,
            d: A,
            i: b
        })
    }

    function j(t) {
        return S(), new Promise((e, i) => {
            let s, n, r;
            if (s = m(_, t), b[s]) return e(b[s]);
            (n = new Image).onload = function () {
                r = w(s, window.location.href), b[y(t)] = b[s] = b[r] = this, h("assetLoaded", this, t), e(this)
            }, n.onerror = function () {
                i(s)
            }, n.src = s
        })
    }

    function C(t) {
        return new Promise((e, i) => {
            let s, n, r, o, a = t;
            return s = new Audio, n = function (t) {
                return {
                    wav: t.canPlayType('audio/wav; codecs="1"'),
                    mp3: t.canPlayType("audio/mpeg;"),
                    ogg: t.canPlayType('audio/ogg; codecs="vorbis"'),
                    aac: t.canPlayType("audio/aac;")
                }
            }(s), (t = [].concat(t).reduce((t, e) => t || (n[x(e)] ? e : null), 0)) ? (r = m(f, t), v[r] ? e(v[r]) : (s.addEventListener("canplay", function () {
                o = w(r, window.location.href), v[y(t)] = v[r] = v[o] = this, h("assetLoaded", this, t), e(this)
            }), s.onerror = function () {
                i(r)
            }, s.src = r, void s.load())) : i(a)
        })
    }

    function E(t) {
        let e, i;
        return S(), e = m(g, t), A[e] ? Promise.resolve(A[e]) : fetch(e).then(t => {
            if (!t.ok) throw t;
            return t.clone().json().catch(() => t.text())
        }).then(s => (i = w(e, window.location.href), "object" == typeof s && p.set(s, i), A[y(t)] = A[e] = A[i] = s, h("assetLoaded", s, t), s))
    }

    function O(t, e) {
        let i = Math.sin(e),
            s = Math.cos(e);
        return {
            x: t.x * s - t.y * i,
            y: t.x * i + t.y * s
        }
    }

    function k(t, e, i) {
        return Math.min(Math.max(t, i), e)
    }

    function P(t, e) {
        return t.rotation || e.rotation ? null : ([t, e] = [t, e].map(t => M(t)), t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y)
    }

    function M(t) {
        let {
            x: e,
            y: i,
            width: s,
            height: h
        } = t.world || t;
        return t.anchor && (e -= s * t.anchor.x, i -= h * t.anchor.y), s < 0 && (e += s, s *= -1), h < 0 && (i += h, h *= -1), {
            x: e,
            y: i,
            width: s,
            height: h
        }
    }
    class L {
        constructor(t = 0, e = 0, i = {}) {
            this.x = t, this.y = e, i._c && (this.clamp(i._a, i._b, i._d, i._e), this.x = t, this.y = e)
        }
        add(t) {
            return new L(this.x + t.x, this.y + t.y, this)
        }
        subtract(t) {
            return new L(this.x - t.x, this.y - t.y, this)
        }
        scale(t) {
            return new L(this.x * t, this.y * t)
        }
        normalize(t = this.length()) {
            return new L(this.x / t, this.y / t)
        }
        dot(t) {
            return this.x * t.x + this.y * t.y
        }
        length() {
            return Math.hypot(this.x, this.y)
        }
        distance(t) {
            return Math.hypot(this.x - t.x, this.y - t.y)
        }
        angle(t) {
            return Math.acos(this.dot(t) / (this.length() * t.length()))
        }
        clamp(t, e, i, s) {
            this._c = !0, this._a = t, this._b = e, this._d = i, this._e = s
        }
        get x() {
            return this._x
        }
        get y() {
            return this._y
        }
        set x(t) {
            this._x = this._c ? k(this._a, this._d, t) : t
        }
        set y(t) {
            this._y = this._c ? k(this._b, this._e, t) : t
        }
    }

    function X() {
        return new L(...arguments)
    }
    X.prototype = L.prototype, X.class = L;
    class I {
        constructor(t) {
            return this.init(t)
        }
        init(t = {}) {
            this.position = X(), this.velocity = X(), this.acceleration = X(), this.ttl = 1 / 0, Object.assign(this, t)
        }
        update(t) {
            this.advance(t)
        }
        advance(t) {
            let e = this.acceleration;
            t && (e = e.scale(t)), this.velocity = this.velocity.add(e);
            let i = this.velocity;
            t && (i = i.scale(t)), this.position = this.position.add(i), this._pc(), this.ttl--
        }
        get dx() {
            return this.velocity.x
        }
        get dy() {
            return this.velocity.y
        }
        set dx(t) {
            this.velocity.x = t
        }
        set dy(t) {
            this.velocity.y = t
        }
        get ddx() {
            return this.acceleration.x
        }
        get ddy() {
            return this.acceleration.y
        }
        set ddx(t) {
            this.acceleration.x = t
        }
        set ddy(t) {
            this.acceleration.y = t
        }
        isAlive() {
            return this.ttl > 0
        }
        _pc() {}
    }
    const Y = () => {},
        D = "position:absolute;left:-9999px";

    function T(t, e) {
        let i = e.parentNode;
        if (t.setAttribute("data-kontra", ""), i) {
            let s = i.querySelector("[data-kontra]:last-of-type") || e;
            i.insertBefore(t, s.nextSibling)
        } else document.body.appendChild(t)
    }
    class z extends I {
        init({
            width: t = 0,
            height: e = 0,
            context: i = r(),
            render: s = this.draw,
            update: h = this.advance,
            children: n = [],
            anchor: o = {
                x: 0,
                y: 0
            },
            sx: a = 0,
            sy: c = 0,
            opacity: d = 1,
            rotation: l = 0,
            scaleX: u = 1,
            scaleY: p = 1,
            ..._
        } = {}) {
            this.children = [], super.init({
                width: t,
                height: e,
                context: i,
                anchor: o,
                sx: a,
                sy: c,
                opacity: d,
                rotation: l,
                scaleX: u,
                scaleY: p,
                ..._
            }), this._di = !0, this._uw(), n.map(t => this.addChild(t)), this._rf = s, this._uf = h
        }
        update(t) {
            this._uf(t), this.children.map(t => t.update && t.update())
        }
        render(t) {
            let e = this.context;
            e.save(), (this.x || this.y) && e.translate(this.x, this.y), this.rotation && e.rotate(this.rotation), (this.sx || this.sy) && e.translate(-this.sx, -this.sy), 1 == this.scaleX && 1 == this.scaleY || e.scale(this.scaleX, this.scaleY);
            let i = -this.width * this.anchor.x,
                s = -this.height * this.anchor.y;
            (i || s) && e.translate(i, s), this.context.globalAlpha = this.opacity, this._rf(), (i || s) && e.translate(-i, -s);
            let h = this.children;
            t && (h = h.filter(t)), h.map(t => t.render && t.render()), e.restore()
        }
        draw() {}
        _pc(t, e) {
            this._uw(), this.children.map(t => t._pc())
        }
        get x() {
            return this.position.x
        }
        get y() {
            return this.position.y
        }
        set x(t) {
            this.position.x = t, this._pc()
        }
        set y(t) {
            this.position.y = t, this._pc()
        }
        get width() {
            return this._w
        }
        set width(t) {
            this._w = t, this._pc()
        }
        get height() {
            return this._h
        }
        set height(t) {
            this._h = t, this._pc()
        }
        _uw() {
            if (!this._di) return;
            let {
                _wx: t = 0,
                _wy: e = 0,
                _wo: i = 1,
                _wr: s = 0,
                _wsx: h = 1,
                _wsy: n = 1
            } = this.parent || {};
            this._wx = this.x, this._wy = this.y, this._ww = this.width, this._wh = this.height, this._wo = i * this.opacity, this._wr = s + this.rotation;
            let {
                x: r,
                y: o
            } = O({
                x: this.x,
                y: this.y
            }, s);
            this._wx = r, this._wy = o, this._wsx = h * this.scaleX, this._wsy = n * this.scaleY, this._wx = this.x * h, this._wy = this.y * n, this._ww = this.width * this._wsx, this._wh = this.height * this._wsy, this._wx += t, this._wy += e
        }
        get world() {
            return {
                x: this._wx,
                y: this._wy,
                width: this._ww,
                height: this._wh,
                opacity: this._wo,
                rotation: this._wr,
                scaleX: this._wsx,
                scaleY: this._wsy
            }
        }
        addChild(t, {
            absolute: e = !1
        } = {}) {
            this.children.push(t), t.parent = this, t._pc = t._pc || Y, t._pc()
        }
        removeChild(t) {
            let e = this.children.indexOf(t); - 1 !== e && (this.children.splice(e, 1), t.parent = null, t._pc())
        }
        get opacity() {
            return this._opa
        }
        set opacity(t) {
            this._opa = t, this._pc()
        }
        get rotation() {
            return this._rot
        }
        set rotation(t) {
            this._rot = t, this._pc()
        }
        setScale(t, e = t) {
            this.scaleX = t, this.scaleY = e
        }
        get scaleX() {
            return this._scx
        }
        set scaleX(t) {
            this._scx = t, this._pc()
        }
        get scaleY() {
            return this._scy
        }
        set scaleY(t) {
            this._scy = t, this._pc()
        }
    }

    function R() {
        return new z(...arguments)
    }
    R.prototype = z.prototype, R.class = z;
    class N extends R.class {
        init({
            image: t,
            width: e = (t ? t.width : void 0),
            height: i = (t ? t.height : void 0),
            ...s
        } = {}) {
            super.init({
                image: t,
                width: e,
                height: i,
                ...s
            })
        }
        get animations() {
            return this._a
        }
        set animations(t) {
            let e, i;
            for (e in this._a = {}, t) this._a[e] = t[e].clone(), i = i || this._a[e];
            this.currentAnimation = i, this.width = this.width || i.width, this.height = this.height || i.height
        }
        playAnimation(t) {
            this.currentAnimation = this.animations[t], this.currentAnimation.loop || this.currentAnimation.reset()
        }
        advance(t) {
            super.advance(t), this.currentAnimation && this.currentAnimation.update(t)
        }
        draw() {
            this.image && this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height), this.currentAnimation && this.currentAnimation.render({
                x: 0,
                y: 0,
                width: this.width,
                height: this.height,
                context: this.context
            }), this.color && (this.context.fillStyle = this.color, this.context.fillRect(0, 0, this.width, this.height))
        }
    }

    function W() {
        return new N(...arguments)
    }
    W.prototype = N.prototype, W.class = N;
    let F = /(\d+)(\w+)/;
    class G extends R.class {
        init({
            text: t = "",
            textAlign: e = "",
            lineHeight: i = 1,
            font: s = r().font,
            ...h
        } = {}) {
            super.init({
                text: t,
                textAlign: e,
                lineHeight: i,
                font: s,
                ...h
            }), this._p()
        }
        get width() {
            return this._w
        }
        set width(t) {
            this._d = !0, this._w = t, this._fw = t
        }
        get text() {
            return this._t
        }
        set text(t) {
            this._d = !0, this._t = t
        }
        get font() {
            return this._f
        }
        set font(t) {
            this._d = !0, this._f = t, this._fs = function (t) {
                let e = t.match(F),
                    i = +e[1];
                return {
                    size: i,
                    unit: e[2],
                    computed: i
                }
            }(t).computed
        }
        get lineHeight() {
            return this._lh
        }
        set lineHeight(t) {
            this._d = !0, this._lh = t
        }
        render() {
            this._d && this._p(), super.render()
        }
        _p() {
            this._s = [], this._d = !1;
            let t = this.context;
            if (t.font = this.font, !this._s.length && this._fw) {
                let e = this.text.split(" "),
                    i = 0,
                    s = 2;
                for (; s <= e.length; s++) {
                    let h = e.slice(i, s).join(" ");
                    t.measureText(h).width > this._fw && (this._s.push(e.slice(i, s - 1).join(" ")), i = s - 1)
                }
                this._s.push(e.slice(i, s).join(" "))
            }
            if (!this._s.length && this.text.includes("\n")) {
                let e = 0;
                this.text.split("\n").map(i => {
                    this._s.push(i), e = Math.max(e, t.measureText(i).width)
                }), this._w = this._fw || e
            }
            this._s.length || (this._s.push(this.text), this._w = this._fw || t.measureText(this.text).width), this.height = this._fs + (this._s.length - 1) * this._fs * this.lineHeight, this._uw()
        }
        draw() {
            let t = 0,
                e = this.textAlign,
                i = this.context;
            e = this.textAlign || ("rtl" === i.canvas.dir ? "right" : "left"), t = "right" === e ? this.width : "center" === e ? this.width / 2 | 0 : 0, this._s.map((s, h) => {
                i.textBaseline = "top", i.textAlign = e, i.fillStyle = this.color, i.font = this.font, i.fillText(s, t, this._fs * this.lineHeight * h)
            })
        }
    }

    function H() {
        return new G(...arguments)
    }
    H.prototype = G.prototype, H.class = G;
    let U = new WeakMap,
        B = {},
        q = {},
        K = {
            0: "left",
            1: "middle",
            2: "right"
        };

    function $(t, e) {
        let {
            x: i,
            y: s,
            width: h,
            height: n
        } = M(t);
        do {
            i -= t.sx || 0, s -= t.sy || 0
        } while (t = t.parent);
        let r = e.x - Math.max(i, Math.min(e.x, i + h)),
            o = e.y - Math.max(s, Math.min(e.y, s + n));
        return r * r + o * o < e.radius * e.radius
    }

    function J(t) {
        let e = t._lf.length ? t._lf : t._cf;
        for (let i = e.length - 1; i >= 0; i--) {
            let s = e[i];
            if (s.collidesWithPointer ? s.collidesWithPointer(t) : $(s, t)) return s
        }
    }

    function V(t, e) {
        return parseFloat(t.getPropertyValue(e)) || 0
    }

    function Q(t) {
        let e = void 0 !== t.button ? K[t.button] : "left";
        q[e] = !0, it(t, "onDown")
    }

    function Z(t) {
        let e = void 0 !== t.button ? K[t.button] : "left";
        q[e] = !1, it(t, "onUp")
    }

    function tt(t) {
        it(t, "onOver")
    }

    function et(t) {
        U.get(t.target)._oo = null, q = {}
    }

    function it(t, e) {
        t.preventDefault();
        let i = t.target,
            s = U.get(i),
            {
                scaleX: h,
                scaleY: n,
                offsetX: r,
                offsetY: o
            } = function (t) {
                let {
                    canvas: e,
                    _s: i
                } = t, s = e.getBoundingClientRect(), h = "none" !== i.transform ? i.transform.replace("matrix(", "").split(",") : [1, 1, 1, 1], n = parseFloat(h[0]), r = parseFloat(h[3]), o = (V(i, "border-left-width") + V(i, "border-right-width")) * n, a = (V(i, "border-top-width") + V(i, "border-bottom-width")) * r, c = (V(i, "padding-left") + V(i, "padding-right")) * n, d = (V(i, "padding-top") + V(i, "padding-bottom")) * r;
                return {
                    scaleX: (s.width - o - c) / e.width,
                    scaleY: (s.height - a - d) / e.height,
                    offsetX: s.left + (V(i, "border-left-width") + V(i, "padding-left")) * n,
                    offsetY: s.top + (V(i, "border-top-width") + V(i, "padding-top")) * r
                }
            }(s);
        if (-1 !== ["touchstart", "touchmove", "touchend"].indexOf(t.type)) {
            s.touches = {};
            for (var a = 0; a < t.touches.length; a++) s.touches[t.touches[a].identifier] = {
                id: t.touches[a].identifier,
                x: (t.touches[a].clientX - r) / h,
                y: (t.touches[a].clientY - o) / n,
                changed: !1
            };
            for (a = t.changedTouches.length; a--;) {
                const i = t.changedTouches[a].identifier;
                void 0 !== s.touches[i] && (s.touches[i].changed = !0);
                let c = t.changedTouches[a].clientX,
                    d = t.changedTouches[a].clientY;
                s.x = (c - r) / h, s.y = (d - o) / n;
                let l = J(s);
                l && l[e] && l[e](t), B[e] && B[e](t, l)
            }
        } else {
            s.x = (t.clientX - r) / h, s.y = (t.clientY - o) / n;
            let i = J(s);
            i && i[e] && i[e](t), B[e] && B[e](t, i), "onOver" == e && (i != s._oo && s._oo && s._oo.onOut && s._oo.onOut(t), s._oo = i)
        }
    }

    function st(...t) {
        t.map(t => {
            let e = t.context ? t.context.canvas : n(),
                i = U.get(e);
            t._r || (t._r = t.render, t.render = function () {
                i._cf.push(this), this._r()
            }, i._o.push(t))
        })
    }
    class ht extends W.class {
        init({
            padX: t = 0,
            padY: e = 0,
            text: i,
            onDown: s,
            onUp: h,
            ...n
        } = {}) {
            super.init({
                padX: t,
                padY: e,
                ...n
            }), this.textNode = H({
                ...i,
                context: this.context
            }), this.width || (this.width = this.textNode.width, this.height = this.textNode.height), st(this), this.addChild(this.textNode), this._od = s || Y, this._ou = h || Y;
            const r = this._dn = document.createElement("button");
            r.style = D, r.textContent = this.text, r.addEventListener("focus", () => this.focus()), r.addEventListener("blur", () => this.blur()), r.addEventListener("keydown", t => this._kd(t)), r.addEventListener("keyup", t => this._ku(t)), T(r, this.context.canvas), this._uw(), this._p()
        }
        get text() {
            return this.textNode.text
        }
        set text(t) {
            this._d = !0, this.textNode.text = t
        }
        destroy() {
            this._dn.remove()
        }
        _p() {
            this.text !== this._dn.textContent && (this._dn.textContent = this.text), this.textNode._p();
            let t = this.textNode.width + 2 * this.padX,
                e = this.textNode.height + 2 * this.padY;
            this.width = Math.max(t, this.width), this.height = Math.max(e, this.height), this._uw()
        }
        render() {
            this._d && this._p(), super.render()
        }
        enable() {
            this.disabled = this._dn.disabled = !1, this.onEnable()
        }
        disable() {
            this.disabled = this._dn.disabled = !0, this.onDisable()
        }
        focus() {
            this.disabled || (this.focused = !0, document.activeElement != this._dn && this._dn.focus(), this.onFocus())
        }
        blur() {
            this.focused = !1, document.activeElement == this._dn && this._dn.blur(), this.onBlur()
        }
        onOver() {
            this.disabled || (this.hovered = !0)
        }
        onOut() {
            this.hovered = !1
        }
        onEnable() {}
        onDisable() {}
        onFocus() {}
        onBlur() {}
        onDown() {
            this.disabled || (this.pressed = !0, this._od())
        }
        onUp() {
            this.disabled || (this.pressed = !1, this._ou())
        }
        _kd(t) {
            "Enter" != t.code && "Space" != t.code || this.onDown()
        }
        _ku(t) {
            "Enter" != t.code && "Space" != t.code || this.onUp()
        }
    }

    function nt() {
        return new ht(...arguments)
    }

    function rt(t) {
        let e = t.canvas;
        t.clearRect(0, 0, e.width, e.height)
    }
    nt.prototype = ht.prototype, nt.class = ht;
    let ot = {
            set: (t, e, i) => (e.startsWith("_") || (t._d = !0), Reflect.set(t, e, i))
        },
        at = {
            start: t => t ? 1 : 0,
            center: () => .5,
            end: t => t ? 0 : 1
        };
    class ct extends R.class {
        init({
            flow: t = "column",
            align: e = "start",
            justify: i = "start",
            colGap: s = 0,
            rowGap: h = 0,
            numCols: n = 1,
            dir: r = "",
            breakpoints: o = [],
            ...a
        } = {}) {
            return super.init({
                flow: t,
                align: e,
                justify: i,
                colGap: s,
                rowGap: h,
                numCols: n,
                dir: r,
                breakpoints: o,
                ...a
            }), this._p(), new Proxy(this, ot)
        }
        addChild(t) {
            this._d = !0, super.addChild(t)
        }
        removeChild(t) {
            this._d = !0, super.removeChild(t)
        }
        render() {
            this._d && this._p(), super.render()
        }
        destroy() {
            this.children.map(t => t.destroy && t.destroy())
        }
        _p() {
            this._d = !1, this.breakpoints.map(t => {
                t.metric.call(this) && this._b !== t && (this._b = t, t.callback.call(this))
            });
            let t = this._g = [],
                e = this._cw = [],
                i = this._rh = [],
                s = this.children,
                h = this._nc = "column" === this.flow ? 1 : "row" === this.flow ? s.length : this.numCols,
                n = 0,
                r = 0;
            for (let o, a = 0; o = s[a]; a++) {
                t[n] = t[n] || [], o._p && o._p(), i[n] = Math.max(i[n] || 0, o.height);
                let s = o.colSpan || 1,
                    a = s;
                do {
                    e[r] = Math.max(e[r] || 0, o.width / a), t[n][r] = o
                } while (a + r++ <= h && --s);
                r >= h && (r = 0, n++)
            }
            for (; r > 0 && r < h;) t[n][r++] = !1;
            let o = t.length,
                a = [].concat(this.colGap),
                c = [].concat(this.rowGap);
            this._w = e.reduce((t, e) => t += e, 0);
            for (let t = 0; t < h - 1; t++) this._w += a[t % a.length];
            this._h = i.reduce((t, e) => t += e, 0);
            for (let t = 0; t < o - 1; t++) this._h += c[t % c.length];
            this._uw();
            let d = "rtl" === this.context.canvas.dir && !this.dir || "rtl" === this.dir;
            this._rtl = d, d && (this._g = t.map(t => t.reverse()), this._cw = e.reverse());
            let l = -this.anchor.y * this.height,
                u = [];
            this._g.map((t, s) => {
                let h = -this.anchor.x * this.width;
                t.map((t, n) => {
                    if (t && !u.includes(t)) {
                        u.push(t);
                        let r = at[t.justifySelf || this.justify](this._rtl),
                            o = at[t.alignSelf || this.align](),
                            c = t.colSpan || 1,
                            d = e[n];
                        if (c > 1 && n + c <= this._nc)
                            for (let t = 1; t < c; t++) d += e[n + t] + a[(n + t) % a.length];
                        let p = d * r,
                            _ = i[s] * o,
                            f = 0,
                            g = 0,
                            {
                                width: w,
                                height: m
                            } = t;
                        if (t.anchor && (f = t.anchor.x, g = t.anchor.y), 0 === r) p += w * f;
                        else if (.5 === r) {
                            p += (f < .5 ? -1 : .5 === f ? 0 : 1) * w * r
                        } else p -= w * (1 - f);
                        if (0 === o) _ += m * g;
                        else if (.5 === o) {
                            _ += (g < .5 ? -1 : .5 === g ? 0 : 1) * m * o
                        } else _ -= m * (1 - g);
                        t.x = h + p, t.y = l + _
                    }
                    h += e[n] + a[n % a.length]
                }), l += i[s] + c[s % c.length]
            })
        }
    }

    function dt() {
        return new ct(...arguments)
    }
    dt.prototype = ct.prototype, dt.class = ct;
    let lt = {},
        ut = {},
        pt = {
            Enter: "enter",
            Escape: "esc",
            Space: "space",
            ArrowLeft: "left",
            ArrowUp: "up",
            ArrowRight: "right",
            ArrowDown: "down"
        };

    function _t(t) {
        let e = pt[t.code];
        ut[e] = !0, lt[e] && lt[e](t)
    }

    function ft(t) {
        ut[pt[t.code]] = !1
    }

    function gt() {
        ut = {}
    }

    function wt(t) {
        let e = t.substr(t.search(/[A-Z]/));
        return e[0].toLowerCase() + e.substr(1)
    }

    function mt(t, e) {
        let i = t.indexOf(e); - 1 !== i && t.splice(i, 1)
    }
    class xt {
        constructor({
            create: t,
            maxSize: e = 1024
        } = {}) {
            this._c = t, this.objects = [t()], this.size = 0, this.maxSize = e
        }
        get(t = {}) {
            if (this.size === this.objects.length) {
                if (this.size === this.maxSize) return;
                for (let t = 0; t < this.size && this.objects.length < this.maxSize; t++) this.objects.push(this._c())
            }
            let e = this.objects[this.size];
            return this.size++, e.init(t), e
        }
        getAliveObjects() {
            return this.objects.slice(0, this.size)
        }
        clear() {
            this.size = this.objects.length = 0, this.objects.push(this._c())
        }
        update(t) {
            let e, i = !1;
            for (let s = this.size; s--;)(e = this.objects[s]).update(t), e.isAlive() || (i = !0, this.size--);
            i && this.objects.sort((t, e) => e.isAlive() - t.isAlive())
        }
        render() {
            for (let t = this.size; t--;) this.objects[t].render()
        }
    }

    function yt() {
        return new xt(...arguments)
    }

    function bt(t, e) {
        let i = [],
            s = e.x + e.width / 2,
            h = e.y + e.height / 2,
            {
                x: n,
                y: r,
                width: o,
                height: a
            } = M(t),
            c = t.y < h,
            d = t.y + t.height >= h;
        return t.x < s && (c && i.push(0), d && i.push(2)), t.x + t.width >= s && (c && i.push(1), d && i.push(3)), i
    }
    yt.prototype = xt.prototype, yt.class = xt;
    class vt {
        constructor({
            maxDepth: t = 3,
            maxObjects: e = 25,
            bounds: i
        } = {}) {
            this.maxDepth = t, this.maxObjects = e;
            let s = n();
            this.bounds = i || {
                x: 0,
                y: 0,
                width: s.width,
                height: s.height
            }, this._b = !1, this._d = 0, this._o = [], this._s = [], this._p = null
        }
        clear() {
            this._s.map(function (t) {
                t.clear()
            }), this._b = !1, this._o.length = 0
        }
        get(t) {
            let e = new Set;
            for (; this._s.length && this._b;) return bt(t, this.bounds).map(i => {
                this._s[i].get(t).map(t => e.add(t))
            }), Array.from(e);
            return this._o.filter(e => e !== t)
        }
        add(...t) {
            t.map(t => {
                Array.isArray(t) ? this.add.apply(this, t) : this._b ? this._a(t) : (this._o.push(t), this._o.length > this.maxObjects && this._d < this.maxDepth && (this._sp(), this._o.map(t => this._a(t)), this._o.length = 0))
            })
        }
        _a(t) {
            bt(t, this.bounds).map(e => {
                this._s[e].add(t)
            })
        }
        _sp(t, e, i) {
            if (this._b = !0, !this._s.length)
                for (t = this.bounds.width / 2 | 0, e = this.bounds.height / 2 | 0, i = 0; i < 4; i++) this._s[i] = new vt({
                    bounds: {
                        x: this.bounds.x + (i % 2 == 1 ? t : 0),
                        y: this.bounds.y + (i >= 2 ? e : 0),
                        width: t,
                        height: e
                    },
                    maxDepth: this.maxDepth,
                    maxObjects: this.maxObjects
                }), this._s[i]._d = this._d + 1
        }
    }

    function At() {
        return new vt(...arguments)
    }

    function St(t) {
        let e = [];
        return t._dn ? e.push(t._dn) : t.children && t.children.map(t => {
            e = e.concat(St(t))
        }), e
    }
    At.prototype = vt.prototype, At.class = vt;
    class jt extends R.class {
        init({
            id: t,
            name: e = t,
            cullObjects: i = !0,
            cullFunction: s = P,
            ...h
        }) {
            const n = this._dn = document.createElement("section");
            n.tabIndex = -1, n.style = D, n.id = t, n.setAttribute("aria-label", e), super.init({
                id: t,
                name: e,
                cullObjects: i,
                cullFunction: s,
                ...h
            }), T(n, this.context.canvas);
            let r = this.context.canvas;
            this.camera = R({
                x: r.width / 2,
                y: r.height / 2,
                width: r.width,
                height: r.height,
                anchor: {
                    x: .5,
                    y: .5
                }
            }), this.camera._pc = (() => {
                super._pc.call(this.camera);
                this.context.canvas;
                this.camera._wx = this.camera.x * this.scaleX, this.camera._wy = this.camera.y * this.scaleY
            })
        }
        show() {
            this.hidden = this._dn.hidden = !1;
            let t = this.children.find(t => t.focus);
            t ? t.focus() : this._dn.focus(), this.onShow()
        }
        hide() {
            this.hidden = this._dn.hidden = !0, this.onHide()
        }
        addChild(t, e) {
            super.addChild(t, e), St(t).map(t => {
                this._dn.appendChild(t)
            })
        }
        removeChild(t) {
            super.removeChild(t), St(t).map(t => {
                T(t, this.context.canvas)
            })
        }
        destroy() {
            this._dn.remove(), this.children.map(t => t.destroy && t.destroy())
        }
        update(t) {
            this.hidden || super.update(t)
        }
        lookAt(t) {
            let e = (t = t.world || t).x,
                i = t.y;
            t.scaleX && (e /= t.scaleX, i /= t.scaleY), this.camera.x = e, this.camera.y = i, this._pc()
        }
        _pc() {
            super._pc(), this.camera && this.camera._pc()
        }
        render() {
            let {
                x: t,
                y: e,
                width: i,
                height: s
            } = this.camera;
            this.sx = t * this.scaleX - i / 2, this.sy = e * this.scaleY - s / 2, this.hidden || super.render(t => !this.cullObjects || this.cullFunction(t, this.camera))
        }
        onShow() {}
        onHide() {}
    }

    function Ct() {
        return new jt(...arguments)
    }

    function Et(t) {
        if (+t === t) return t;
        let e = [],
            i = t.split(".."),
            s = +i[0],
            h = +i[1],
            n = s;
        if (s < h)
            for (; n <= h; n++) e.push(n);
        else
            for (; n >= h; n--) e.push(n);
        return e
    }
    Ct.prototype = jt.prototype, Ct.class = jt;
    class Ot {
        constructor({
            image: t,
            frameWidth: e,
            frameHeight: i,
            frameMargin: s,
            animations: h
        } = {}) {
            this.animations = {}, this.image = t, this.frame = {
                width: e,
                height: i,
                margin: s
            }, this._f = t.width / e | 0, this.createAnimations(h)
        }
        createAnimations(t) {
            let e, i;
            for (i in t) {
                let {
                    frames: s,
                    frameRate: h,
                    loop: n
                } = t[i];
                e = [], [].concat(s).map(t => {
                    e = e.concat(Et(t))
                }), this.animations[i] = a({
                    spriteSheet: this,
                    frames: e,
                    frameRate: h,
                    loop: n
                })
            }
        }
    }

    function kt() {
        return new Ot(...arguments)
    }
    return kt.prototype = Ot.prototype, kt.class = Ot, {
        Animation: a,
        imageAssets: b,
        audioAssets: v,
        dataAssets: A,
        setImagePath: function (t) {
            _ = t
        },
        setAudioPath: function (t) {
            f = t
        },
        setDataPath: function (t) {
            g = t
        },
        loadImage: j,
        loadAudio: C,
        loadData: E,
        load: function (...t) {
            return S(), Promise.all(t.map(t => {
                let e = x([].concat(t)[0]);
                return e.match(c) ? j(t) : e.match(d) ? C(t) : E(t)
            }))
        },
        Button: nt,
        init: function (i) {
            return t = document.getElementById(i) || i || document.querySelector("canvas"), (e = t.getContext("2d")).imageSmoothingEnabled = !1, h("init"), {
                canvas: t,
                context: e
            }
        },
        getCanvas: n,
        getContext: r,
        on: s,
        off: function (t, e) {
            i[t] = (i[t] || []).filter(t => t != e)
        },
        emit: h,
        GameLoop: function ({
            fps: t = 60,
            clearCanvas: e = !0,
            update: i = Y,
            render: s,
            context: n = r()
        } = {}) {
            let o, a, c, d, l, u = 0,
                p = 1e3 / t,
                _ = 1 / t,
                f = e ? rt : Y;

            function g() {
                if (a = requestAnimationFrame(g), c = performance.now(), d = c - o, o = c, !(d > 1e3)) {
                    for (h("tick"), u += d; u >= p;) l.update(_), u -= p;
                    f(n), l.render()
                }
            }
            return l = {
                update: i,
                render: s,
                isStopped: !0,
                start() {
                    o = performance.now(), this.isStopped = !1, requestAnimationFrame(g)
                },
                stop() {
                    this.isStopped = !0, cancelAnimationFrame(a)
                }
            }
        },
        GameObject: R,
        Grid: dt,
        degToRad: function (t) {
            return t * Math.PI / 180
        },
        radToDeg: function (t) {
            return 180 * t / Math.PI
        },
        angleToTarget: function (t, e) {
            return Math.atan2(e.y - t.y, e.x - t.x) + Math.PI / 2
        },
        rotatePoint: O,
        randInt: function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        },
        seedRand: function (t) {
            for (var e = 0, i = 2166136261; e < t.length; e++) i = Math.imul(i ^ t.charCodeAt(e), 16777619);
            i += i << 13, i ^= i >>> 7, i += i << 3, i ^= i >>> 17;
            let s = (i += i << 5) >>> 0,
                h = () => (2 ** 31 - 1 & (s = Math.imul(48271, s))) / 2 ** 31;
            return h(), h
        },
        lerp: function (t, e, i) {
            return t * (1 - i) + e * i
        },
        inverseLerp: function (t, e, i) {
            return (i - t) / (e - t)
        },
        clamp: k,
        setStoreItem: function (t, e) {
            void 0 === e ? localStorage.removeItem(t) : localStorage.setItem(t, JSON.stringify(e))
        },
        getStoreItem: function (t) {
            let e = localStorage.getItem(t);
            try {
                e = JSON.parse(e)
            } catch (t) {}
            return e
        },
        collides: P,
        getWorldRect: M,
        keyMap: pt,
        initKeys: function () {
            let t;
            for (t = 0; t < 26; t++) pt[t + 65] = pt["Key" + String.fromCharCode(t + 65)] = String.fromCharCode(t + 97);
            for (t = 0; t < 10; t++) pt[48 + t] = pt["Digit" + t] = "" + t;
            window.addEventListener("keydown", _t), window.addEventListener("keyup", ft), window.addEventListener("blur", gt)
        },
        bindKeys: function (t, e) {
            [].concat(t).map(t => lt[t] = e)
        },
        unbindKeys: function (t) {
            [].concat(t).map(t => lt[t] = 0)
        },
        keyPressed: function (t) {
            return !!ut[t]
        },
        registerPlugin: function (t, e) {
            let i = t.prototype;
            i && (i._inc || (i._inc = {}, i._bInc = function (t, e, ...i) {
                return this._inc[e].before.reduce((e, i) => {
                    let s = i(t, ...e);
                    return s || e
                }, i)
            }, i._aInc = function (t, e, i, ...s) {
                return this._inc[e].after.reduce((e, i) => {
                    let h = i(t, e, ...s);
                    return h || e
                }, i)
            }), Object.getOwnPropertyNames(e).forEach(t => {
                let s = wt(t);
                i[s] && (i["_o" + s] || (i["_o" + s] = i[s], i[s] = function (...t) {
                    let e = this._bInc(this, s, ...t),
                        h = i["_o" + s].call(this, ...e);
                    return this._aInc(this, s, h, ...t)
                }), i._inc[s] || (i._inc[s] = {
                    before: [],
                    after: []
                }), t.startsWith("before") ? i._inc[s].before.push(e[t]) : t.startsWith("after") && i._inc[s].after.push(e[t]))
            }))
        },
        unregisterPlugin: function (t, e) {
            let i = t.prototype;
            i && i._inc && Object.getOwnPropertyNames(e).forEach(t => {
                let s = wt(t);
                t.startsWith("before") ? mt(i._inc[s].before, e[t]) : t.startsWith("after") && mt(i._inc[s].after, e[t])
            })
        },
        extendObject: function (t, e) {
            let i = t.prototype;
            i && Object.getOwnPropertyNames(e).forEach(t => {
                i[t] || (i[t] = e[t])
            })
        },
        initPointer: function (t = n()) {
            let e = U.get(t);
            if (!e) {
                let i = window.getComputedStyle(t);
                e = {
                    x: 0,
                    y: 0,
                    radius: 5,
                    touches: {},
                    canvas: t,
                    _cf: [],
                    _lf: [],
                    _o: [],
                    _oo: null,
                    _s: i
                }, U.set(t, e)
            }
            return t.addEventListener("mousedown", Q), t.addEventListener("touchstart", Q), t.addEventListener("mouseup", Z), t.addEventListener("touchend", Z), t.addEventListener("touchcancel", Z), t.addEventListener("blur", et), t.addEventListener("mousemove", tt), t.addEventListener("touchmove", tt), e._t || (e._t = !0, s("tick", () => {
                e._lf.length = 0, e._cf.map(t => {
                    e._lf.push(t)
                }), e._cf.length = 0
            })), e
        },
        getPointer: function (t = n()) {
            return U.get(t)
        },
        track: st,
        untrack: function (...t) {
            t.map(t => {
                let e = t.context ? t.context.canvas : n(),
                    i = U.get(e);
                t.render = t._r, t._r = 0;
                let s = i._o.indexOf(t); - 1 !== s && i._o.splice(s, 1)
            })
        },
        pointerOver: function (t) {
            let e = t.context ? t.context.canvas : n(),
                i = U.get(e);
            return i._o.includes(t) && J(i) === t
        },
        onPointerDown: function (t) {
            B.onDown = t
        },
        onPointerUp: function (t) {
            B.onUp = t
        },
        pointerPressed: function (t) {
            return !!q[t]
        },
        Pool: yt,
        Quadtree: At,
        Scene: Ct,
        Sprite: W,
        SpriteSheet: kt,
        Text: H,
        TileEngine: function (t) {
            let {
                width: e,
                height: i,
                tilewidth: s,
                tileheight: h,
                context: o = r(),
                tilesets: a,
                layers: c
            } = t, d = e * s, l = i * h, u = document.createElement("canvas"), p = u.getContext("2d");
            u.width = d, u.height = l;
            let _ = {},
                f = {},
                g = [],
                w = Object.assign({
                    context: o,
                    mapwidth: d,
                    mapheight: l,
                    _sx: 0,
                    _sy: 0,
                    _d: !1,
                    get sx() {
                        return this._sx
                    },
                    get sy() {
                        return this._sy
                    },
                    set sx(t) {
                        this._sx = k(0, d - n().width, t), g.forEach(t => t.sx = this._sx)
                    },
                    set sy(t) {
                        this._sy = k(0, l - n().height, t), g.forEach(t => t.sy = this._sy)
                    },
                    render() {
                        this._d && (this._d = !1, this._p()), b(u)
                    },
                    renderLayer(t) {
                        let e = f[t],
                            i = _[t];
                        e || ((e = document.createElement("canvas")).width = d, e.height = l, f[t] = e, w._r(i, e.getContext("2d"))), i._d && (i._d = !1, e.getContext("2d").clearRect(0, 0, e.width, e.height), w._r(i, e.getContext("2d"))), b(e)
                    },
                    layerCollidesWith(t, e) {
                        let {
                            x: i,
                            y: s,
                            width: h,
                            height: n
                        } = M(e), r = m(s), o = x(i), a = m(s + n), c = x(i + h), d = _[t];
                        for (let t = r; t <= a; t++)
                            for (let e = o; e <= c; e++)
                                if (d.data[e + t * this.width]) return !0;
                        return !1
                    },
                    tileAtLayer(t, e) {
                        let i = e.row || m(e.y),
                            s = e.col || x(e.x);
                        return _[t] ? _[t].data[s + i * w.width] : -1
                    },
                    setTileAtLayer(t, e, i) {
                        let s = e.row || m(e.y),
                            h = e.col || x(e.x);
                        _[t] && (this._d = !0, _[t]._d = !0, _[t].data[h + s * w.width] = i)
                    },
                    setLayer(t, e) {
                        _[t] && (this._d = !0, _[t]._d = !0, _[t].data = e)
                    },
                    addObject(t) {
                        g.push(t), t.sx = this._sx, t.sy = this._sy
                    },
                    removeObject(t) {
                        let e = g.indexOf(t); - 1 !== e && (g.splice(e, 1), t.sx = t.sy = 0)
                    },
                    _r: function (t, e) {
                        e.save(), e.globalAlpha = t.opacity, (t.data || []).map((t, i) => {
                            if (!t) return;
                            let s;
                            for (let e = w.tilesets.length - 1; e >= 0 && (s = w.tilesets[e], !(t / s.firstgid >= 1)); e--);
                            let h = s.tilewidth || w.tilewidth,
                                n = s.tileheight || w.tileheight,
                                r = s.margin || 0,
                                o = s.image,
                                a = t - s.firstgid,
                                c = s.columns || o.width / (h + r) | 0,
                                d = i % w.width * h,
                                l = (i / w.width | 0) * n,
                                u = a % c * (h + r),
                                p = (a / c | 0) * (n + r);
                            e.drawImage(o, u, p, h, n, d, l, h, n)
                        }), e.restore()
                    },
                    _p: y
                }, t);

            function m(t) {
                return t / w.tileheight | 0
            }

            function x(t) {
                return t / w.tilewidth | 0
            }

            function y() {
                w.layers && w.layers.map(t => {
                    t._d = !1, _[t.name] = t, t.data && !1 !== t.visible && w._r(t, p)
                })
            }

            function b(t) {
                const {
                    width: e,
                    height: i
                } = n(), s = Math.min(t.width, e), h = Math.min(t.height, i);
                w.context.drawImage(t, w.sx, w.sy, s, h, 0, 0, s, h)
            }
            return w.tilesets.map(e => {
                let i = (window.__k ? window.__k.dm.get(t) : "") || window.location.href;
                if (e.source) {
                    let t = window.__k.d[window.__k.u(e.source, i)];
                    Object.keys(t).map(i => {
                        e[i] = t[i]
                    })
                }
                if ("" + e.image === e.image) {
                    let t = window.__k.i[window.__k.u(e.image, i)];
                    e.image = t
                }
            }), y(), w
        },
        Vector: X
    }
}();