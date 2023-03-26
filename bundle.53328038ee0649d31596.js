(() => {
  "use strict";
  const t = 100,
    e = 1e3,
    n = 1001,
    i = 1002,
    r = 1003,
    o = 1006,
    s = 1008,
    a = 1012,
    c = 1014,
    l = 1015,
    h = 1016,
    u = 1020,
    d = 1022,
    p = 1023,
    f = 1026,
    m = 1027,
    g = 2300,
    v = 2301,
    y = 2302,
    _ = 2400,
    x = 2401,
    b = 2402,
    w = 3e3,
    M = 7680,
    S = 35044,
    E = 35048,
    T = "300 es";
  function A() {}
  Object.assign(A.prototype, {
    addEventListener: function (t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const n = this._listeners;
      void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e);
    },
    hasEventListener: function (t, e) {
      if (void 0 === this._listeners) return !1;
      const n = this._listeners;
      return void 0 !== n[t] && -1 !== n[t].indexOf(e);
    },
    removeEventListener: function (t, e) {
      if (void 0 === this._listeners) return;
      const n = this._listeners[t];
      if (void 0 !== n) {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    },
    dispatchEvent: function (t) {
      if (void 0 === this._listeners) return;
      const e = this._listeners[t.type];
      if (void 0 !== e) {
        t.target = this;
        const n = e.slice(0);
        for (let e = 0, i = n.length; e < i; e++) n[e].call(this, t);
      }
    },
  });
  const L = [];
  for (let t = 0; t < 256; t++) L[t] = (t < 16 ? "0" : "") + t.toString(16);
  let C = 1234567;
  const R = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      const t = (4294967295 * Math.random()) | 0,
        e = (4294967295 * Math.random()) | 0,
        n = (4294967295 * Math.random()) | 0,
        i = (4294967295 * Math.random()) | 0;
      return (
        L[255 & t] +
        L[(t >> 8) & 255] +
        L[(t >> 16) & 255] +
        L[(t >> 24) & 255] +
        "-" +
        L[255 & e] +
        L[(e >> 8) & 255] +
        "-" +
        L[((e >> 16) & 15) | 64] +
        L[(e >> 24) & 255] +
        "-" +
        L[(63 & n) | 128] +
        L[(n >> 8) & 255] +
        "-" +
        L[(n >> 16) & 255] +
        L[(n >> 24) & 255] +
        L[255 & i] +
        L[(i >> 8) & 255] +
        L[(i >> 16) & 255] +
        L[(i >> 24) & 255]
      ).toUpperCase();
    },
    clamp: function (t, e, n) {
      return Math.max(e, Math.min(n, t));
    },
    euclideanModulo: function (t, e) {
      return ((t % e) + e) % e;
    },
    mapLinear: function (t, e, n, i, r) {
      return i + ((t - e) * (r - i)) / (n - e);
    },
    lerp: function (t, e, n) {
      return (1 - n) * t + n * e;
    },
    smoothstep: function (t, e, n) {
      return t <= e
        ? 0
        : t >= n
        ? 1
        : (t = (t - e) / (n - e)) * t * (3 - 2 * t);
    },
    smootherstep: function (t, e, n) {
      return t <= e
        ? 0
        : t >= n
        ? 1
        : (t = (t - e) / (n - e)) * t * t * (t * (6 * t - 15) + 10);
    },
    randInt: function (t, e) {
      return t + Math.floor(Math.random() * (e - t + 1));
    },
    randFloat: function (t, e) {
      return t + Math.random() * (e - t);
    },
    randFloatSpread: function (t) {
      return t * (0.5 - Math.random());
    },
    seededRandom: function (t) {
      return (
        void 0 !== t && (C = t % 2147483647),
        (C = (16807 * C) % 2147483647),
        (C - 1) / 2147483646
      );
    },
    degToRad: function (t) {
      return t * R.DEG2RAD;
    },
    radToDeg: function (t) {
      return t * R.RAD2DEG;
    },
    isPowerOfTwo: function (t) {
      return 0 == (t & (t - 1)) && 0 !== t;
    },
    ceilPowerOfTwo: function (t) {
      return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2));
    },
    floorPowerOfTwo: function (t) {
      return Math.pow(2, Math.floor(Math.log(t) / Math.LN2));
    },
    setQuaternionFromProperEuler: function (t, e, n, i, r) {
      const o = Math.cos,
        s = Math.sin,
        a = o(n / 2),
        c = s(n / 2),
        l = o((e + i) / 2),
        h = s((e + i) / 2),
        u = o((e - i) / 2),
        d = s((e - i) / 2),
        p = o((i - e) / 2),
        f = s((i - e) / 2);
      switch (r) {
        case "XYX":
          t.set(a * h, c * u, c * d, a * l);
          break;
        case "YZY":
          t.set(c * d, a * h, c * u, a * l);
          break;
        case "ZXZ":
          t.set(c * u, c * d, a * h, a * l);
          break;
        case "XZX":
          t.set(a * h, c * f, c * p, a * l);
          break;
        case "YXY":
          t.set(c * p, a * h, c * f, a * l);
          break;
        case "ZYZ":
          t.set(c * f, c * p, a * h, a * l);
          break;
        default:
          console.warn(
            "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
              r
          );
      }
    },
  };
  class P {
    constructor(t = 0, e = 0) {
      Object.defineProperty(this, "isVector2", { value: !0 }),
        (this.x = t),
        (this.y = e);
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return (this.x = t), (this.y = e), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), this;
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), this;
    }
    addVectors(t, e) {
      return (this.x = t.x + e.x), (this.y = t.y + e.y), this;
    }
    addScaledVector(t, e) {
      return (this.x += t.x * e), (this.y += t.y * e), this;
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), this;
    }
    subVectors(t, e) {
      return (this.x = t.x - e.x), (this.y = t.y - e.y), this;
    }
    multiply(t) {
      return (this.x *= t.x), (this.y *= t.y), this;
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), this;
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = t.elements;
      return (
        (this.x = i[0] * e + i[3] * n + i[6]),
        (this.y = i[1] * e + i[4] * n + i[7]),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)), (this.y = Math.min(this.y, t.y)), this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)), (this.y = Math.max(this.y, t.y)), this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
    }
    ceil() {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
    }
    round() {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y;
      return e * e + n * n;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n), (this.y = t.y + (e.y - t.y) * n), this
      );
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), t;
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector2: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        this
      );
    }
    rotateAround(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = this.x - t.x,
        o = this.y - t.y;
      return (
        (this.x = r * n - o * i + t.x), (this.y = r * i + o * n + t.y), this
      );
    }
    random() {
      return (this.x = Math.random()), (this.y = Math.random()), this;
    }
  }
  class O {
    constructor() {
      Object.defineProperty(this, "isMatrix3", { value: !0 }),
        (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            "THREE.Matrix3: the constructor no longer reads arguments. use .set() instead."
          );
    }
    set(t, e, n, i, r, o, s, a, c) {
      const l = this.elements;
      return (
        (l[0] = t),
        (l[1] = i),
        (l[2] = s),
        (l[3] = e),
        (l[4] = r),
        (l[5] = a),
        (l[6] = n),
        (l[7] = o),
        (l[8] = c),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        n = t.elements;
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        this
      );
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        n.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return (
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        o = n[0],
        s = n[3],
        a = n[6],
        c = n[1],
        l = n[4],
        h = n[7],
        u = n[2],
        d = n[5],
        p = n[8],
        f = i[0],
        m = i[3],
        g = i[6],
        v = i[1],
        y = i[4],
        _ = i[7],
        x = i[2],
        b = i[5],
        w = i[8];
      return (
        (r[0] = o * f + s * v + a * x),
        (r[3] = o * m + s * y + a * b),
        (r[6] = o * g + s * _ + a * w),
        (r[1] = c * f + l * v + h * x),
        (r[4] = c * m + l * y + h * b),
        (r[7] = c * g + l * _ + h * w),
        (r[2] = u * f + d * v + p * x),
        (r[5] = u * m + d * y + p * b),
        (r[8] = u * g + d * _ + p * w),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        o = t[4],
        s = t[5],
        a = t[6],
        c = t[7],
        l = t[8];
      return (
        e * o * l - e * s * c - n * r * l + n * s * a + i * r * c - i * o * a
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        o = t[4],
        s = t[5],
        a = t[6],
        c = t[7],
        l = t[8],
        h = l * o - s * c,
        u = s * a - l * r,
        d = c * r - o * a,
        p = e * h + n * u + i * d;
      if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const f = 1 / p;
      return (
        (t[0] = h * f),
        (t[1] = (i * c - l * n) * f),
        (t[2] = (s * n - i * o) * f),
        (t[3] = u * f),
        (t[4] = (l * e - i * a) * f),
        (t[5] = (i * r - s * e) * f),
        (t[6] = d * f),
        (t[7] = (n * a - c * e) * f),
        (t[8] = (o * e - n * r) * f),
        this
      );
    }
    transpose() {
      let t;
      const e = this.elements;
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      );
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).copy(this).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      );
    }
    setUvTransform(t, e, n, i, r, o, s) {
      const a = Math.cos(r),
        c = Math.sin(r);
      return (
        this.set(
          n * a,
          n * c,
          -n * (a * o + c * s) + o + t,
          -i * c,
          i * a,
          -i * (-c * o + a * s) + s + e,
          0,
          0,
          1
        ),
        this
      );
    }
    scale(t, e) {
      const n = this.elements;
      return (
        (n[0] *= t),
        (n[3] *= t),
        (n[6] *= t),
        (n[1] *= e),
        (n[4] *= e),
        (n[7] *= e),
        this
      );
    }
    rotate(t) {
      const e = Math.cos(t),
        n = Math.sin(t),
        i = this.elements,
        r = i[0],
        o = i[3],
        s = i[6],
        a = i[1],
        c = i[4],
        l = i[7];
      return (
        (i[0] = e * r + n * a),
        (i[3] = e * o + n * c),
        (i[6] = e * s + n * l),
        (i[1] = -n * r + e * a),
        (i[4] = -n * o + e * c),
        (i[7] = -n * s + e * l),
        this
      );
    }
    translate(t, e) {
      const n = this.elements;
      return (
        (n[0] += t * n[2]),
        (n[3] += t * n[5]),
        (n[6] += t * n[8]),
        (n[1] += e * n[2]),
        (n[4] += e * n[5]),
        (n[7] += e * n[8]),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        n = t.elements;
      for (let t = 0; t < 9; t++) if (e[t] !== n[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.elements;
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        t
      );
    }
  }
  let N;
  const I = {
    getDataURL: function (t) {
      if (/^data:/i.test(t.src)) return t.src;
      if ("undefined" == typeof HTMLCanvasElement) return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        void 0 === N &&
          (N = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "canvas"
          )),
          (N.width = t.width),
          (N.height = t.height);
        const n = N.getContext("2d");
        t instanceof ImageData
          ? n.putImageData(t, 0, 0)
          : n.drawImage(t, 0, 0, t.width, t.height),
          (e = N);
      }
      return e.width > 2048 || e.height > 2048
        ? e.toDataURL("image/jpeg", 0.6)
        : e.toDataURL("image/png");
    },
  };
  let D = 0;
  function z(
    t = z.DEFAULT_IMAGE,
    e = z.DEFAULT_MAPPING,
    n = 1001,
    i = 1001,
    r = 1006,
    o = 1008,
    s = 1023,
    a = 1009,
    c = 1,
    l = 3e3
  ) {
    Object.defineProperty(this, "id", { value: D++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.image = t),
      (this.mipmaps = []),
      (this.mapping = e),
      (this.wrapS = n),
      (this.wrapT = i),
      (this.magFilter = r),
      (this.minFilter = o),
      (this.anisotropy = c),
      (this.format = s),
      (this.internalFormat = null),
      (this.type = a),
      (this.offset = new P(0, 0)),
      (this.repeat = new P(1, 1)),
      (this.center = new P(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new O()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.encoding = l),
      (this.version = 0),
      (this.onUpdate = null);
  }
  function B(t) {
    return ("undefined" != typeof HTMLImageElement &&
      t instanceof HTMLImageElement) ||
      ("undefined" != typeof HTMLCanvasElement &&
        t instanceof HTMLCanvasElement) ||
      ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
      ? I.getDataURL(t)
      : t.data
      ? {
          data: Array.prototype.slice.call(t.data),
          width: t.width,
          height: t.height,
          type: t.data.constructor.name,
        }
      : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  (z.DEFAULT_IMAGE = void 0),
    (z.DEFAULT_MAPPING = 300),
    (z.prototype = Object.assign(Object.create(A.prototype), {
      constructor: z,
      isTexture: !0,
      updateMatrix: function () {
        this.matrix.setUvTransform(
          this.offset.x,
          this.offset.y,
          this.repeat.x,
          this.repeat.y,
          this.rotation,
          this.center.x,
          this.center.y
        );
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
      copy: function (t) {
        return (
          (this.name = t.name),
          (this.image = t.image),
          (this.mipmaps = t.mipmaps.slice(0)),
          (this.mapping = t.mapping),
          (this.wrapS = t.wrapS),
          (this.wrapT = t.wrapT),
          (this.magFilter = t.magFilter),
          (this.minFilter = t.minFilter),
          (this.anisotropy = t.anisotropy),
          (this.format = t.format),
          (this.internalFormat = t.internalFormat),
          (this.type = t.type),
          this.offset.copy(t.offset),
          this.repeat.copy(t.repeat),
          this.center.copy(t.center),
          (this.rotation = t.rotation),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          this.matrix.copy(t.matrix),
          (this.generateMipmaps = t.generateMipmaps),
          (this.premultiplyAlpha = t.premultiplyAlpha),
          (this.flipY = t.flipY),
          (this.unpackAlignment = t.unpackAlignment),
          (this.encoding = t.encoding),
          this
        );
      },
      toJSON: function (t) {
        const e = void 0 === t || "string" == typeof t;
        if (!e && void 0 !== t.textures[this.uuid])
          return t.textures[this.uuid];
        const n = {
          metadata: {
            version: 4.5,
            type: "Texture",
            generator: "Texture.toJSON",
          },
          uuid: this.uuid,
          name: this.name,
          mapping: this.mapping,
          repeat: [this.repeat.x, this.repeat.y],
          offset: [this.offset.x, this.offset.y],
          center: [this.center.x, this.center.y],
          rotation: this.rotation,
          wrap: [this.wrapS, this.wrapT],
          format: this.format,
          type: this.type,
          encoding: this.encoding,
          minFilter: this.minFilter,
          magFilter: this.magFilter,
          anisotropy: this.anisotropy,
          flipY: this.flipY,
          premultiplyAlpha: this.premultiplyAlpha,
          unpackAlignment: this.unpackAlignment,
        };
        if (void 0 !== this.image) {
          const i = this.image;
          if (
            (void 0 === i.uuid && (i.uuid = R.generateUUID()),
            !e && void 0 === t.images[i.uuid])
          ) {
            let e;
            if (Array.isArray(i)) {
              e = [];
              for (let t = 0, n = i.length; t < n; t++)
                i[t].isDataTexture ? e.push(B(i[t].image)) : e.push(B(i[t]));
            } else e = B(i);
            t.images[i.uuid] = { uuid: i.uuid, url: e };
          }
          n.image = i.uuid;
        }
        return e || (t.textures[this.uuid] = n), n;
      },
      dispose: function () {
        this.dispatchEvent({ type: "dispose" });
      },
      transformUv: function (t) {
        if (300 !== this.mapping) return t;
        if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
          switch (this.wrapS) {
            case e:
              t.x = t.x - Math.floor(t.x);
              break;
            case n:
              t.x = t.x < 0 ? 0 : 1;
              break;
            case i:
              1 === Math.abs(Math.floor(t.x) % 2)
                ? (t.x = Math.ceil(t.x) - t.x)
                : (t.x = t.x - Math.floor(t.x));
          }
        if (t.y < 0 || t.y > 1)
          switch (this.wrapT) {
            case e:
              t.y = t.y - Math.floor(t.y);
              break;
            case n:
              t.y = t.y < 0 ? 0 : 1;
              break;
            case i:
              1 === Math.abs(Math.floor(t.y) % 2)
                ? (t.y = Math.ceil(t.y) - t.y)
                : (t.y = t.y - Math.floor(t.y));
          }
        return this.flipY && (t.y = 1 - t.y), t;
      },
    })),
    Object.defineProperty(z.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    });
  class U {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      Object.defineProperty(this, "isVector4", { value: !0 }),
        (this.x = t),
        (this.y = e),
        (this.z = n),
        (this.w = i);
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, n, i) {
      return (this.x = t), (this.y = e), (this.z = n), (this.w = i), this;
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setW(t) {
      return (this.w = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return (
        (this.x = t.x),
        (this.y = t.y),
        (this.z = t.z),
        (this.w = void 0 !== t.w ? t.w : 1),
        this
      );
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x),
          (this.y += t.y),
          (this.z += t.z),
          (this.w += t.w),
          this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), (this.w += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x),
        (this.y = t.y + e.y),
        (this.z = t.z + e.z),
        (this.w = t.w + e.w),
        this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e),
        (this.y += t.y * e),
        (this.z += t.z * e),
        (this.w += t.w * e),
        this
      );
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x),
          (this.y -= t.y),
          (this.z -= t.z),
          (this.w -= t.w),
          this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x),
        (this.y = t.y - e.y),
        (this.z = t.z - e.z),
        (this.w = t.w - e.w),
        this
      );
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this;
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = this.w,
        o = t.elements;
      return (
        (this.x = o[0] * e + o[4] * n + o[8] * i + o[12] * r),
        (this.y = o[1] * e + o[5] * n + o[9] * i + o[13] * r),
        (this.z = o[2] * e + o[6] * n + o[10] * i + o[14] * r),
        (this.w = o[3] * e + o[7] * n + o[11] * i + o[15] * r),
        this
      );
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      const e = Math.sqrt(1 - t.w * t.w);
      return (
        e < 1e-4
          ? ((this.x = 1), (this.y = 0), (this.z = 0))
          : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
        this
      );
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, n, i, r;
      const o = 0.01,
        s = 0.1,
        a = t.elements,
        c = a[0],
        l = a[4],
        h = a[8],
        u = a[1],
        d = a[5],
        p = a[9],
        f = a[2],
        m = a[6],
        g = a[10];
      if (Math.abs(l - u) < o && Math.abs(h - f) < o && Math.abs(p - m) < o) {
        if (
          Math.abs(l + u) < s &&
          Math.abs(h + f) < s &&
          Math.abs(p + m) < s &&
          Math.abs(c + d + g - 3) < s
        )
          return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        const t = (c + 1) / 2,
          a = (d + 1) / 2,
          v = (g + 1) / 2,
          y = (l + u) / 4,
          _ = (h + f) / 4,
          x = (p + m) / 4;
        return (
          t > a && t > v
            ? t < o
              ? ((n = 0), (i = 0.707106781), (r = 0.707106781))
              : ((n = Math.sqrt(t)), (i = y / n), (r = _ / n))
            : a > v
            ? a < o
              ? ((n = 0.707106781), (i = 0), (r = 0.707106781))
              : ((i = Math.sqrt(a)), (n = y / i), (r = x / i))
            : v < o
            ? ((n = 0.707106781), (i = 0.707106781), (r = 0))
            : ((r = Math.sqrt(v)), (n = _ / r), (i = x / r)),
          this.set(n, i, r, e),
          this
        );
      }
      let v = Math.sqrt(
        (m - p) * (m - p) + (h - f) * (h - f) + (u - l) * (u - l)
      );
      return (
        Math.abs(v) < 0.001 && (v = 1),
        (this.x = (m - p) / v),
        (this.y = (h - f) / v),
        (this.z = (u - l) / v),
        (this.w = Math.acos((c + d + g - 1) / 2)),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        (this.w = Math.min(this.w, t.w)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        (this.w = Math.max(this.w, t.w)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        (this.w = Math.max(t.w, Math.min(e.w, this.w))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        (this.w = Math.max(t, Math.min(e, this.w))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        (this.w = Math.floor(this.w)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        (this.w = Math.ceil(this.w)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        (this.w = Math.round(this.w)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        (this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
        this
      );
    }
    negate() {
      return (
        (this.x = -this.x),
        (this.y = -this.y),
        (this.z = -this.z),
        (this.w = -this.w),
        this
      );
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    length() {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    }
    manhattanLength() {
      return (
        Math.abs(this.x) +
        Math.abs(this.y) +
        Math.abs(this.z) +
        Math.abs(this.w)
      );
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        (this.w += (t.w - this.w) * e),
        this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        (this.w = t.w + (e.w - t.w) * n),
        this
      );
    }
    equals(t) {
      return (
        t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this.x = t[e]),
        (this.y = t[e + 1]),
        (this.z = t[e + 2]),
        (this.w = t[e + 3]),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this.x),
        (t[e + 1] = this.y),
        (t[e + 2] = this.z),
        (t[e + 3] = this.w),
        t
      );
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector4: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        (this.w = t.getW(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        (this.w = Math.random()),
        this
      );
    }
  }
  function H(t, e, n) {
    (this.width = t),
      (this.height = e),
      (this.scissor = new U(0, 0, t, e)),
      (this.scissorTest = !1),
      (this.viewport = new U(0, 0, t, e)),
      (n = n || {}),
      (this.texture = new z(
        void 0,
        n.mapping,
        n.wrapS,
        n.wrapT,
        n.magFilter,
        n.minFilter,
        n.format,
        n.type,
        n.anisotropy,
        n.encoding
      )),
      (this.texture.image = {}),
      (this.texture.image.width = t),
      (this.texture.image.height = e),
      (this.texture.generateMipmaps =
        void 0 !== n.generateMipmaps && n.generateMipmaps),
      (this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : o),
      (this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer),
      (this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer),
      (this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null);
  }
  function F(t, e, n) {
    H.call(this, t, e, n), (this.samples = 4);
  }
  (H.prototype = Object.assign(Object.create(A.prototype), {
    constructor: H,
    isWebGLRenderTarget: !0,
    setSize: function (t, e) {
      (this.width === t && this.height === e) ||
        ((this.width = t),
        (this.height = e),
        (this.texture.image.width = t),
        (this.texture.image.height = e),
        this.dispose()),
        this.viewport.set(0, 0, t, e),
        this.scissor.set(0, 0, t, e);
    },
    clone: function () {
      return new this.constructor().copy(this);
    },
    copy: function (t) {
      return (
        (this.width = t.width),
        (this.height = t.height),
        this.viewport.copy(t.viewport),
        (this.texture = t.texture.clone()),
        (this.depthBuffer = t.depthBuffer),
        (this.stencilBuffer = t.stencilBuffer),
        (this.depthTexture = t.depthTexture),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  })),
    (F.prototype = Object.assign(Object.create(H.prototype), {
      constructor: F,
      isWebGLMultisampleRenderTarget: !0,
      copy: function (t) {
        return H.prototype.copy.call(this, t), (this.samples = t.samples), this;
      },
    }));
  class k {
    constructor(t = 0, e = 0, n = 0, i = 1) {
      Object.defineProperty(this, "isQuaternion", { value: !0 }),
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._w = i);
    }
    static slerp(t, e, n, i) {
      return n.copy(t).slerp(e, i);
    }
    static slerpFlat(t, e, n, i, r, o, s) {
      let a = n[i + 0],
        c = n[i + 1],
        l = n[i + 2],
        h = n[i + 3];
      const u = r[o + 0],
        d = r[o + 1],
        p = r[o + 2],
        f = r[o + 3];
      if (h !== f || a !== u || c !== d || l !== p) {
        let t = 1 - s;
        const e = a * u + c * d + l * p + h * f,
          n = e >= 0 ? 1 : -1,
          i = 1 - e * e;
        if (i > Number.EPSILON) {
          const r = Math.sqrt(i),
            o = Math.atan2(r, e * n);
          (t = Math.sin(t * o) / r), (s = Math.sin(s * o) / r);
        }
        const r = s * n;
        if (
          ((a = a * t + u * r),
          (c = c * t + d * r),
          (l = l * t + p * r),
          (h = h * t + f * r),
          t === 1 - s)
        ) {
          const t = 1 / Math.sqrt(a * a + c * c + l * l + h * h);
          (a *= t), (c *= t), (l *= t), (h *= t);
        }
      }
      (t[e] = a), (t[e + 1] = c), (t[e + 2] = l), (t[e + 3] = h);
    }
    static multiplyQuaternionsFlat(t, e, n, i, r, o) {
      const s = n[i],
        a = n[i + 1],
        c = n[i + 2],
        l = n[i + 3],
        h = r[o],
        u = r[o + 1],
        d = r[o + 2],
        p = r[o + 3];
      return (
        (t[e] = s * p + l * h + a * d - c * u),
        (t[e + 1] = a * p + l * u + c * h - s * d),
        (t[e + 2] = c * p + l * d + s * u - a * h),
        (t[e + 3] = l * p - s * h - a * u - c * d),
        t
      );
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      (this._w = t), this._onChangeCallback();
    }
    set(t, e, n, i) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._w = i),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      );
    }
    setFromEuler(t, e) {
      if (!t || !t.isEuler)
        throw new Error(
          "THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order."
        );
      const n = t._x,
        i = t._y,
        r = t._z,
        o = t._order,
        s = Math.cos,
        a = Math.sin,
        c = s(n / 2),
        l = s(i / 2),
        h = s(r / 2),
        u = a(n / 2),
        d = a(i / 2),
        p = a(r / 2);
      switch (o) {
        case "XYZ":
          (this._x = u * l * h + c * d * p),
            (this._y = c * d * h - u * l * p),
            (this._z = c * l * p + u * d * h),
            (this._w = c * l * h - u * d * p);
          break;
        case "YXZ":
          (this._x = u * l * h + c * d * p),
            (this._y = c * d * h - u * l * p),
            (this._z = c * l * p - u * d * h),
            (this._w = c * l * h + u * d * p);
          break;
        case "ZXY":
          (this._x = u * l * h - c * d * p),
            (this._y = c * d * h + u * l * p),
            (this._z = c * l * p + u * d * h),
            (this._w = c * l * h - u * d * p);
          break;
        case "ZYX":
          (this._x = u * l * h - c * d * p),
            (this._y = c * d * h + u * l * p),
            (this._z = c * l * p - u * d * h),
            (this._w = c * l * h + u * d * p);
          break;
        case "YZX":
          (this._x = u * l * h + c * d * p),
            (this._y = c * d * h + u * l * p),
            (this._z = c * l * p - u * d * h),
            (this._w = c * l * h - u * d * p);
          break;
        case "XZY":
          (this._x = u * l * h - c * d * p),
            (this._y = c * d * h - u * l * p),
            (this._z = c * l * p + u * d * h),
            (this._w = c * l * h + u * d * p);
          break;
        default:
          console.warn(
            "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
              o
          );
      }
      return !1 !== e && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      const n = e / 2,
        i = Math.sin(n);
      return (
        (this._x = t.x * i),
        (this._y = t.y * i),
        (this._z = t.z * i),
        (this._w = Math.cos(n)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        n = e[0],
        i = e[4],
        r = e[8],
        o = e[1],
        s = e[5],
        a = e[9],
        c = e[2],
        l = e[6],
        h = e[10],
        u = n + s + h;
      if (u > 0) {
        const t = 0.5 / Math.sqrt(u + 1);
        (this._w = 0.25 / t),
          (this._x = (l - a) * t),
          (this._y = (r - c) * t),
          (this._z = (o - i) * t);
      } else if (n > s && n > h) {
        const t = 2 * Math.sqrt(1 + n - s - h);
        (this._w = (l - a) / t),
          (this._x = 0.25 * t),
          (this._y = (i + o) / t),
          (this._z = (r + c) / t);
      } else if (s > h) {
        const t = 2 * Math.sqrt(1 + s - n - h);
        (this._w = (r - c) / t),
          (this._x = (i + o) / t),
          (this._y = 0.25 * t),
          (this._z = (a + l) / t);
      } else {
        const t = 2 * Math.sqrt(1 + h - n - s);
        (this._w = (o - i) / t),
          (this._x = (r + c) / t),
          (this._y = (a + l) / t),
          (this._z = 0.25 * t);
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let n = t.dot(e) + 1;
      return (
        n < 1e-6
          ? ((n = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y),
                (this._y = t.x),
                (this._z = 0),
                (this._w = n))
              : ((this._x = 0),
                (this._y = -t.z),
                (this._z = t.y),
                (this._w = n)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = n)),
        this.normalize()
      );
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(R.clamp(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const n = this.angleTo(t);
      if (0 === n) return this;
      const i = Math.min(1, e / n);
      return this.slerp(t, i), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return (
        (this._x *= -1),
        (this._y *= -1),
        (this._z *= -1),
        this._onChangeCallback(),
        this
      );
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return (
        this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
      );
    }
    length() {
      return Math.sqrt(
        this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w
      );
    }
    normalize() {
      let t = this.length();
      return (
        0 === t
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
          ),
          this.multiplyQuaternions(t, e))
        : this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const n = t._x,
        i = t._y,
        r = t._z,
        o = t._w,
        s = e._x,
        a = e._y,
        c = e._z,
        l = e._w;
      return (
        (this._x = n * l + o * s + i * c - r * a),
        (this._y = i * l + o * a + r * s - n * c),
        (this._z = r * l + o * c + n * a - i * s),
        (this._w = o * l - n * s - i * a - r * c),
        this._onChangeCallback(),
        this
      );
    }
    slerp(t, e) {
      if (0 === e) return this;
      if (1 === e) return this.copy(t);
      const n = this._x,
        i = this._y,
        r = this._z,
        o = this._w;
      let s = o * t._w + n * t._x + i * t._y + r * t._z;
      if (
        (s < 0
          ? ((this._w = -t._w),
            (this._x = -t._x),
            (this._y = -t._y),
            (this._z = -t._z),
            (s = -s))
          : this.copy(t),
        s >= 1)
      )
        return (this._w = o), (this._x = n), (this._y = i), (this._z = r), this;
      const a = 1 - s * s;
      if (a <= Number.EPSILON) {
        const t = 1 - e;
        return (
          (this._w = t * o + e * this._w),
          (this._x = t * n + e * this._x),
          (this._y = t * i + e * this._y),
          (this._z = t * r + e * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        );
      }
      const c = Math.sqrt(a),
        l = Math.atan2(c, s),
        h = Math.sin((1 - e) * l) / c,
        u = Math.sin(e * l) / c;
      return (
        (this._w = o * h + this._w * u),
        (this._x = n * h + this._x * u),
        (this._y = i * h + this._y * u),
        (this._z = r * h + this._z * u),
        this._onChangeCallback(),
        this
      );
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._w === this._w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._w),
        t
      );
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this
      );
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
  }
  class G {
    constructor(t = 0, e = 0, n = 0) {
      Object.defineProperty(this, "isVector3", { value: !0 }),
        (this.x = t),
        (this.y = e),
        (this.z = n);
    }
    set(t, e, n) {
      return (
        void 0 === n && (n = this.z),
        (this.x = t),
        (this.y = e),
        (this.z = n),
        this
      );
    }
    setScalar(t) {
      return (this.x = t), (this.y = t), (this.z = t), this;
    }
    setX(t) {
      return (this.x = t), this;
    }
    setY(t) {
      return (this.y = t), this;
    }
    setZ(t) {
      return (this.z = t), this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
    }
    add(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
          ),
          this.addVectors(t, e))
        : ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
    }
    addScalar(t) {
      return (this.x += t), (this.y += t), (this.z += t), this;
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x), (this.y = t.y + e.y), (this.z = t.z + e.z), this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this
      );
    }
    sub(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
          ),
          this.subVectors(t, e))
        : ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
    }
    subScalar(t) {
      return (this.x -= t), (this.y -= t), (this.z -= t), this;
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x), (this.y = t.y - e.y), (this.z = t.z - e.z), this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
          ),
          this.multiplyVectors(t, e))
        : ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
    }
    multiplyScalar(t) {
      return (this.x *= t), (this.y *= t), (this.z *= t), this;
    }
    multiplyVectors(t, e) {
      return (
        (this.x = t.x * e.x), (this.y = t.y * e.y), (this.z = t.z * e.z), this
      );
    }
    applyEuler(t) {
      return (
        (t && t.isEuler) ||
          console.error(
            "THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."
          ),
        this.applyQuaternion(j.setFromEuler(t))
      );
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(j.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[3] * n + r[6] * i),
        (this.y = r[1] * e + r[4] * n + r[7] * i),
        (this.z = r[2] * e + r[5] * n + r[8] * i),
        this
      );
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements,
        o = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
      return (
        (this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * o),
        (this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * o),
        (this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * o),
        this
      );
    }
    applyQuaternion(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.x,
        o = t.y,
        s = t.z,
        a = t.w,
        c = a * e + o * i - s * n,
        l = a * n + s * e - r * i,
        h = a * i + r * n - o * e,
        u = -r * e - o * n - s * i;
      return (
        (this.x = c * a + u * -r + l * -s - h * -o),
        (this.y = l * a + u * -o + h * -r - c * -s),
        (this.z = h * a + u * -s + c * -o - l * -r),
        this
      );
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
        t.projectionMatrix
      );
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
        t.matrixWorld
      );
    }
    transformDirection(t) {
      const e = this.x,
        n = this.y,
        i = this.z,
        r = t.elements;
      return (
        (this.x = r[0] * e + r[4] * n + r[8] * i),
        (this.y = r[1] * e + r[5] * n + r[9] * i),
        (this.z = r[2] * e + r[6] * n + r[10] * i),
        this.normalize()
      );
    }
    divide(t) {
      return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = Math.max(t.x, Math.min(e.x, this.x))),
        (this.y = Math.max(t.y, Math.min(e.y, this.y))),
        (this.z = Math.max(t.z, Math.min(e.z, this.z))),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = Math.max(t, Math.min(e, this.x))),
        (this.y = Math.max(t, Math.min(e, this.y))),
        (this.z = Math.max(t, Math.min(e, this.z))),
        this
      );
    }
    clampLength(t, e) {
      const n = this.length();
      return this.divideScalar(n || 1).multiplyScalar(
        Math.max(t, Math.min(e, n))
      );
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
        (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
        (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
        this
      );
    }
    negate() {
      return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      );
    }
    lerpVectors(t, e, n) {
      return (
        (this.x = t.x + (e.x - t.x) * n),
        (this.y = t.y + (e.y - t.y) * n),
        (this.z = t.z + (e.z - t.z) * n),
        this
      );
    }
    cross(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."
          ),
          this.crossVectors(t, e))
        : this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        o = e.x,
        s = e.y,
        a = e.z;
      return (
        (this.x = i * a - r * s),
        (this.y = r * o - n * a),
        (this.z = n * s - i * o),
        this
      );
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const n = t.dot(this) / e;
      return this.copy(t).multiplyScalar(n);
    }
    projectOnPlane(t) {
      return V.copy(this).projectOnVector(t), this.sub(V);
    }
    reflect(t) {
      return this.sub(V.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const n = this.dot(t) / e;
      return Math.acos(R.clamp(n, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        n = this.y - t.y,
        i = this.z - t.z;
      return e * e + n * n + i * i;
    }
    manhattanDistanceTo(t) {
      return (
        Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
      );
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, n) {
      const i = Math.sin(e) * t;
      return (
        (this.x = i * Math.sin(n)),
        (this.y = Math.cos(e) * t),
        (this.z = i * Math.cos(n)),
        this
      );
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, n) {
      return (
        (this.x = t * Math.sin(e)),
        (this.y = n),
        (this.z = t * Math.cos(e)),
        this
      );
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        n = this.setFromMatrixColumn(t, 1).length(),
        i = this.setFromMatrixColumn(t, 2).length();
      return (this.x = e), (this.y = n), (this.z = i), this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
    }
    fromBufferAttribute(t, e, n) {
      return (
        void 0 !== n &&
          console.warn(
            "THREE.Vector3: offset has been removed from .fromBufferAttribute()."
          ),
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        this
      );
    }
  }
  const V = new G(),
    j = new k();
  class W {
    constructor(t, e) {
      Object.defineProperty(this, "isBox3", { value: !0 }),
        (this.min = void 0 !== t ? t : new G(1 / 0, 1 / 0, 1 / 0)),
        (this.max = void 0 !== e ? e : new G(-1 / 0, -1 / 0, -1 / 0));
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        o = -1 / 0,
        s = -1 / 0;
      for (let a = 0, c = t.length; a < c; a += 3) {
        const c = t[a],
          l = t[a + 1],
          h = t[a + 2];
        c < e && (e = c),
          l < n && (n = l),
          h < i && (i = h),
          c > r && (r = c),
          l > o && (o = l),
          h > s && (s = h);
      }
      return this.min.set(e, n, i), this.max.set(r, o, s), this;
    }
    setFromBufferAttribute(t) {
      let e = 1 / 0,
        n = 1 / 0,
        i = 1 / 0,
        r = -1 / 0,
        o = -1 / 0,
        s = -1 / 0;
      for (let a = 0, c = t.count; a < c; a++) {
        const c = t.getX(a),
          l = t.getY(a),
          h = t.getZ(a);
        c < e && (e = c),
          l < n && (n = l),
          h < i && (i = h),
          c > r && (r = c),
          l > o && (o = l),
          h > s && (s = h);
      }
      return this.min.set(e, n, i), this.max.set(r, o, s), this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const n = Y.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
    }
    setFromObject(t) {
      return this.makeEmpty(), this.expandByObject(t);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    }
    isEmpty() {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      );
    }
    getCenter(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box3: .getCenter() target is now required"),
          (t = new G())),
        this.isEmpty()
          ? t.set(0, 0, 0)
          : t.addVectors(this.min, this.max).multiplyScalar(0.5)
      );
    }
    getSize(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Box3: .getSize() target is now required"),
          (t = new G())),
        this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
      );
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t) {
      t.updateWorldMatrix(!1, !1);
      const e = t.geometry;
      void 0 !== e &&
        (null === e.boundingBox && e.computeBoundingBox(),
        Z.copy(e.boundingBox),
        Z.applyMatrix4(t.matrixWorld),
        this.union(Z));
      const n = t.children;
      for (let t = 0, e = n.length; t < e; t++) this.expandByObject(n[t]);
      return this;
    }
    containsPoint(t) {
      return !(
        t.x < this.min.x ||
        t.x > this.max.x ||
        t.y < this.min.y ||
        t.y > this.max.y ||
        t.z < this.min.z ||
        t.z > this.max.z
      );
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y &&
        this.min.z <= t.min.z &&
        t.max.z <= this.max.z
      );
    }
    getParameter(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box3: .getParameter() target is now required"),
          (e = new G())),
        e.set(
          (t.x - this.min.x) / (this.max.x - this.min.x),
          (t.y - this.min.y) / (this.max.y - this.min.y),
          (t.z - this.min.z) / (this.max.z - this.min.z)
        )
      );
    }
    intersectsBox(t) {
      return !(
        t.max.x < this.min.x ||
        t.min.x > this.max.x ||
        t.max.y < this.min.y ||
        t.min.y > this.max.y ||
        t.max.z < this.min.z ||
        t.min.z > this.max.z
      );
    }
    intersectsSphere(t) {
      return (
        this.clampPoint(t.center, Y),
        Y.distanceToSquared(t.center) <= t.radius * t.radius
      );
    }
    intersectsPlane(t) {
      let e, n;
      return (
        t.normal.x > 0
          ? ((e = t.normal.x * this.min.x), (n = t.normal.x * this.max.x))
          : ((e = t.normal.x * this.max.x), (n = t.normal.x * this.min.x)),
        t.normal.y > 0
          ? ((e += t.normal.y * this.min.y), (n += t.normal.y * this.max.y))
          : ((e += t.normal.y * this.max.y), (n += t.normal.y * this.min.y)),
        t.normal.z > 0
          ? ((e += t.normal.z * this.min.z), (n += t.normal.z * this.max.z))
          : ((e += t.normal.z * this.max.z), (n += t.normal.z * this.min.z)),
        e <= -t.constant && n >= -t.constant
      );
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return !1;
      this.getCenter(nt),
        it.subVectors(this.max, nt),
        J.subVectors(t.a, nt),
        Q.subVectors(t.b, nt),
        K.subVectors(t.c, nt),
        $.subVectors(Q, J),
        tt.subVectors(K, Q),
        et.subVectors(J, K);
      let e = [
        0,
        -$.z,
        $.y,
        0,
        -tt.z,
        tt.y,
        0,
        -et.z,
        et.y,
        $.z,
        0,
        -$.x,
        tt.z,
        0,
        -tt.x,
        et.z,
        0,
        -et.x,
        -$.y,
        $.x,
        0,
        -tt.y,
        tt.x,
        0,
        -et.y,
        et.x,
        0,
      ];
      return (
        !!q(e, J, Q, K, it) &&
        ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        !!q(e, J, Q, K, it) &&
          (rt.crossVectors($, tt), (e = [rt.x, rt.y, rt.z]), q(e, J, Q, K, it)))
      );
    }
    clampPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Box3: .clampPoint() target is now required"),
          (e = new G())),
        e.copy(t).clamp(this.min, this.max)
      );
    }
    distanceToPoint(t) {
      return Y.copy(t).clamp(this.min, this.max).sub(t).length();
    }
    getBoundingSphere(t) {
      return (
        void 0 === t &&
          console.error(
            "THREE.Box3: .getBoundingSphere() target is now required"
          ),
        this.getCenter(t.center),
        (t.radius = 0.5 * this.getSize(Y).length()),
        t
      );
    }
    intersect(t) {
      return (
        this.min.max(t.min),
        this.max.min(t.max),
        this.isEmpty() && this.makeEmpty(),
        this
      );
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return (
        this.isEmpty() ||
          (X[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          X[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          X[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          X[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          X[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          X[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          X[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          X[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.setFromPoints(X)),
        this
      );
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }
  function q(t, e, n, i, r) {
    for (let o = 0, s = t.length - 3; o <= s; o += 3) {
      ot.fromArray(t, o);
      const s =
          r.x * Math.abs(ot.x) + r.y * Math.abs(ot.y) + r.z * Math.abs(ot.z),
        a = e.dot(ot),
        c = n.dot(ot),
        l = i.dot(ot);
      if (Math.max(-Math.max(a, c, l), Math.min(a, c, l)) > s) return !1;
    }
    return !0;
  }
  const X = [
      new G(),
      new G(),
      new G(),
      new G(),
      new G(),
      new G(),
      new G(),
      new G(),
    ],
    Y = new G(),
    Z = new W(),
    J = new G(),
    Q = new G(),
    K = new G(),
    $ = new G(),
    tt = new G(),
    et = new G(),
    nt = new G(),
    it = new G(),
    rt = new G(),
    ot = new G(),
    st = new W();
  class at {
    constructor(t, e) {
      (this.center = void 0 !== t ? t : new G()),
        (this.radius = void 0 !== e ? e : -1);
    }
    set(t, e) {
      return this.center.copy(t), (this.radius = e), this;
    }
    setFromPoints(t, e) {
      const n = this.center;
      void 0 !== e ? n.copy(e) : st.setFromPoints(t).getCenter(n);
      let i = 0;
      for (let e = 0, r = t.length; e < r; e++)
        i = Math.max(i, n.distanceToSquared(t[e]));
      return (this.radius = Math.sqrt(i)), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.center.copy(t.center), (this.radius = t.radius), this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), (this.radius = -1), this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      const n = this.center.distanceToSquared(t);
      return (
        void 0 === e &&
          (console.warn("THREE.Sphere: .clampPoint() target is now required"),
          (e = new G())),
        e.copy(t),
        n > this.radius * this.radius &&
          (e.sub(this.center).normalize(),
          e.multiplyScalar(this.radius).add(this.center)),
        e
      );
    }
    getBoundingBox(t) {
      return (
        void 0 === t &&
          (console.warn(
            "THREE.Sphere: .getBoundingBox() target is now required"
          ),
          (t = new W())),
        this.isEmpty()
          ? (t.makeEmpty(), t)
          : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
      );
    }
    applyMatrix4(t) {
      return (
        this.center.applyMatrix4(t),
        (this.radius = this.radius * t.getMaxScaleOnAxis()),
        this
      );
    }
    translate(t) {
      return this.center.add(t), this;
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
  }
  const ct = new G(),
    lt = new G(),
    ht = new G(),
    ut = new G(),
    dt = new G(),
    pt = new G(),
    ft = new G();
  class mt {
    constructor(t, e) {
      (this.origin = void 0 !== t ? t : new G()),
        (this.direction = void 0 !== e ? e : new G(0, 0, -1));
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Ray: .at() target is now required"),
          (e = new G())),
        e.copy(this.direction).multiplyScalar(t).add(this.origin)
      );
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, ct)), this;
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn(
          "THREE.Ray: .closestPointToPoint() target is now required"
        ),
        (e = new G())),
        e.subVectors(t, this.origin);
      const n = e.dot(this.direction);
      return n < 0
        ? e.copy(this.origin)
        : e.copy(this.direction).multiplyScalar(n).add(this.origin);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      const e = ct.subVectors(t, this.origin).dot(this.direction);
      return e < 0
        ? this.origin.distanceToSquared(t)
        : (ct.copy(this.direction).multiplyScalar(e).add(this.origin),
          ct.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, n, i) {
      lt.copy(t).add(e).multiplyScalar(0.5),
        ht.copy(e).sub(t).normalize(),
        ut.copy(this.origin).sub(lt);
      const r = 0.5 * t.distanceTo(e),
        o = -this.direction.dot(ht),
        s = ut.dot(this.direction),
        a = -ut.dot(ht),
        c = ut.lengthSq(),
        l = Math.abs(1 - o * o);
      let h, u, d, p;
      if (l > 0)
        if (((h = o * a - s), (u = o * s - a), (p = r * l), h >= 0))
          if (u >= -p)
            if (u <= p) {
              const t = 1 / l;
              (h *= t),
                (u *= t),
                (d = h * (h + o * u + 2 * s) + u * (o * h + u + 2 * a) + c);
            } else
              (u = r),
                (h = Math.max(0, -(o * u + s))),
                (d = -h * h + u * (u + 2 * a) + c);
          else
            (u = -r),
              (h = Math.max(0, -(o * u + s))),
              (d = -h * h + u * (u + 2 * a) + c);
        else
          u <= -p
            ? ((h = Math.max(0, -(-o * r + s))),
              (u = h > 0 ? -r : Math.min(Math.max(-r, -a), r)),
              (d = -h * h + u * (u + 2 * a) + c))
            : u <= p
            ? ((h = 0),
              (u = Math.min(Math.max(-r, -a), r)),
              (d = u * (u + 2 * a) + c))
            : ((h = Math.max(0, -(o * r + s))),
              (u = h > 0 ? r : Math.min(Math.max(-r, -a), r)),
              (d = -h * h + u * (u + 2 * a) + c));
      else
        (u = o > 0 ? -r : r),
          (h = Math.max(0, -(o * u + s))),
          (d = -h * h + u * (u + 2 * a) + c);
      return (
        n && n.copy(this.direction).multiplyScalar(h).add(this.origin),
        i && i.copy(ht).multiplyScalar(u).add(lt),
        d
      );
    }
    intersectSphere(t, e) {
      ct.subVectors(t.center, this.origin);
      const n = ct.dot(this.direction),
        i = ct.dot(ct) - n * n,
        r = t.radius * t.radius;
      if (i > r) return null;
      const o = Math.sqrt(r - i),
        s = n - o,
        a = n + o;
      return s < 0 && a < 0 ? null : s < 0 ? this.at(a, e) : this.at(s, e);
    }
    intersectsSphere(t) {
      return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      const e = t.normal.dot(this.direction);
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
      const n = -(this.origin.dot(t.normal) + t.constant) / e;
      return n >= 0 ? n : null;
    }
    intersectPlane(t, e) {
      const n = this.distanceToPlane(t);
      return null === n ? null : this.at(n, e);
    }
    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin);
      return 0 === e || t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let n, i, r, o, s, a;
      const c = 1 / this.direction.x,
        l = 1 / this.direction.y,
        h = 1 / this.direction.z,
        u = this.origin;
      return (
        c >= 0
          ? ((n = (t.min.x - u.x) * c), (i = (t.max.x - u.x) * c))
          : ((n = (t.max.x - u.x) * c), (i = (t.min.x - u.x) * c)),
        l >= 0
          ? ((r = (t.min.y - u.y) * l), (o = (t.max.y - u.y) * l))
          : ((r = (t.max.y - u.y) * l), (o = (t.min.y - u.y) * l)),
        n > o || r > i
          ? null
          : ((r > n || n != n) && (n = r),
            (o < i || i != i) && (i = o),
            h >= 0
              ? ((s = (t.min.z - u.z) * h), (a = (t.max.z - u.z) * h))
              : ((s = (t.max.z - u.z) * h), (a = (t.min.z - u.z) * h)),
            n > a || s > i
              ? null
              : ((s > n || n != n) && (n = s),
                (a < i || i != i) && (i = a),
                i < 0 ? null : this.at(n >= 0 ? n : i, e)))
      );
    }
    intersectsBox(t) {
      return null !== this.intersectBox(t, ct);
    }
    intersectTriangle(t, e, n, i, r) {
      dt.subVectors(e, t), pt.subVectors(n, t), ft.crossVectors(dt, pt);
      let o,
        s = this.direction.dot(ft);
      if (s > 0) {
        if (i) return null;
        o = 1;
      } else {
        if (!(s < 0)) return null;
        (o = -1), (s = -s);
      }
      ut.subVectors(this.origin, t);
      const a = o * this.direction.dot(pt.crossVectors(ut, pt));
      if (a < 0) return null;
      const c = o * this.direction.dot(dt.cross(ut));
      if (c < 0) return null;
      if (a + c > s) return null;
      const l = -o * ut.dot(ft);
      return l < 0 ? null : this.at(l / s, r);
    }
    applyMatrix4(t) {
      return (
        this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
      );
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
  }
  class gt {
    constructor() {
      Object.defineProperty(this, "isMatrix4", { value: !0 }),
        (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        arguments.length > 0 &&
          console.error(
            "THREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
          );
    }
    set(t, e, n, i, r, o, s, a, c, l, h, u, d, p, f, m) {
      const g = this.elements;
      return (
        (g[0] = t),
        (g[4] = e),
        (g[8] = n),
        (g[12] = i),
        (g[1] = r),
        (g[5] = o),
        (g[9] = s),
        (g[13] = a),
        (g[2] = c),
        (g[6] = l),
        (g[10] = h),
        (g[14] = u),
        (g[3] = d),
        (g[7] = p),
        (g[11] = f),
        (g[15] = m),
        this
      );
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new gt().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        n = t.elements;
      return (
        (e[0] = n[0]),
        (e[1] = n[1]),
        (e[2] = n[2]),
        (e[3] = n[3]),
        (e[4] = n[4]),
        (e[5] = n[5]),
        (e[6] = n[6]),
        (e[7] = n[7]),
        (e[8] = n[8]),
        (e[9] = n[9]),
        (e[10] = n[10]),
        (e[11] = n[11]),
        (e[12] = n[12]),
        (e[13] = n[13]),
        (e[14] = n[14]),
        (e[15] = n[15]),
        this
      );
    }
    copyPosition(t) {
      const e = this.elements,
        n = t.elements;
      return (e[12] = n[12]), (e[13] = n[13]), (e[14] = n[14]), this;
    }
    extractBasis(t, e, n) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        n.setFromMatrixColumn(this, 2),
        this
      );
    }
    makeBasis(t, e, n) {
      return (
        this.set(
          t.x,
          e.x,
          n.x,
          0,
          t.y,
          e.y,
          n.y,
          0,
          t.z,
          e.z,
          n.z,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    extractRotation(t) {
      const e = this.elements,
        n = t.elements,
        i = 1 / vt.setFromMatrixColumn(t, 0).length(),
        r = 1 / vt.setFromMatrixColumn(t, 1).length(),
        o = 1 / vt.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = n[0] * i),
        (e[1] = n[1] * i),
        (e[2] = n[2] * i),
        (e[3] = 0),
        (e[4] = n[4] * r),
        (e[5] = n[5] * r),
        (e[6] = n[6] * r),
        (e[7] = 0),
        (e[8] = n[8] * o),
        (e[9] = n[9] * o),
        (e[10] = n[10] * o),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      (t && t.isEuler) ||
        console.error(
          "THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order."
        );
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z,
        o = Math.cos(n),
        s = Math.sin(n),
        a = Math.cos(i),
        c = Math.sin(i),
        l = Math.cos(r),
        h = Math.sin(r);
      if ("XYZ" === t.order) {
        const t = o * l,
          n = o * h,
          i = s * l,
          r = s * h;
        (e[0] = a * l),
          (e[4] = -a * h),
          (e[8] = c),
          (e[1] = n + i * c),
          (e[5] = t - r * c),
          (e[9] = -s * a),
          (e[2] = r - t * c),
          (e[6] = i + n * c),
          (e[10] = o * a);
      } else if ("YXZ" === t.order) {
        const t = a * l,
          n = a * h,
          i = c * l,
          r = c * h;
        (e[0] = t + r * s),
          (e[4] = i * s - n),
          (e[8] = o * c),
          (e[1] = o * h),
          (e[5] = o * l),
          (e[9] = -s),
          (e[2] = n * s - i),
          (e[6] = r + t * s),
          (e[10] = o * a);
      } else if ("ZXY" === t.order) {
        const t = a * l,
          n = a * h,
          i = c * l,
          r = c * h;
        (e[0] = t - r * s),
          (e[4] = -o * h),
          (e[8] = i + n * s),
          (e[1] = n + i * s),
          (e[5] = o * l),
          (e[9] = r - t * s),
          (e[2] = -o * c),
          (e[6] = s),
          (e[10] = o * a);
      } else if ("ZYX" === t.order) {
        const t = o * l,
          n = o * h,
          i = s * l,
          r = s * h;
        (e[0] = a * l),
          (e[4] = i * c - n),
          (e[8] = t * c + r),
          (e[1] = a * h),
          (e[5] = r * c + t),
          (e[9] = n * c - i),
          (e[2] = -c),
          (e[6] = s * a),
          (e[10] = o * a);
      } else if ("YZX" === t.order) {
        const t = o * a,
          n = o * c,
          i = s * a,
          r = s * c;
        (e[0] = a * l),
          (e[4] = r - t * h),
          (e[8] = i * h + n),
          (e[1] = h),
          (e[5] = o * l),
          (e[9] = -s * l),
          (e[2] = -c * l),
          (e[6] = n * h + i),
          (e[10] = t - r * h);
      } else if ("XZY" === t.order) {
        const t = o * a,
          n = o * c,
          i = s * a,
          r = s * c;
        (e[0] = a * l),
          (e[4] = -h),
          (e[8] = c * l),
          (e[1] = t * h + r),
          (e[5] = o * l),
          (e[9] = n * h - i),
          (e[2] = i * h - n),
          (e[6] = s * l),
          (e[10] = r * h + t);
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromQuaternion(t) {
      return this.compose(_t, t, xt);
    }
    lookAt(t, e, n) {
      const i = this.elements;
      return (
        Mt.subVectors(t, e),
        0 === Mt.lengthSq() && (Mt.z = 1),
        Mt.normalize(),
        bt.crossVectors(n, Mt),
        0 === bt.lengthSq() &&
          (1 === Math.abs(n.z) ? (Mt.x += 1e-4) : (Mt.z += 1e-4),
          Mt.normalize(),
          bt.crossVectors(n, Mt)),
        bt.normalize(),
        wt.crossVectors(Mt, bt),
        (i[0] = bt.x),
        (i[4] = wt.x),
        (i[8] = Mt.x),
        (i[1] = bt.y),
        (i[5] = wt.y),
        (i[9] = Mt.y),
        (i[2] = bt.z),
        (i[6] = wt.z),
        (i[10] = Mt.z),
        this
      );
    }
    multiply(t, e) {
      return void 0 !== e
        ? (console.warn(
            "THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
          ),
          this.multiplyMatrices(t, e))
        : this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const n = t.elements,
        i = e.elements,
        r = this.elements,
        o = n[0],
        s = n[4],
        a = n[8],
        c = n[12],
        l = n[1],
        h = n[5],
        u = n[9],
        d = n[13],
        p = n[2],
        f = n[6],
        m = n[10],
        g = n[14],
        v = n[3],
        y = n[7],
        _ = n[11],
        x = n[15],
        b = i[0],
        w = i[4],
        M = i[8],
        S = i[12],
        E = i[1],
        T = i[5],
        A = i[9],
        L = i[13],
        C = i[2],
        R = i[6],
        P = i[10],
        O = i[14],
        N = i[3],
        I = i[7],
        D = i[11],
        z = i[15];
      return (
        (r[0] = o * b + s * E + a * C + c * N),
        (r[4] = o * w + s * T + a * R + c * I),
        (r[8] = o * M + s * A + a * P + c * D),
        (r[12] = o * S + s * L + a * O + c * z),
        (r[1] = l * b + h * E + u * C + d * N),
        (r[5] = l * w + h * T + u * R + d * I),
        (r[9] = l * M + h * A + u * P + d * D),
        (r[13] = l * S + h * L + u * O + d * z),
        (r[2] = p * b + f * E + m * C + g * N),
        (r[6] = p * w + f * T + m * R + g * I),
        (r[10] = p * M + f * A + m * P + g * D),
        (r[14] = p * S + f * L + m * O + g * z),
        (r[3] = v * b + y * E + _ * C + x * N),
        (r[7] = v * w + y * T + _ * R + x * I),
        (r[11] = v * M + y * A + _ * P + x * D),
        (r[15] = v * S + y * L + _ * O + x * z),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        n = t[4],
        i = t[8],
        r = t[12],
        o = t[1],
        s = t[5],
        a = t[9],
        c = t[13],
        l = t[2],
        h = t[6],
        u = t[10],
        d = t[14];
      return (
        t[3] *
          (+r * a * h -
            i * c * h -
            r * s * u +
            n * c * u +
            i * s * d -
            n * a * d) +
        t[7] *
          (+e * a * d -
            e * c * u +
            r * o * u -
            i * o * d +
            i * c * l -
            r * a * l) +
        t[11] *
          (+e * c * h -
            e * s * d -
            r * o * h +
            n * o * d +
            r * s * l -
            n * c * l) +
        t[15] *
          (-i * s * l -
            e * a * h +
            e * s * u +
            i * o * h -
            n * o * u +
            n * a * l)
      );
    }
    transpose() {
      const t = this.elements;
      let e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, n) {
      const i = this.elements;
      return (
        t.isVector3
          ? ((i[12] = t.x), (i[13] = t.y), (i[14] = t.z))
          : ((i[12] = t), (i[13] = e), (i[14] = n)),
        this
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        o = t[4],
        s = t[5],
        a = t[6],
        c = t[7],
        l = t[8],
        h = t[9],
        u = t[10],
        d = t[11],
        p = t[12],
        f = t[13],
        m = t[14],
        g = t[15],
        v =
          h * m * c - f * u * c + f * a * d - s * m * d - h * a * g + s * u * g,
        y =
          p * u * c - l * m * c - p * a * d + o * m * d + l * a * g - o * u * g,
        _ =
          l * f * c - p * h * c + p * s * d - o * f * d - l * s * g + o * h * g,
        x =
          p * h * a - l * f * a - p * s * u + o * f * u + l * s * m - o * h * m,
        b = e * v + n * y + i * _ + r * x;
      if (0 === b)
        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const w = 1 / b;
      return (
        (t[0] = v * w),
        (t[1] =
          (f * u * r -
            h * m * r -
            f * i * d +
            n * m * d +
            h * i * g -
            n * u * g) *
          w),
        (t[2] =
          (s * m * r -
            f * a * r +
            f * i * c -
            n * m * c -
            s * i * g +
            n * a * g) *
          w),
        (t[3] =
          (h * a * r -
            s * u * r -
            h * i * c +
            n * u * c +
            s * i * d -
            n * a * d) *
          w),
        (t[4] = y * w),
        (t[5] =
          (l * m * r -
            p * u * r +
            p * i * d -
            e * m * d -
            l * i * g +
            e * u * g) *
          w),
        (t[6] =
          (p * a * r -
            o * m * r -
            p * i * c +
            e * m * c +
            o * i * g -
            e * a * g) *
          w),
        (t[7] =
          (o * u * r -
            l * a * r +
            l * i * c -
            e * u * c -
            o * i * d +
            e * a * d) *
          w),
        (t[8] = _ * w),
        (t[9] =
          (p * h * r -
            l * f * r -
            p * n * d +
            e * f * d +
            l * n * g -
            e * h * g) *
          w),
        (t[10] =
          (o * f * r -
            p * s * r +
            p * n * c -
            e * f * c -
            o * n * g +
            e * s * g) *
          w),
        (t[11] =
          (l * s * r -
            o * h * r -
            l * n * c +
            e * h * c +
            o * n * d -
            e * s * d) *
          w),
        (t[12] = x * w),
        (t[13] =
          (l * f * i -
            p * h * i +
            p * n * u -
            e * f * u -
            l * n * m +
            e * h * m) *
          w),
        (t[14] =
          (p * s * i -
            o * f * i -
            p * n * a +
            e * f * a +
            o * n * m -
            e * s * m) *
          w),
        (t[15] =
          (o * h * i -
            l * s * i +
            l * n * a -
            e * h * a -
            o * n * u +
            e * s * u) *
          w),
        this
      );
    }
    scale(t) {
      const e = this.elements,
        n = t.x,
        i = t.y,
        r = t.z;
      return (
        (e[0] *= n),
        (e[4] *= i),
        (e[8] *= r),
        (e[1] *= n),
        (e[5] *= i),
        (e[9] *= r),
        (e[2] *= n),
        (e[6] *= i),
        (e[10] *= r),
        (e[3] *= n),
        (e[7] *= i),
        (e[11] *= r),
        this
      );
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, n, i));
    }
    makeTranslation(t, e, n) {
      return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        n = Math.sin(t);
      return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      const n = Math.cos(e),
        i = Math.sin(e),
        r = 1 - n,
        o = t.x,
        s = t.y,
        a = t.z,
        c = r * o,
        l = r * s;
      return (
        this.set(
          c * o + n,
          c * s - i * a,
          c * a + i * s,
          0,
          c * s + i * a,
          l * s + n,
          l * a - i * o,
          0,
          c * a - i * s,
          l * a + i * o,
          r * a * a + n,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    }
    makeScale(t, e, n) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, n) {
      return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, n) {
      const i = this.elements,
        r = e._x,
        o = e._y,
        s = e._z,
        a = e._w,
        c = r + r,
        l = o + o,
        h = s + s,
        u = r * c,
        d = r * l,
        p = r * h,
        f = o * l,
        m = o * h,
        g = s * h,
        v = a * c,
        y = a * l,
        _ = a * h,
        x = n.x,
        b = n.y,
        w = n.z;
      return (
        (i[0] = (1 - (f + g)) * x),
        (i[1] = (d + _) * x),
        (i[2] = (p - y) * x),
        (i[3] = 0),
        (i[4] = (d - _) * b),
        (i[5] = (1 - (u + g)) * b),
        (i[6] = (m + v) * b),
        (i[7] = 0),
        (i[8] = (p + y) * w),
        (i[9] = (m - v) * w),
        (i[10] = (1 - (u + f)) * w),
        (i[11] = 0),
        (i[12] = t.x),
        (i[13] = t.y),
        (i[14] = t.z),
        (i[15] = 1),
        this
      );
    }
    decompose(t, e, n) {
      const i = this.elements;
      let r = vt.set(i[0], i[1], i[2]).length();
      const o = vt.set(i[4], i[5], i[6]).length(),
        s = vt.set(i[8], i[9], i[10]).length();
      this.determinant() < 0 && (r = -r),
        (t.x = i[12]),
        (t.y = i[13]),
        (t.z = i[14]),
        yt.copy(this);
      const a = 1 / r,
        c = 1 / o,
        l = 1 / s;
      return (
        (yt.elements[0] *= a),
        (yt.elements[1] *= a),
        (yt.elements[2] *= a),
        (yt.elements[4] *= c),
        (yt.elements[5] *= c),
        (yt.elements[6] *= c),
        (yt.elements[8] *= l),
        (yt.elements[9] *= l),
        (yt.elements[10] *= l),
        e.setFromRotationMatrix(yt),
        (n.x = r),
        (n.y = o),
        (n.z = s),
        this
      );
    }
    makePerspective(t, e, n, i, r, o) {
      void 0 === o &&
        console.warn(
          "THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs."
        );
      const s = this.elements,
        a = (2 * r) / (e - t),
        c = (2 * r) / (n - i),
        l = (e + t) / (e - t),
        h = (n + i) / (n - i),
        u = -(o + r) / (o - r),
        d = (-2 * o * r) / (o - r);
      return (
        (s[0] = a),
        (s[4] = 0),
        (s[8] = l),
        (s[12] = 0),
        (s[1] = 0),
        (s[5] = c),
        (s[9] = h),
        (s[13] = 0),
        (s[2] = 0),
        (s[6] = 0),
        (s[10] = u),
        (s[14] = d),
        (s[3] = 0),
        (s[7] = 0),
        (s[11] = -1),
        (s[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, n, i, r, o) {
      const s = this.elements,
        a = 1 / (e - t),
        c = 1 / (n - i),
        l = 1 / (o - r),
        h = (e + t) * a,
        u = (n + i) * c,
        d = (o + r) * l;
      return (
        (s[0] = 2 * a),
        (s[4] = 0),
        (s[8] = 0),
        (s[12] = -h),
        (s[1] = 0),
        (s[5] = 2 * c),
        (s[9] = 0),
        (s[13] = -u),
        (s[2] = 0),
        (s[6] = 0),
        (s[10] = -2 * l),
        (s[14] = -d),
        (s[3] = 0),
        (s[7] = 0),
        (s[11] = 0),
        (s[15] = 1),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        n = t.elements;
      for (let t = 0; t < 16; t++) if (e[t] !== n[t]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.elements;
      return (
        (t[e] = n[0]),
        (t[e + 1] = n[1]),
        (t[e + 2] = n[2]),
        (t[e + 3] = n[3]),
        (t[e + 4] = n[4]),
        (t[e + 5] = n[5]),
        (t[e + 6] = n[6]),
        (t[e + 7] = n[7]),
        (t[e + 8] = n[8]),
        (t[e + 9] = n[9]),
        (t[e + 10] = n[10]),
        (t[e + 11] = n[11]),
        (t[e + 12] = n[12]),
        (t[e + 13] = n[13]),
        (t[e + 14] = n[14]),
        (t[e + 15] = n[15]),
        t
      );
    }
  }
  const vt = new G(),
    yt = new gt(),
    _t = new G(0, 0, 0),
    xt = new G(1, 1, 1),
    bt = new G(),
    wt = new G(),
    Mt = new G();
  class St {
    constructor(t = 0, e = 0, n = 0, i = St.DefaultOrder) {
      Object.defineProperty(this, "isEuler", { value: !0 }),
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._order = i);
    }
    get x() {
      return this._x;
    }
    set x(t) {
      (this._x = t), this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      (this._y = t), this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      (this._z = t), this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      (this._order = t), this._onChangeCallback();
    }
    set(t, e, n, i) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = n),
        (this._order = i || this._order),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t, e, n) {
      const i = R.clamp,
        r = t.elements,
        o = r[0],
        s = r[4],
        a = r[8],
        c = r[1],
        l = r[5],
        h = r[9],
        u = r[2],
        d = r[6],
        p = r[10];
      switch ((e = e || this._order)) {
        case "XYZ":
          (this._y = Math.asin(i(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(-h, p)), (this._z = Math.atan2(-s, o)))
              : ((this._x = Math.atan2(d, l)), (this._z = 0));
          break;
        case "YXZ":
          (this._x = Math.asin(-i(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._y = Math.atan2(a, p)), (this._z = Math.atan2(c, l)))
              : ((this._y = Math.atan2(-u, o)), (this._z = 0));
          break;
        case "ZXY":
          (this._x = Math.asin(i(d, -1, 1))),
            Math.abs(d) < 0.9999999
              ? ((this._y = Math.atan2(-u, p)), (this._z = Math.atan2(-s, l)))
              : ((this._y = 0), (this._z = Math.atan2(c, o)));
          break;
        case "ZYX":
          (this._y = Math.asin(-i(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._x = Math.atan2(d, p)), (this._z = Math.atan2(c, o)))
              : ((this._x = 0), (this._z = Math.atan2(-s, l)));
          break;
        case "YZX":
          (this._z = Math.asin(i(c, -1, 1))),
            Math.abs(c) < 0.9999999
              ? ((this._x = Math.atan2(-h, l)), (this._y = Math.atan2(-u, o)))
              : ((this._x = 0), (this._y = Math.atan2(a, p)));
          break;
        case "XZY":
          (this._z = Math.asin(-i(s, -1, 1))),
            Math.abs(s) < 0.9999999
              ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(a, o)))
              : ((this._x = Math.atan2(-h, p)), (this._y = 0));
          break;
        default:
          console.warn(
            "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
              e
          );
      }
      return (this._order = e), !1 !== n && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, n) {
      return (
        Et.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Et, e, n)
      );
    }
    setFromVector3(t, e) {
      return this.set(t.x, t.y, t.z, e || this._order);
    }
    reorder(t) {
      return Tt.setFromEuler(this), this.setFromQuaternion(Tt, t);
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._order === this._order
      );
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        void 0 !== t[3] && (this._order = t[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._order),
        t
      );
    }
    toVector3(t) {
      return t
        ? t.set(this._x, this._y, this._z)
        : new G(this._x, this._y, this._z);
    }
    _onChange(t) {
      return (this._onChangeCallback = t), this;
    }
    _onChangeCallback() {}
  }
  (St.DefaultOrder = "XYZ"),
    (St.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"]);
  const Et = new gt(),
    Tt = new k();
  class At {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = (1 << t) | 0;
    }
    enable(t) {
      this.mask |= (1 << t) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0;
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return 0 != (this.mask & t.mask);
    }
  }
  let Lt = 0;
  const Ct = new G(),
    Rt = new k(),
    Pt = new gt(),
    Ot = new G(),
    Nt = new G(),
    It = new G(),
    Dt = new k(),
    zt = new G(1, 0, 0),
    Bt = new G(0, 1, 0),
    Ut = new G(0, 0, 1),
    Ht = { type: "added" },
    Ft = { type: "removed" };
  function kt() {
    Object.defineProperty(this, "id", { value: Lt++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = kt.DefaultUp.clone());
    const t = new G(),
      e = new St(),
      n = new k(),
      i = new G(1, 1, 1);
    e._onChange(function () {
      n.setFromEuler(e, !1);
    }),
      n._onChange(function () {
        e.setFromQuaternion(n, void 0, !1);
      }),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: t },
        rotation: { configurable: !0, enumerable: !0, value: e },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: i },
        modelViewMatrix: { value: new gt() },
        normalMatrix: { value: new O() },
      }),
      (this.matrix = new gt()),
      (this.matrixWorld = new gt()),
      (this.matrixAutoUpdate = kt.DefaultMatrixAutoUpdate),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new At()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.userData = {});
  }
  (kt.DefaultUp = new G(0, 1, 0)),
    (kt.DefaultMatrixAutoUpdate = !0),
    (kt.prototype = Object.assign(Object.create(A.prototype), {
      constructor: kt,
      isObject3D: !0,
      onBeforeRender: function () {},
      onAfterRender: function () {},
      applyMatrix4: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          this.matrix.premultiply(t),
          this.matrix.decompose(this.position, this.quaternion, this.scale);
      },
      applyQuaternion: function (t) {
        return this.quaternion.premultiply(t), this;
      },
      setRotationFromAxisAngle: function (t, e) {
        this.quaternion.setFromAxisAngle(t, e);
      },
      setRotationFromEuler: function (t) {
        this.quaternion.setFromEuler(t, !0);
      },
      setRotationFromMatrix: function (t) {
        this.quaternion.setFromRotationMatrix(t);
      },
      setRotationFromQuaternion: function (t) {
        this.quaternion.copy(t);
      },
      rotateOnAxis: function (t, e) {
        return Rt.setFromAxisAngle(t, e), this.quaternion.multiply(Rt), this;
      },
      rotateOnWorldAxis: function (t, e) {
        return Rt.setFromAxisAngle(t, e), this.quaternion.premultiply(Rt), this;
      },
      rotateX: function (t) {
        return this.rotateOnAxis(zt, t);
      },
      rotateY: function (t) {
        return this.rotateOnAxis(Bt, t);
      },
      rotateZ: function (t) {
        return this.rotateOnAxis(Ut, t);
      },
      translateOnAxis: function (t, e) {
        return (
          Ct.copy(t).applyQuaternion(this.quaternion),
          this.position.add(Ct.multiplyScalar(e)),
          this
        );
      },
      translateX: function (t) {
        return this.translateOnAxis(zt, t);
      },
      translateY: function (t) {
        return this.translateOnAxis(Bt, t);
      },
      translateZ: function (t) {
        return this.translateOnAxis(Ut, t);
      },
      localToWorld: function (t) {
        return t.applyMatrix4(this.matrixWorld);
      },
      worldToLocal: function (t) {
        return t.applyMatrix4(Pt.copy(this.matrixWorld).invert());
      },
      lookAt: function (t, e, n) {
        t.isVector3 ? Ot.copy(t) : Ot.set(t, e, n);
        const i = this.parent;
        this.updateWorldMatrix(!0, !1),
          Nt.setFromMatrixPosition(this.matrixWorld),
          this.isCamera || this.isLight
            ? Pt.lookAt(Nt, Ot, this.up)
            : Pt.lookAt(Ot, Nt, this.up),
          this.quaternion.setFromRotationMatrix(Pt),
          i &&
            (Pt.extractRotation(i.matrixWorld),
            Rt.setFromRotationMatrix(Pt),
            this.quaternion.premultiply(Rt.invert()));
      },
      add: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
          return this;
        }
        return t === this
          ? (console.error(
              "THREE.Object3D.add: object can't be added as a child of itself.",
              t
            ),
            this)
          : (t && t.isObject3D
              ? (null !== t.parent && t.parent.remove(t),
                (t.parent = this),
                this.children.push(t),
                t.dispatchEvent(Ht))
              : console.error(
                  "THREE.Object3D.add: object not an instance of THREE.Object3D.",
                  t
                ),
            this);
      },
      remove: function (t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
          return this;
        }
        const e = this.children.indexOf(t);
        return (
          -1 !== e &&
            ((t.parent = null),
            this.children.splice(e, 1),
            t.dispatchEvent(Ft)),
          this
        );
      },
      clear: function () {
        for (let t = 0; t < this.children.length; t++) {
          const e = this.children[t];
          (e.parent = null), e.dispatchEvent(Ft);
        }
        return (this.children.length = 0), this;
      },
      attach: function (t) {
        return (
          this.updateWorldMatrix(!0, !1),
          Pt.copy(this.matrixWorld).invert(),
          null !== t.parent &&
            (t.parent.updateWorldMatrix(!0, !1),
            Pt.multiply(t.parent.matrixWorld)),
          t.applyMatrix4(Pt),
          t.updateWorldMatrix(!1, !1),
          this.add(t),
          this
        );
      },
      getObjectById: function (t) {
        return this.getObjectByProperty("id", t);
      },
      getObjectByName: function (t) {
        return this.getObjectByProperty("name", t);
      },
      getObjectByProperty: function (t, e) {
        if (this[t] === e) return this;
        for (let n = 0, i = this.children.length; n < i; n++) {
          const i = this.children[n].getObjectByProperty(t, e);
          if (void 0 !== i) return i;
        }
      },
      getWorldPosition: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldPosition() target is now required"
            ),
            (t = new G())),
          this.updateWorldMatrix(!0, !1),
          t.setFromMatrixPosition(this.matrixWorld)
        );
      },
      getWorldQuaternion: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldQuaternion() target is now required"
            ),
            (t = new k())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Nt, t, It),
          t
        );
      },
      getWorldScale: function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "THREE.Object3D: .getWorldScale() target is now required"
            ),
            (t = new G())),
          this.updateWorldMatrix(!0, !1),
          this.matrixWorld.decompose(Nt, Dt, t),
          t
        );
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn(
            "THREE.Object3D: .getWorldDirection() target is now required"
          ),
          (t = new G())),
          this.updateWorldMatrix(!0, !1);
        const e = this.matrixWorld.elements;
        return t.set(e[8], e[9], e[10]).normalize();
      },
      raycast: function () {},
      traverse: function (t) {
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t);
      },
      traverseVisible: function (t) {
        if (!1 === this.visible) return;
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t);
      },
      traverseAncestors: function (t) {
        const e = this.parent;
        null !== e && (t(e), e.traverseAncestors(t));
      },
      updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale),
          (this.matrixWorldNeedsUpdate = !0);
      },
      updateMatrixWorld: function (t) {
        this.matrixAutoUpdate && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate || t) &&
            (null === this.parent
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(
                  this.parent.matrixWorld,
                  this.matrix
                ),
            (this.matrixWorldNeedsUpdate = !1),
            (t = !0));
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t);
      },
      updateWorldMatrix: function (t, e) {
        const n = this.parent;
        if (
          (!0 === t && null !== n && n.updateWorldMatrix(!0, !1),
          this.matrixAutoUpdate && this.updateMatrix(),
          null === this.parent
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              ),
          !0 === e)
        ) {
          const t = this.children;
          for (let e = 0, n = t.length; e < n; e++)
            t[e].updateWorldMatrix(!1, !0);
        }
      },
      toJSON: function (t) {
        const e = void 0 === t || "string" == typeof t,
          n = {};
        e &&
          ((t = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
          }),
          (n.metadata = {
            version: 4.5,
            type: "Object",
            generator: "Object3D.toJSON",
          }));
        const i = {};
        function r(e, n) {
          return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid;
        }
        if (
          ((i.uuid = this.uuid),
          (i.type = this.type),
          "" !== this.name && (i.name = this.name),
          !0 === this.castShadow && (i.castShadow = !0),
          !0 === this.receiveShadow && (i.receiveShadow = !0),
          !1 === this.visible && (i.visible = !1),
          !1 === this.frustumCulled && (i.frustumCulled = !1),
          0 !== this.renderOrder && (i.renderOrder = this.renderOrder),
          "{}" !== JSON.stringify(this.userData) &&
            (i.userData = this.userData),
          (i.layers = this.layers.mask),
          (i.matrix = this.matrix.toArray()),
          !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1),
          this.isInstancedMesh &&
            ((i.type = "InstancedMesh"),
            (i.count = this.count),
            (i.instanceMatrix = this.instanceMatrix.toJSON())),
          this.isMesh || this.isLine || this.isPoints)
        ) {
          i.geometry = r(t.geometries, this.geometry);
          const e = this.geometry.parameters;
          if (void 0 !== e && void 0 !== e.shapes) {
            const n = e.shapes;
            if (Array.isArray(n))
              for (let e = 0, i = n.length; e < i; e++) {
                const i = n[e];
                r(t.shapes, i);
              }
            else r(t.shapes, n);
          }
        }
        if (
          (this.isSkinnedMesh &&
            ((i.bindMode = this.bindMode),
            (i.bindMatrix = this.bindMatrix.toArray()),
            void 0 !== this.skeleton &&
              (r(t.skeletons, this.skeleton),
              (i.skeleton = this.skeleton.uuid))),
          void 0 !== this.material)
        )
          if (Array.isArray(this.material)) {
            const e = [];
            for (let n = 0, i = this.material.length; n < i; n++)
              e.push(r(t.materials, this.material[n]));
            i.material = e;
          } else i.material = r(t.materials, this.material);
        if (this.children.length > 0) {
          i.children = [];
          for (let e = 0; e < this.children.length; e++)
            i.children.push(this.children[e].toJSON(t).object);
        }
        if (this.animations.length > 0) {
          i.animations = [];
          for (let e = 0; e < this.animations.length; e++) {
            const n = this.animations[e];
            i.animations.push(r(t.animations, n));
          }
        }
        if (e) {
          const e = o(t.geometries),
            i = o(t.materials),
            r = o(t.textures),
            s = o(t.images),
            a = o(t.shapes),
            c = o(t.skeletons),
            l = o(t.animations);
          e.length > 0 && (n.geometries = e),
            i.length > 0 && (n.materials = i),
            r.length > 0 && (n.textures = r),
            s.length > 0 && (n.images = s),
            a.length > 0 && (n.shapes = a),
            c.length > 0 && (n.skeletons = c),
            l.length > 0 && (n.animations = l);
        }
        return (n.object = i), n;
        function o(t) {
          const e = [];
          for (const n in t) {
            const i = t[n];
            delete i.metadata, e.push(i);
          }
          return e;
        }
      },
      clone: function (t) {
        return new this.constructor().copy(this, t);
      },
      copy: function (t, e = !0) {
        if (
          ((this.name = t.name),
          this.up.copy(t.up),
          this.position.copy(t.position),
          (this.rotation.order = t.rotation.order),
          this.quaternion.copy(t.quaternion),
          this.scale.copy(t.scale),
          this.matrix.copy(t.matrix),
          this.matrixWorld.copy(t.matrixWorld),
          (this.matrixAutoUpdate = t.matrixAutoUpdate),
          (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
          (this.layers.mask = t.layers.mask),
          (this.visible = t.visible),
          (this.castShadow = t.castShadow),
          (this.receiveShadow = t.receiveShadow),
          (this.frustumCulled = t.frustumCulled),
          (this.renderOrder = t.renderOrder),
          (this.userData = JSON.parse(JSON.stringify(t.userData))),
          !0 === e)
        )
          for (let e = 0; e < t.children.length; e++) {
            const n = t.children[e];
            this.add(n.clone());
          }
        return this;
      },
    }));
  const Gt = new G(),
    Vt = new G(),
    jt = new O();
  class Wt {
    constructor(t, e) {
      Object.defineProperty(this, "isPlane", { value: !0 }),
        (this.normal = void 0 !== t ? t : new G(1, 0, 0)),
        (this.constant = void 0 !== e ? e : 0);
    }
    set(t, e) {
      return this.normal.copy(t), (this.constant = e), this;
    }
    setComponents(t, e, n, i) {
      return this.normal.set(t, e, n), (this.constant = i), this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), (this.constant = -e.dot(this.normal)), this;
    }
    setFromCoplanarPoints(t, e, n) {
      const i = Gt.subVectors(n, e).cross(Vt.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(i, t), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.normal.copy(t.normal), (this.constant = t.constant), this;
    }
    normalize() {
      const t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), (this.constant *= t), this;
    }
    negate() {
      return (this.constant *= -1), this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return (
        void 0 === e &&
          (console.warn("THREE.Plane: .projectPoint() target is now required"),
          (e = new G())),
        e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
      );
    }
    intersectLine(t, e) {
      void 0 === e &&
        (console.warn("THREE.Plane: .intersectLine() target is now required"),
        (e = new G()));
      const n = t.delta(Gt),
        i = this.normal.dot(n);
      if (0 === i)
        return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : void 0;
      const r = -(t.start.dot(this.normal) + this.constant) / i;
      return r < 0 || r > 1 ? void 0 : e.copy(n).multiplyScalar(r).add(t.start);
    }
    intersectsLine(t) {
      const e = this.distanceToPoint(t.start),
        n = this.distanceToPoint(t.end);
      return (e < 0 && n > 0) || (n < 0 && e > 0);
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Plane: .coplanarPoint() target is now required"),
          (t = new G())),
        t.copy(this.normal).multiplyScalar(-this.constant)
      );
    }
    applyMatrix4(t, e) {
      const n = e || jt.getNormalMatrix(t),
        i = this.coplanarPoint(Gt).applyMatrix4(t),
        r = this.normal.applyMatrix3(n).normalize();
      return (this.constant = -i.dot(r)), this;
    }
    translate(t) {
      return (this.constant -= t.dot(this.normal)), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
  }
  const qt = new G(),
    Xt = new G(),
    Yt = new G(),
    Zt = new G(),
    Jt = new G(),
    Qt = new G(),
    Kt = new G(),
    $t = new G(),
    te = new G(),
    ee = new G();
  class ne {
    constructor(t, e, n) {
      (this.a = void 0 !== t ? t : new G()),
        (this.b = void 0 !== e ? e : new G()),
        (this.c = void 0 !== n ? n : new G());
    }
    static getNormal(t, e, n, i) {
      void 0 === i &&
        (console.warn("THREE.Triangle: .getNormal() target is now required"),
        (i = new G())),
        i.subVectors(n, e),
        qt.subVectors(t, e),
        i.cross(qt);
      const r = i.lengthSq();
      return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
    }
    static getBarycoord(t, e, n, i, r) {
      qt.subVectors(i, e), Xt.subVectors(n, e), Yt.subVectors(t, e);
      const o = qt.dot(qt),
        s = qt.dot(Xt),
        a = qt.dot(Yt),
        c = Xt.dot(Xt),
        l = Xt.dot(Yt),
        h = o * c - s * s;
      if (
        (void 0 === r &&
          (console.warn(
            "THREE.Triangle: .getBarycoord() target is now required"
          ),
          (r = new G())),
        0 === h)
      )
        return r.set(-2, -1, -1);
      const u = 1 / h,
        d = (c * a - s * l) * u,
        p = (o * l - s * a) * u;
      return r.set(1 - d - p, p, d);
    }
    static containsPoint(t, e, n, i) {
      return (
        this.getBarycoord(t, e, n, i, Zt),
        Zt.x >= 0 && Zt.y >= 0 && Zt.x + Zt.y <= 1
      );
    }
    static getUV(t, e, n, i, r, o, s, a) {
      return (
        this.getBarycoord(t, e, n, i, Zt),
        a.set(0, 0),
        a.addScaledVector(r, Zt.x),
        a.addScaledVector(o, Zt.y),
        a.addScaledVector(s, Zt.z),
        a
      );
    }
    static isFrontFacing(t, e, n, i) {
      return qt.subVectors(n, e), Xt.subVectors(t, e), qt.cross(Xt).dot(i) < 0;
    }
    set(t, e, n) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
    }
    setFromPointsAndIndices(t, e, n, i) {
      return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return (
        qt.subVectors(this.c, this.b),
        Xt.subVectors(this.a, this.b),
        0.5 * qt.cross(Xt).length()
      );
    }
    getMidpoint(t) {
      return (
        void 0 === t &&
          (console.warn(
            "THREE.Triangle: .getMidpoint() target is now required"
          ),
          (t = new G())),
        t
          .addVectors(this.a, this.b)
          .add(this.c)
          .multiplyScalar(1 / 3)
      );
    }
    getNormal(t) {
      return ne.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return (
        void 0 === t &&
          (console.warn("THREE.Triangle: .getPlane() target is now required"),
          (t = new Wt())),
        t.setFromCoplanarPoints(this.a, this.b, this.c)
      );
    }
    getBarycoord(t, e) {
      return ne.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getUV(t, e, n, i, r) {
      return ne.getUV(t, this.a, this.b, this.c, e, n, i, r);
    }
    containsPoint(t) {
      return ne.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return ne.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      void 0 === e &&
        (console.warn(
          "THREE.Triangle: .closestPointToPoint() target is now required"
        ),
        (e = new G()));
      const n = this.a,
        i = this.b,
        r = this.c;
      let o, s;
      Jt.subVectors(i, n), Qt.subVectors(r, n), $t.subVectors(t, n);
      const a = Jt.dot($t),
        c = Qt.dot($t);
      if (a <= 0 && c <= 0) return e.copy(n);
      te.subVectors(t, i);
      const l = Jt.dot(te),
        h = Qt.dot(te);
      if (l >= 0 && h <= l) return e.copy(i);
      const u = a * h - l * c;
      if (u <= 0 && a >= 0 && l <= 0)
        return (o = a / (a - l)), e.copy(n).addScaledVector(Jt, o);
      ee.subVectors(t, r);
      const d = Jt.dot(ee),
        p = Qt.dot(ee);
      if (p >= 0 && d <= p) return e.copy(r);
      const f = d * c - a * p;
      if (f <= 0 && c >= 0 && p <= 0)
        return (s = c / (c - p)), e.copy(n).addScaledVector(Qt, s);
      const m = l * p - d * h;
      if (m <= 0 && h - l >= 0 && d - p >= 0)
        return (
          Kt.subVectors(r, i),
          (s = (h - l) / (h - l + (d - p))),
          e.copy(i).addScaledVector(Kt, s)
        );
      const g = 1 / (m + f + u);
      return (
        (o = f * g),
        (s = u * g),
        e.copy(n).addScaledVector(Jt, o).addScaledVector(Qt, s)
      );
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  }
  const ie = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    re = { h: 0, s: 0, l: 0 },
    oe = { h: 0, s: 0, l: 0 };
  function se(t, e, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? t + 6 * (e - t) * n
        : n < 0.5
        ? e
        : n < 2 / 3
        ? t + 6 * (e - t) * (2 / 3 - n)
        : t
    );
  }
  function ae(t) {
    return t < 0.04045
      ? 0.0773993808 * t
      : Math.pow(0.9478672986 * t + 0.0521327014, 2.4);
  }
  function ce(t) {
    return t < 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055;
  }
  class le {
    constructor(t, e, n) {
      return (
        Object.defineProperty(this, "isColor", { value: !0 }),
        void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
      );
    }
    set(t) {
      return (
        t && t.isColor
          ? this.copy(t)
          : "number" == typeof t
          ? this.setHex(t)
          : "string" == typeof t && this.setStyle(t),
        this
      );
    }
    setScalar(t) {
      return (this.r = t), (this.g = t), (this.b = t), this;
    }
    setHex(t) {
      return (
        (t = Math.floor(t)),
        (this.r = ((t >> 16) & 255) / 255),
        (this.g = ((t >> 8) & 255) / 255),
        (this.b = (255 & t) / 255),
        this
      );
    }
    setRGB(t, e, n) {
      return (this.r = t), (this.g = e), (this.b = n), this;
    }
    setHSL(t, e, n) {
      if (
        ((t = R.euclideanModulo(t, 1)),
        (e = R.clamp(e, 0, 1)),
        (n = R.clamp(n, 0, 1)),
        0 === e)
      )
        this.r = this.g = this.b = n;
      else {
        const i = n <= 0.5 ? n * (1 + e) : n + e - n * e,
          r = 2 * n - i;
        (this.r = se(r, i, t + 1 / 3)),
          (this.g = se(r, i, t)),
          (this.b = se(r, i, t - 1 / 3));
      }
      return this;
    }
    setStyle(t) {
      function e(e) {
        void 0 !== e &&
          parseFloat(e) < 1 &&
          console.warn(
            "THREE.Color: Alpha component of " + t + " will be ignored."
          );
      }
      let n;
      if ((n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t))) {
        let t;
        const i = n[1],
          r = n[2];
        switch (i) {
          case "rgb":
          case "rgba":
            if (
              (t =
                /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            )
              return (
                (this.r = Math.min(255, parseInt(t[1], 10)) / 255),
                (this.g = Math.min(255, parseInt(t[2], 10)) / 255),
                (this.b = Math.min(255, parseInt(t[3], 10)) / 255),
                e(t[4]),
                this
              );
            if (
              (t =
                /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            )
              return (
                (this.r = Math.min(100, parseInt(t[1], 10)) / 100),
                (this.g = Math.min(100, parseInt(t[2], 10)) / 100),
                (this.b = Math.min(100, parseInt(t[3], 10)) / 100),
                e(t[4]),
                this
              );
            break;
          case "hsl":
          case "hsla":
            if (
              (t =
                /^(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  r
                ))
            ) {
              const n = parseFloat(t[1]) / 360,
                i = parseInt(t[2], 10) / 100,
                r = parseInt(t[3], 10) / 100;
              return e(t[4]), this.setHSL(n, i, r);
            }
        }
      } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(t))) {
        const t = n[1],
          e = t.length;
        if (3 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255),
            (this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255),
            (this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255),
            this
          );
        if (6 === e)
          return (
            (this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255),
            (this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255),
            (this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255),
            this
          );
      }
      return t && t.length > 0 ? this.setColorName(t) : this;
    }
    setColorName(t) {
      const e = ie[t];
      return (
        void 0 !== e
          ? this.setHex(e)
          : console.warn("THREE.Color: Unknown color " + t),
        this
      );
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
    }
    copyGammaToLinear(t, e = 2) {
      return (
        (this.r = Math.pow(t.r, e)),
        (this.g = Math.pow(t.g, e)),
        (this.b = Math.pow(t.b, e)),
        this
      );
    }
    copyLinearToGamma(t, e = 2) {
      const n = e > 0 ? 1 / e : 1;
      return (
        (this.r = Math.pow(t.r, n)),
        (this.g = Math.pow(t.g, n)),
        (this.b = Math.pow(t.b, n)),
        this
      );
    }
    convertGammaToLinear(t) {
      return this.copyGammaToLinear(this, t), this;
    }
    convertLinearToGamma(t) {
      return this.copyLinearToGamma(this, t), this;
    }
    copySRGBToLinear(t) {
      return (this.r = ae(t.r)), (this.g = ae(t.g)), (this.b = ae(t.b)), this;
    }
    copyLinearToSRGB(t) {
      return (this.r = ce(t.r)), (this.g = ce(t.g)), (this.b = ce(t.b)), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex() {
      return (
        ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
      );
    }
    getHexString() {
      return ("000000" + this.getHex().toString(16)).slice(-6);
    }
    getHSL(t) {
      void 0 === t &&
        (console.warn("THREE.Color: .getHSL() target is now required"),
        (t = { h: 0, s: 0, l: 0 }));
      const e = this.r,
        n = this.g,
        i = this.b,
        r = Math.max(e, n, i),
        o = Math.min(e, n, i);
      let s, a;
      const c = (o + r) / 2;
      if (o === r) (s = 0), (a = 0);
      else {
        const t = r - o;
        switch (((a = c <= 0.5 ? t / (r + o) : t / (2 - r - o)), r)) {
          case e:
            s = (n - i) / t + (n < i ? 6 : 0);
            break;
          case n:
            s = (i - e) / t + 2;
            break;
          case i:
            s = (e - n) / t + 4;
        }
        s /= 6;
      }
      return (t.h = s), (t.s = a), (t.l = c), t;
    }
    getStyle() {
      return (
        "rgb(" +
        ((255 * this.r) | 0) +
        "," +
        ((255 * this.g) | 0) +
        "," +
        ((255 * this.b) | 0) +
        ")"
      );
    }
    offsetHSL(t, e, n) {
      return (
        this.getHSL(re),
        (re.h += t),
        (re.s += e),
        (re.l += n),
        this.setHSL(re.h, re.s, re.l),
        this
      );
    }
    add(t) {
      return (this.r += t.r), (this.g += t.g), (this.b += t.b), this;
    }
    addColors(t, e) {
      return (
        (this.r = t.r + e.r), (this.g = t.g + e.g), (this.b = t.b + e.b), this
      );
    }
    addScalar(t) {
      return (this.r += t), (this.g += t), (this.b += t), this;
    }
    sub(t) {
      return (
        (this.r = Math.max(0, this.r - t.r)),
        (this.g = Math.max(0, this.g - t.g)),
        (this.b = Math.max(0, this.b - t.b)),
        this
      );
    }
    multiply(t) {
      return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this;
    }
    multiplyScalar(t) {
      return (this.r *= t), (this.g *= t), (this.b *= t), this;
    }
    lerp(t, e) {
      return (
        (this.r += (t.r - this.r) * e),
        (this.g += (t.g - this.g) * e),
        (this.b += (t.b - this.b) * e),
        this
      );
    }
    lerpHSL(t, e) {
      this.getHSL(re), t.getHSL(oe);
      const n = R.lerp(re.h, oe.h, e),
        i = R.lerp(re.s, oe.s, e),
        r = R.lerp(re.l, oe.l, e);
      return this.setHSL(n, i, r), this;
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t;
    }
    fromBufferAttribute(t, e) {
      return (
        (this.r = t.getX(e)),
        (this.g = t.getY(e)),
        (this.b = t.getZ(e)),
        !0 === t.normalized &&
          ((this.r /= 255), (this.g /= 255), (this.b /= 255)),
        this
      );
    }
    toJSON() {
      return this.getHex();
    }
  }
  (le.NAMES = ie),
    (le.prototype.r = 1),
    (le.prototype.g = 1),
    (le.prototype.b = 1);
  class he {
    constructor(t, e, n, i, r, o = 0) {
      (this.a = t),
        (this.b = e),
        (this.c = n),
        (this.normal = i && i.isVector3 ? i : new G()),
        (this.vertexNormals = Array.isArray(i) ? i : []),
        (this.color = r && r.isColor ? r : new le()),
        (this.vertexColors = Array.isArray(r) ? r : []),
        (this.materialIndex = o);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      (this.a = t.a),
        (this.b = t.b),
        (this.c = t.c),
        this.normal.copy(t.normal),
        this.color.copy(t.color),
        (this.materialIndex = t.materialIndex);
      for (let e = 0, n = t.vertexNormals.length; e < n; e++)
        this.vertexNormals[e] = t.vertexNormals[e].clone();
      for (let e = 0, n = t.vertexColors.length; e < n; e++)
        this.vertexColors[e] = t.vertexColors[e].clone();
      return this;
    }
  }
  let ue = 0;
  function de() {
    Object.defineProperty(this, "id", { value: ue++ }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "Material"),
      (this.fog = !0),
      (this.blending = 1),
      (this.side = 0),
      (this.flatShading = !1),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.blendSrc = 204),
      (this.blendDst = 205),
      (this.blendEquation = t),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.depthFunc = 3),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = 519),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = M),
      (this.stencilZFail = M),
      (this.stencilZPass = M),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaTest = 0),
      (this.premultipliedAlpha = !1),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0);
  }
  function pe(t) {
    de.call(this),
      (this.type = "MeshBasicMaterial"),
      (this.color = new le(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      this.setValues(t);
  }
  (de.prototype = Object.assign(Object.create(A.prototype), {
    constructor: de,
    isMaterial: !0,
    onBeforeCompile: function () {},
    customProgramCacheKey: function () {
      return this.onBeforeCompile.toString();
    },
    setValues: function (t) {
      if (void 0 !== t)
        for (const e in t) {
          const n = t[e];
          if (void 0 === n) {
            console.warn("THREE.Material: '" + e + "' parameter is undefined.");
            continue;
          }
          if ("shading" === e) {
            console.warn(
              "THREE." +
                this.type +
                ": .shading has been removed. Use the boolean .flatShading instead."
            ),
              (this.flatShading = 1 === n);
            continue;
          }
          const i = this[e];
          void 0 !== i
            ? i && i.isColor
              ? i.set(n)
              : i && i.isVector3 && n && n.isVector3
              ? i.copy(n)
              : (this[e] = n)
            : console.warn(
                "THREE." +
                  this.type +
                  ": '" +
                  e +
                  "' is not a property of this material."
              );
        }
    },
    toJSON: function (t) {
      const e = void 0 === t || "string" == typeof t;
      e && (t = { textures: {}, images: {} });
      const n = {
        metadata: {
          version: 4.5,
          type: "Material",
          generator: "Material.toJSON",
        },
      };
      function i(t) {
        const e = [];
        for (const n in t) {
          const i = t[n];
          delete i.metadata, e.push(i);
        }
        return e;
      }
      if (
        ((n.uuid = this.uuid),
        (n.type = this.type),
        "" !== this.name && (n.name = this.name),
        this.color && this.color.isColor && (n.color = this.color.getHex()),
        void 0 !== this.roughness && (n.roughness = this.roughness),
        void 0 !== this.metalness && (n.metalness = this.metalness),
        this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()),
        this.emissive &&
          this.emissive.isColor &&
          (n.emissive = this.emissive.getHex()),
        this.emissiveIntensity &&
          1 !== this.emissiveIntensity &&
          (n.emissiveIntensity = this.emissiveIntensity),
        this.specular &&
          this.specular.isColor &&
          (n.specular = this.specular.getHex()),
        void 0 !== this.shininess && (n.shininess = this.shininess),
        void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat),
        void 0 !== this.clearcoatRoughness &&
          (n.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap &&
          this.clearcoatMap.isTexture &&
          (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
        this.clearcoatRoughnessMap &&
          this.clearcoatRoughnessMap.isTexture &&
          (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid),
        this.clearcoatNormalMap &&
          this.clearcoatNormalMap.isTexture &&
          ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
          (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
        this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid),
        this.matcap &&
          this.matcap.isTexture &&
          (n.matcap = this.matcap.toJSON(t).uuid),
        this.alphaMap &&
          this.alphaMap.isTexture &&
          (n.alphaMap = this.alphaMap.toJSON(t).uuid),
        this.lightMap &&
          this.lightMap.isTexture &&
          (n.lightMap = this.lightMap.toJSON(t).uuid),
        this.aoMap &&
          this.aoMap.isTexture &&
          ((n.aoMap = this.aoMap.toJSON(t).uuid),
          (n.aoMapIntensity = this.aoMapIntensity)),
        this.bumpMap &&
          this.bumpMap.isTexture &&
          ((n.bumpMap = this.bumpMap.toJSON(t).uuid),
          (n.bumpScale = this.bumpScale)),
        this.normalMap &&
          this.normalMap.isTexture &&
          ((n.normalMap = this.normalMap.toJSON(t).uuid),
          (n.normalMapType = this.normalMapType),
          (n.normalScale = this.normalScale.toArray())),
        this.displacementMap &&
          this.displacementMap.isTexture &&
          ((n.displacementMap = this.displacementMap.toJSON(t).uuid),
          (n.displacementScale = this.displacementScale),
          (n.displacementBias = this.displacementBias)),
        this.roughnessMap &&
          this.roughnessMap.isTexture &&
          (n.roughnessMap = this.roughnessMap.toJSON(t).uuid),
        this.metalnessMap &&
          this.metalnessMap.isTexture &&
          (n.metalnessMap = this.metalnessMap.toJSON(t).uuid),
        this.emissiveMap &&
          this.emissiveMap.isTexture &&
          (n.emissiveMap = this.emissiveMap.toJSON(t).uuid),
        this.specularMap &&
          this.specularMap.isTexture &&
          (n.specularMap = this.specularMap.toJSON(t).uuid),
        this.envMap &&
          this.envMap.isTexture &&
          ((n.envMap = this.envMap.toJSON(t).uuid),
          (n.reflectivity = this.reflectivity),
          (n.refractionRatio = this.refractionRatio),
          void 0 !== this.combine && (n.combine = this.combine),
          void 0 !== this.envMapIntensity &&
            (n.envMapIntensity = this.envMapIntensity)),
        this.gradientMap &&
          this.gradientMap.isTexture &&
          (n.gradientMap = this.gradientMap.toJSON(t).uuid),
        void 0 !== this.size && (n.size = this.size),
        void 0 !== this.sizeAttenuation &&
          (n.sizeAttenuation = this.sizeAttenuation),
        1 !== this.blending && (n.blending = this.blending),
        !0 === this.flatShading && (n.flatShading = this.flatShading),
        0 !== this.side && (n.side = this.side),
        this.vertexColors && (n.vertexColors = !0),
        this.opacity < 1 && (n.opacity = this.opacity),
        !0 === this.transparent && (n.transparent = this.transparent),
        (n.depthFunc = this.depthFunc),
        (n.depthTest = this.depthTest),
        (n.depthWrite = this.depthWrite),
        (n.stencilWrite = this.stencilWrite),
        (n.stencilWriteMask = this.stencilWriteMask),
        (n.stencilFunc = this.stencilFunc),
        (n.stencilRef = this.stencilRef),
        (n.stencilFuncMask = this.stencilFuncMask),
        (n.stencilFail = this.stencilFail),
        (n.stencilZFail = this.stencilZFail),
        (n.stencilZPass = this.stencilZPass),
        this.rotation && 0 !== this.rotation && (n.rotation = this.rotation),
        !0 === this.polygonOffset && (n.polygonOffset = !0),
        0 !== this.polygonOffsetFactor &&
          (n.polygonOffsetFactor = this.polygonOffsetFactor),
        0 !== this.polygonOffsetUnits &&
          (n.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth &&
          1 !== this.linewidth &&
          (n.linewidth = this.linewidth),
        void 0 !== this.dashSize && (n.dashSize = this.dashSize),
        void 0 !== this.gapSize && (n.gapSize = this.gapSize),
        void 0 !== this.scale && (n.scale = this.scale),
        !0 === this.dithering && (n.dithering = !0),
        this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
        !0 === this.premultipliedAlpha &&
          (n.premultipliedAlpha = this.premultipliedAlpha),
        !0 === this.wireframe && (n.wireframe = this.wireframe),
        this.wireframeLinewidth > 1 &&
          (n.wireframeLinewidth = this.wireframeLinewidth),
        "round" !== this.wireframeLinecap &&
          (n.wireframeLinecap = this.wireframeLinecap),
        "round" !== this.wireframeLinejoin &&
          (n.wireframeLinejoin = this.wireframeLinejoin),
        !0 === this.morphTargets && (n.morphTargets = !0),
        !0 === this.morphNormals && (n.morphNormals = !0),
        !0 === this.skinning && (n.skinning = !0),
        !1 === this.visible && (n.visible = !1),
        !1 === this.toneMapped && (n.toneMapped = !1),
        "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData),
        e)
      ) {
        const e = i(t.textures),
          r = i(t.images);
        e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r);
      }
      return n;
    },
    clone: function () {
      return new this.constructor().copy(this);
    },
    copy: function (t) {
      (this.name = t.name),
        (this.fog = t.fog),
        (this.blending = t.blending),
        (this.side = t.side),
        (this.flatShading = t.flatShading),
        (this.vertexColors = t.vertexColors),
        (this.opacity = t.opacity),
        (this.transparent = t.transparent),
        (this.blendSrc = t.blendSrc),
        (this.blendDst = t.blendDst),
        (this.blendEquation = t.blendEquation),
        (this.blendSrcAlpha = t.blendSrcAlpha),
        (this.blendDstAlpha = t.blendDstAlpha),
        (this.blendEquationAlpha = t.blendEquationAlpha),
        (this.depthFunc = t.depthFunc),
        (this.depthTest = t.depthTest),
        (this.depthWrite = t.depthWrite),
        (this.stencilWriteMask = t.stencilWriteMask),
        (this.stencilFunc = t.stencilFunc),
        (this.stencilRef = t.stencilRef),
        (this.stencilFuncMask = t.stencilFuncMask),
        (this.stencilFail = t.stencilFail),
        (this.stencilZFail = t.stencilZFail),
        (this.stencilZPass = t.stencilZPass),
        (this.stencilWrite = t.stencilWrite);
      const e = t.clippingPlanes;
      let n = null;
      if (null !== e) {
        const t = e.length;
        n = new Array(t);
        for (let i = 0; i !== t; ++i) n[i] = e[i].clone();
      }
      return (
        (this.clippingPlanes = n),
        (this.clipIntersection = t.clipIntersection),
        (this.clipShadows = t.clipShadows),
        (this.shadowSide = t.shadowSide),
        (this.colorWrite = t.colorWrite),
        (this.precision = t.precision),
        (this.polygonOffset = t.polygonOffset),
        (this.polygonOffsetFactor = t.polygonOffsetFactor),
        (this.polygonOffsetUnits = t.polygonOffsetUnits),
        (this.dithering = t.dithering),
        (this.alphaTest = t.alphaTest),
        (this.premultipliedAlpha = t.premultipliedAlpha),
        (this.visible = t.visible),
        (this.toneMapped = t.toneMapped),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  })),
    Object.defineProperty(de.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    }),
    (pe.prototype = Object.create(de.prototype)),
    (pe.prototype.constructor = pe),
    (pe.prototype.isMeshBasicMaterial = !0),
    (pe.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        this
      );
    });
  const fe = new G(),
    me = new P();
  function ge(t, e, n) {
    if (Array.isArray(t))
      throw new TypeError(
        "THREE.BufferAttribute: array should be a Typed Array."
      );
    (this.name = ""),
      (this.array = t),
      (this.itemSize = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.normalized = !0 === n),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0);
  }
  function ve(t, e, n) {
    ge.call(this, new Int8Array(t), e, n);
  }
  function ye(t, e, n) {
    ge.call(this, new Uint8Array(t), e, n);
  }
  function _e(t, e, n) {
    ge.call(this, new Uint8ClampedArray(t), e, n);
  }
  function xe(t, e, n) {
    ge.call(this, new Int16Array(t), e, n);
  }
  function be(t, e, n) {
    ge.call(this, new Uint16Array(t), e, n);
  }
  function we(t, e, n) {
    ge.call(this, new Int32Array(t), e, n);
  }
  function Me(t, e, n) {
    ge.call(this, new Uint32Array(t), e, n);
  }
  function Se(t, e, n) {
    ge.call(this, new Uint16Array(t), e, n);
  }
  function Ee(t, e, n) {
    ge.call(this, new Float32Array(t), e, n);
  }
  function Te(t, e, n) {
    ge.call(this, new Float64Array(t), e, n);
  }
  Object.defineProperty(ge.prototype, "needsUpdate", {
    set: function (t) {
      !0 === t && this.version++;
    },
  }),
    Object.assign(ge.prototype, {
      isBufferAttribute: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this;
      },
      copy: function (t) {
        return (
          (this.name = t.name),
          (this.array = new t.array.constructor(t.array)),
          (this.itemSize = t.itemSize),
          (this.count = t.count),
          (this.normalized = t.normalized),
          (this.usage = t.usage),
          this
        );
      },
      copyAt: function (t, e, n) {
        (t *= this.itemSize), (n *= e.itemSize);
        for (let i = 0, r = this.itemSize; i < r; i++)
          this.array[t + i] = e.array[n + i];
        return this;
      },
      copyArray: function (t) {
        return this.array.set(t), this;
      },
      copyColorsArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyColorsArray(): color is undefined",
              i
            ),
            (r = new le())),
            (e[n++] = r.r),
            (e[n++] = r.g),
            (e[n++] = r.b);
        }
        return this;
      },
      copyVector2sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector2sArray(): vector is undefined",
              i
            ),
            (r = new P())),
            (e[n++] = r.x),
            (e[n++] = r.y);
        }
        return this;
      },
      copyVector3sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector3sArray(): vector is undefined",
              i
            ),
            (r = new G())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z);
        }
        return this;
      },
      copyVector4sArray: function (t) {
        const e = this.array;
        let n = 0;
        for (let i = 0, r = t.length; i < r; i++) {
          let r = t[i];
          void 0 === r &&
            (console.warn(
              "THREE.BufferAttribute.copyVector4sArray(): vector is undefined",
              i
            ),
            (r = new U())),
            (e[n++] = r.x),
            (e[n++] = r.y),
            (e[n++] = r.z),
            (e[n++] = r.w);
        }
        return this;
      },
      applyMatrix3: function (t) {
        if (2 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            me.fromBufferAttribute(this, e),
              me.applyMatrix3(t),
              this.setXY(e, me.x, me.y);
        else if (3 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++)
            fe.fromBufferAttribute(this, e),
              fe.applyMatrix3(t),
              this.setXYZ(e, fe.x, fe.y, fe.z);
        return this;
      },
      applyMatrix4: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (fe.x = this.getX(e)),
            (fe.y = this.getY(e)),
            (fe.z = this.getZ(e)),
            fe.applyMatrix4(t),
            this.setXYZ(e, fe.x, fe.y, fe.z);
        return this;
      },
      applyNormalMatrix: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (fe.x = this.getX(e)),
            (fe.y = this.getY(e)),
            (fe.z = this.getZ(e)),
            fe.applyNormalMatrix(t),
            this.setXYZ(e, fe.x, fe.y, fe.z);
        return this;
      },
      transformDirection: function (t) {
        for (let e = 0, n = this.count; e < n; e++)
          (fe.x = this.getX(e)),
            (fe.y = this.getY(e)),
            (fe.z = this.getZ(e)),
            fe.transformDirection(t),
            this.setXYZ(e, fe.x, fe.y, fe.z);
        return this;
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this;
      },
      getX: function (t) {
        return this.array[t * this.itemSize];
      },
      setX: function (t, e) {
        return (this.array[t * this.itemSize] = e), this;
      },
      getY: function (t) {
        return this.array[t * this.itemSize + 1];
      },
      setY: function (t, e) {
        return (this.array[t * this.itemSize + 1] = e), this;
      },
      getZ: function (t) {
        return this.array[t * this.itemSize + 2];
      },
      setZ: function (t, e) {
        return (this.array[t * this.itemSize + 2] = e), this;
      },
      getW: function (t) {
        return this.array[t * this.itemSize + 3];
      },
      setW: function (t, e) {
        return (this.array[t * this.itemSize + 3] = e), this;
      },
      setXY: function (t, e, n) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          this
        );
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          this
        );
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t *= this.itemSize),
          (this.array[t + 0] = e),
          (this.array[t + 1] = n),
          (this.array[t + 2] = i),
          (this.array[t + 3] = r),
          this
        );
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this;
      },
      clone: function () {
        return new this.constructor(this.array, this.itemSize).copy(this);
      },
      toJSON: function () {
        return {
          itemSize: this.itemSize,
          type: this.array.constructor.name,
          array: Array.prototype.slice.call(this.array),
          normalized: this.normalized,
        };
      },
    }),
    (ve.prototype = Object.create(ge.prototype)),
    (ve.prototype.constructor = ve),
    (ye.prototype = Object.create(ge.prototype)),
    (ye.prototype.constructor = ye),
    (_e.prototype = Object.create(ge.prototype)),
    (_e.prototype.constructor = _e),
    (xe.prototype = Object.create(ge.prototype)),
    (xe.prototype.constructor = xe),
    (be.prototype = Object.create(ge.prototype)),
    (be.prototype.constructor = be),
    (we.prototype = Object.create(ge.prototype)),
    (we.prototype.constructor = we),
    (Me.prototype = Object.create(ge.prototype)),
    (Me.prototype.constructor = Me),
    (Se.prototype = Object.create(ge.prototype)),
    (Se.prototype.constructor = Se),
    (Se.prototype.isFloat16BufferAttribute = !0),
    (Ee.prototype = Object.create(ge.prototype)),
    (Ee.prototype.constructor = Ee),
    (Te.prototype = Object.create(ge.prototype)),
    (Te.prototype.constructor = Te);
  class Ae {
    constructor() {
      (this.vertices = []),
        (this.normals = []),
        (this.colors = []),
        (this.uvs = []),
        (this.uvs2 = []),
        (this.groups = []),
        (this.morphTargets = {}),
        (this.skinWeights = []),
        (this.skinIndices = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.verticesNeedUpdate = !1),
        (this.normalsNeedUpdate = !1),
        (this.colorsNeedUpdate = !1),
        (this.uvsNeedUpdate = !1),
        (this.groupsNeedUpdate = !1);
    }
    computeGroups(t) {
      const e = [];
      let n, i, r;
      const o = t.faces;
      for (i = 0; i < o.length; i++) {
        const t = o[i];
        t.materialIndex !== r &&
          ((r = t.materialIndex),
          void 0 !== n && ((n.count = 3 * i - n.start), e.push(n)),
          (n = { start: 3 * i, materialIndex: r }));
      }
      void 0 !== n && ((n.count = 3 * i - n.start), e.push(n)),
        (this.groups = e);
    }
    fromGeometry(t) {
      const e = t.faces,
        n = t.vertices,
        i = t.faceVertexUvs,
        r = i[0] && i[0].length > 0,
        o = i[1] && i[1].length > 0,
        s = t.morphTargets,
        a = s.length;
      let c;
      if (a > 0) {
        c = [];
        for (let t = 0; t < a; t++) c[t] = { name: s[t].name, data: [] };
        this.morphTargets.position = c;
      }
      const l = t.morphNormals,
        h = l.length;
      let u;
      if (h > 0) {
        u = [];
        for (let t = 0; t < h; t++) u[t] = { name: l[t].name, data: [] };
        this.morphTargets.normal = u;
      }
      const d = t.skinIndices,
        p = t.skinWeights,
        f = d.length === n.length,
        m = p.length === n.length;
      n.length > 0 &&
        0 === e.length &&
        console.error(
          "THREE.DirectGeometry: Faceless geometries are not supported."
        );
      for (let t = 0; t < e.length; t++) {
        const g = e[t];
        this.vertices.push(n[g.a], n[g.b], n[g.c]);
        const v = g.vertexNormals;
        if (3 === v.length) this.normals.push(v[0], v[1], v[2]);
        else {
          const t = g.normal;
          this.normals.push(t, t, t);
        }
        const y = g.vertexColors;
        if (3 === y.length) this.colors.push(y[0], y[1], y[2]);
        else {
          const t = g.color;
          this.colors.push(t, t, t);
        }
        if (!0 === r) {
          const e = i[0][t];
          void 0 !== e
            ? this.uvs.push(e[0], e[1], e[2])
            : (console.warn(
                "THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",
                t
              ),
              this.uvs.push(new P(), new P(), new P()));
        }
        if (!0 === o) {
          const e = i[1][t];
          void 0 !== e
            ? this.uvs2.push(e[0], e[1], e[2])
            : (console.warn(
                "THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",
                t
              ),
              this.uvs2.push(new P(), new P(), new P()));
        }
        for (let t = 0; t < a; t++) {
          const e = s[t].vertices;
          c[t].data.push(e[g.a], e[g.b], e[g.c]);
        }
        for (let e = 0; e < h; e++) {
          const n = l[e].vertexNormals[t];
          u[e].data.push(n.a, n.b, n.c);
        }
        f && this.skinIndices.push(d[g.a], d[g.b], d[g.c]),
          m && this.skinWeights.push(p[g.a], p[g.b], p[g.c]);
      }
      return (
        this.computeGroups(t),
        (this.verticesNeedUpdate = t.verticesNeedUpdate),
        (this.normalsNeedUpdate = t.normalsNeedUpdate),
        (this.colorsNeedUpdate = t.colorsNeedUpdate),
        (this.uvsNeedUpdate = t.uvsNeedUpdate),
        (this.groupsNeedUpdate = t.groupsNeedUpdate),
        null !== t.boundingSphere &&
          (this.boundingSphere = t.boundingSphere.clone()),
        null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()),
        this
      );
    }
  }
  function Le(t) {
    if (0 === t.length) return -1 / 0;
    let e = t[0];
    for (let n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n]);
    return e;
  }
  const Ce = {
    Int8Array,
    Uint8Array,
    Uint8ClampedArray:
      "undefined" != typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  };
  function Re(t, e) {
    return new Ce[t](e);
  }
  let Pe = 1;
  const Oe = new gt(),
    Ne = new kt(),
    Ie = new G(),
    De = new W(),
    ze = new W(),
    Be = new G();
  function Ue() {
    Object.defineProperty(this, "id", { value: (Pe += 2) }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {});
  }
  Ue.prototype = Object.assign(Object.create(A.prototype), {
    constructor: Ue,
    isBufferGeometry: !0,
    getIndex: function () {
      return this.index;
    },
    setIndex: function (t) {
      return (
        Array.isArray(t)
          ? (this.index = new (Le(t) > 65535 ? Me : be)(t, 1))
          : (this.index = t),
        this
      );
    },
    getAttribute: function (t) {
      return this.attributes[t];
    },
    setAttribute: function (t, e) {
      return (this.attributes[t] = e), this;
    },
    deleteAttribute: function (t) {
      return delete this.attributes[t], this;
    },
    hasAttribute: function (t) {
      return void 0 !== this.attributes[t];
    },
    addGroup: function (t, e, n = 0) {
      this.groups.push({ start: t, count: e, materialIndex: n });
    },
    clearGroups: function () {
      this.groups = [];
    },
    setDrawRange: function (t, e) {
      (this.drawRange.start = t), (this.drawRange.count = e);
    },
    applyMatrix4: function (t) {
      const e = this.attributes.position;
      void 0 !== e && (e.applyMatrix4(t), (e.needsUpdate = !0));
      const n = this.attributes.normal;
      if (void 0 !== n) {
        const e = new O().getNormalMatrix(t);
        n.applyNormalMatrix(e), (n.needsUpdate = !0);
      }
      const i = this.attributes.tangent;
      return (
        void 0 !== i && (i.transformDirection(t), (i.needsUpdate = !0)),
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this
      );
    },
    rotateX: function (t) {
      return Oe.makeRotationX(t), this.applyMatrix4(Oe), this;
    },
    rotateY: function (t) {
      return Oe.makeRotationY(t), this.applyMatrix4(Oe), this;
    },
    rotateZ: function (t) {
      return Oe.makeRotationZ(t), this.applyMatrix4(Oe), this;
    },
    translate: function (t, e, n) {
      return Oe.makeTranslation(t, e, n), this.applyMatrix4(Oe), this;
    },
    scale: function (t, e, n) {
      return Oe.makeScale(t, e, n), this.applyMatrix4(Oe), this;
    },
    lookAt: function (t) {
      return (
        Ne.lookAt(t), Ne.updateMatrix(), this.applyMatrix4(Ne.matrix), this
      );
    },
    center: function () {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(Ie).negate(),
        this.translate(Ie.x, Ie.y, Ie.z),
        this
      );
    },
    setFromObject: function (t) {
      const e = t.geometry;
      if (t.isPoints || t.isLine) {
        const t = new Ee(3 * e.vertices.length, 3),
          n = new Ee(3 * e.colors.length, 3);
        if (
          (this.setAttribute("position", t.copyVector3sArray(e.vertices)),
          this.setAttribute("color", n.copyColorsArray(e.colors)),
          e.lineDistances && e.lineDistances.length === e.vertices.length)
        ) {
          const t = new Ee(e.lineDistances.length, 1);
          this.setAttribute("lineDistance", t.copyArray(e.lineDistances));
        }
        null !== e.boundingSphere &&
          (this.boundingSphere = e.boundingSphere.clone()),
          null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone());
      } else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
      return this;
    },
    setFromPoints: function (t) {
      const e = [];
      for (let n = 0, i = t.length; n < i; n++) {
        const i = t[n];
        e.push(i.x, i.y, i.z || 0);
      }
      return this.setAttribute("position", new Ee(e, 3)), this;
    },
    updateFromObject: function (t) {
      let e = t.geometry;
      if (t.isMesh) {
        let t = e.__directGeometry;
        if (
          (!0 === e.elementsNeedUpdate &&
            ((t = void 0), (e.elementsNeedUpdate = !1)),
          void 0 === t)
        )
          return this.fromGeometry(e);
        (t.verticesNeedUpdate = e.verticesNeedUpdate),
          (t.normalsNeedUpdate = e.normalsNeedUpdate),
          (t.colorsNeedUpdate = e.colorsNeedUpdate),
          (t.uvsNeedUpdate = e.uvsNeedUpdate),
          (t.groupsNeedUpdate = e.groupsNeedUpdate),
          (e.verticesNeedUpdate = !1),
          (e.normalsNeedUpdate = !1),
          (e.colorsNeedUpdate = !1),
          (e.uvsNeedUpdate = !1),
          (e.groupsNeedUpdate = !1),
          (e = t);
      }
      if (!0 === e.verticesNeedUpdate) {
        const t = this.attributes.position;
        void 0 !== t && (t.copyVector3sArray(e.vertices), (t.needsUpdate = !0)),
          (e.verticesNeedUpdate = !1);
      }
      if (!0 === e.normalsNeedUpdate) {
        const t = this.attributes.normal;
        void 0 !== t && (t.copyVector3sArray(e.normals), (t.needsUpdate = !0)),
          (e.normalsNeedUpdate = !1);
      }
      if (!0 === e.colorsNeedUpdate) {
        const t = this.attributes.color;
        void 0 !== t && (t.copyColorsArray(e.colors), (t.needsUpdate = !0)),
          (e.colorsNeedUpdate = !1);
      }
      if (e.uvsNeedUpdate) {
        const t = this.attributes.uv;
        void 0 !== t && (t.copyVector2sArray(e.uvs), (t.needsUpdate = !0)),
          (e.uvsNeedUpdate = !1);
      }
      if (e.lineDistancesNeedUpdate) {
        const t = this.attributes.lineDistance;
        void 0 !== t && (t.copyArray(e.lineDistances), (t.needsUpdate = !0)),
          (e.lineDistancesNeedUpdate = !1);
      }
      return (
        e.groupsNeedUpdate &&
          (e.computeGroups(t.geometry),
          (this.groups = e.groups),
          (e.groupsNeedUpdate = !1)),
        this
      );
    },
    fromGeometry: function (t) {
      return (
        (t.__directGeometry = new Ae().fromGeometry(t)),
        this.fromDirectGeometry(t.__directGeometry)
      );
    },
    fromDirectGeometry: function (t) {
      const e = new Float32Array(3 * t.vertices.length);
      if (
        (this.setAttribute(
          "position",
          new ge(e, 3).copyVector3sArray(t.vertices)
        ),
        t.normals.length > 0)
      ) {
        const e = new Float32Array(3 * t.normals.length);
        this.setAttribute("normal", new ge(e, 3).copyVector3sArray(t.normals));
      }
      if (t.colors.length > 0) {
        const e = new Float32Array(3 * t.colors.length);
        this.setAttribute("color", new ge(e, 3).copyColorsArray(t.colors));
      }
      if (t.uvs.length > 0) {
        const e = new Float32Array(2 * t.uvs.length);
        this.setAttribute("uv", new ge(e, 2).copyVector2sArray(t.uvs));
      }
      if (t.uvs2.length > 0) {
        const e = new Float32Array(2 * t.uvs2.length);
        this.setAttribute("uv2", new ge(e, 2).copyVector2sArray(t.uvs2));
      }
      this.groups = t.groups;
      for (const e in t.morphTargets) {
        const n = [],
          i = t.morphTargets[e];
        for (let t = 0, e = i.length; t < e; t++) {
          const e = i[t],
            r = new Ee(3 * e.data.length, 3);
          (r.name = e.name), n.push(r.copyVector3sArray(e.data));
        }
        this.morphAttributes[e] = n;
      }
      if (t.skinIndices.length > 0) {
        const e = new Ee(4 * t.skinIndices.length, 4);
        this.setAttribute("skinIndex", e.copyVector4sArray(t.skinIndices));
      }
      if (t.skinWeights.length > 0) {
        const e = new Ee(4 * t.skinWeights.length, 4);
        this.setAttribute("skinWeight", e.copyVector4sArray(t.skinWeights));
      }
      return (
        null !== t.boundingSphere &&
          (this.boundingSphere = t.boundingSphere.clone()),
        null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()),
        this
      );
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new W());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingBox.set(
            new G(-1 / 0, -1 / 0, -1 / 0),
            new G(1 / 0, 1 / 0, 1 / 0)
          )
        );
      if (void 0 !== t) {
        if ((this.boundingBox.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            De.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (Be.addVectors(this.boundingBox.min, De.min),
                  this.boundingBox.expandByPoint(Be),
                  Be.addVectors(this.boundingBox.max, De.max),
                  this.boundingBox.expandByPoint(Be))
                : (this.boundingBox.expandByPoint(De.min),
                  this.boundingBox.expandByPoint(De.max));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this
        );
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new at());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute)
        return (
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',
            this
          ),
          void this.boundingSphere.set(new G(), 1 / 0)
        );
      if (t) {
        const n = this.boundingSphere.center;
        if ((De.setFromBufferAttribute(t), e))
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            ze.setFromBufferAttribute(n),
              this.morphTargetsRelative
                ? (Be.addVectors(De.min, ze.min),
                  De.expandByPoint(Be),
                  Be.addVectors(De.max, ze.max),
                  De.expandByPoint(Be))
                : (De.expandByPoint(ze.min), De.expandByPoint(ze.max));
          }
        De.getCenter(n);
        let i = 0;
        for (let e = 0, r = t.count; e < r; e++)
          Be.fromBufferAttribute(t, e),
            (i = Math.max(i, n.distanceToSquared(Be)));
        if (e)
          for (let r = 0, o = e.length; r < o; r++) {
            const o = e[r],
              s = this.morphTargetsRelative;
            for (let e = 0, r = o.count; e < r; e++)
              Be.fromBufferAttribute(o, e),
                s && (Ie.fromBufferAttribute(t, e), Be.add(Ie)),
                (i = Math.max(i, n.distanceToSquared(Be)));
          }
        (this.boundingSphere.radius = Math.sqrt(i)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this
            );
      }
    },
    computeFaceNormals: function () {},
    computeVertexNormals: function () {
      const t = this.index,
        e = this.getAttribute("position");
      if (void 0 !== e) {
        let n = this.getAttribute("normal");
        if (void 0 === n)
          (n = new ge(new Float32Array(3 * e.count), 3)),
            this.setAttribute("normal", n);
        else for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0);
        const i = new G(),
          r = new G(),
          o = new G(),
          s = new G(),
          a = new G(),
          c = new G(),
          l = new G(),
          h = new G();
        if (t)
          for (let u = 0, d = t.count; u < d; u += 3) {
            const d = t.getX(u + 0),
              p = t.getX(u + 1),
              f = t.getX(u + 2);
            i.fromBufferAttribute(e, d),
              r.fromBufferAttribute(e, p),
              o.fromBufferAttribute(e, f),
              l.subVectors(o, r),
              h.subVectors(i, r),
              l.cross(h),
              s.fromBufferAttribute(n, d),
              a.fromBufferAttribute(n, p),
              c.fromBufferAttribute(n, f),
              s.add(l),
              a.add(l),
              c.add(l),
              n.setXYZ(d, s.x, s.y, s.z),
              n.setXYZ(p, a.x, a.y, a.z),
              n.setXYZ(f, c.x, c.y, c.z);
          }
        else
          for (let t = 0, s = e.count; t < s; t += 3)
            i.fromBufferAttribute(e, t + 0),
              r.fromBufferAttribute(e, t + 1),
              o.fromBufferAttribute(e, t + 2),
              l.subVectors(o, r),
              h.subVectors(i, r),
              l.cross(h),
              n.setXYZ(t + 0, l.x, l.y, l.z),
              n.setXYZ(t + 1, l.x, l.y, l.z),
              n.setXYZ(t + 2, l.x, l.y, l.z);
        this.normalizeNormals(), (n.needsUpdate = !0);
      }
    },
    merge: function (t, e) {
      if (!t || !t.isBufferGeometry)
        return void console.error(
          "THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",
          t
        );
      void 0 === e &&
        ((e = 0),
        console.warn(
          "THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."
        ));
      const n = this.attributes;
      for (const i in n) {
        if (void 0 === t.attributes[i]) continue;
        const r = n[i].array,
          o = t.attributes[i],
          s = o.array,
          a = o.itemSize * e,
          c = Math.min(s.length, r.length - a);
        for (let t = 0, e = a; t < c; t++, e++) r[e] = s[t];
      }
      return this;
    },
    normalizeNormals: function () {
      const t = this.attributes.normal;
      for (let e = 0, n = t.count; e < n; e++)
        Be.fromBufferAttribute(t, e),
          Be.normalize(),
          t.setXYZ(e, Be.x, Be.y, Be.z);
    },
    toNonIndexed: function () {
      function t(t, e) {
        const n = t.array,
          i = t.itemSize,
          r = t.normalized,
          o = new n.constructor(e.length * i);
        let s = 0,
          a = 0;
        for (let t = 0, r = e.length; t < r; t++) {
          s = e[t] * i;
          for (let t = 0; t < i; t++) o[a++] = n[s++];
        }
        return new ge(o, i, r);
      }
      if (null === this.index)
        return (
          console.warn(
            "THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."
          ),
          this
        );
      const e = new Ue(),
        n = this.index.array,
        i = this.attributes;
      for (const r in i) {
        const o = t(i[r], n);
        e.setAttribute(r, o);
      }
      const r = this.morphAttributes;
      for (const i in r) {
        const o = [],
          s = r[i];
        for (let e = 0, i = s.length; e < i; e++) {
          const i = t(s[e], n);
          o.push(i);
        }
        e.morphAttributes[i] = o;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      const o = this.groups;
      for (let t = 0, n = o.length; t < n; t++) {
        const n = o[t];
        e.addGroup(n.start, n.count, n.materialIndex);
      }
      return e;
    },
    toJSON: function () {
      const t = {
        metadata: {
          version: 4.5,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON",
        },
      };
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        "" !== this.name && (t.name = this.name),
        Object.keys(this.userData).length > 0 && (t.userData = this.userData),
        void 0 !== this.parameters)
      ) {
        const e = this.parameters;
        for (const n in e) void 0 !== e[n] && (t[n] = e[n]);
        return t;
      }
      t.data = { attributes: {} };
      const e = this.index;
      null !== e &&
        (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array),
        });
      const n = this.attributes;
      for (const e in n) {
        const i = n[e],
          r = i.toJSON(t.data);
        "" !== i.name && (r.name = i.name), (t.data.attributes[e] = r);
      }
      const i = {};
      let r = !1;
      for (const e in this.morphAttributes) {
        const n = this.morphAttributes[e],
          o = [];
        for (let e = 0, i = n.length; e < i; e++) {
          const i = n[e],
            r = i.toJSON(t.data);
          "" !== i.name && (r.name = i.name), o.push(r);
        }
        o.length > 0 && ((i[e] = o), (r = !0));
      }
      r &&
        ((t.data.morphAttributes = i),
        (t.data.morphTargetsRelative = this.morphTargetsRelative));
      const o = this.groups;
      o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
      const s = this.boundingSphere;
      return (
        null !== s &&
          (t.data.boundingSphere = {
            center: s.center.toArray(),
            radius: s.radius,
          }),
        t
      );
    },
    clone: function () {
      return new Ue().copy(this);
    },
    copy: function (t) {
      (this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null);
      const e = {};
      this.name = t.name;
      const n = t.index;
      null !== n && this.setIndex(n.clone(e));
      const i = t.attributes;
      for (const t in i) {
        const n = i[t];
        this.setAttribute(t, n.clone(e));
      }
      const r = t.morphAttributes;
      for (const t in r) {
        const n = [],
          i = r[t];
        for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e));
        this.morphAttributes[t] = n;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      const o = t.groups;
      for (let t = 0, e = o.length; t < e; t++) {
        const e = o[t];
        this.addGroup(e.start, e.count, e.materialIndex);
      }
      const s = t.boundingBox;
      null !== s && (this.boundingBox = s.clone());
      const a = t.boundingSphere;
      return (
        null !== a && (this.boundingSphere = a.clone()),
        (this.drawRange.start = t.drawRange.start),
        (this.drawRange.count = t.drawRange.count),
        (this.userData = t.userData),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  });
  const He = new gt(),
    Fe = new mt(),
    ke = new at(),
    Ge = new G(),
    Ve = new G(),
    je = new G(),
    We = new G(),
    qe = new G(),
    Xe = new G(),
    Ye = new G(),
    Ze = new G(),
    Je = new G(),
    Qe = new P(),
    Ke = new P(),
    $e = new P(),
    tn = new G(),
    en = new G();
  function nn(t = new Ue(), e = new pe()) {
    kt.call(this),
      (this.type = "Mesh"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  function rn(t, e, n, i, r, o, s, a) {
    let c;
    if (
      ((c =
        1 === e.side
          ? i.intersectTriangle(s, o, r, !0, a)
          : i.intersectTriangle(r, o, s, 2 !== e.side, a)),
      null === c)
    )
      return null;
    en.copy(a), en.applyMatrix4(t.matrixWorld);
    const l = n.ray.origin.distanceTo(en);
    return l < n.near || l > n.far
      ? null
      : { distance: l, point: en.clone(), object: t };
  }
  function on(t, e, n, i, r, o, s, a, c, l, h, u) {
    Ge.fromBufferAttribute(r, l),
      Ve.fromBufferAttribute(r, h),
      je.fromBufferAttribute(r, u);
    const d = t.morphTargetInfluences;
    if (e.morphTargets && o && d) {
      Ye.set(0, 0, 0), Ze.set(0, 0, 0), Je.set(0, 0, 0);
      for (let t = 0, e = o.length; t < e; t++) {
        const e = d[t],
          n = o[t];
        0 !== e &&
          (We.fromBufferAttribute(n, l),
          qe.fromBufferAttribute(n, h),
          Xe.fromBufferAttribute(n, u),
          s
            ? (Ye.addScaledVector(We, e),
              Ze.addScaledVector(qe, e),
              Je.addScaledVector(Xe, e))
            : (Ye.addScaledVector(We.sub(Ge), e),
              Ze.addScaledVector(qe.sub(Ve), e),
              Je.addScaledVector(Xe.sub(je), e)));
      }
      Ge.add(Ye), Ve.add(Ze), je.add(Je);
    }
    t.isSkinnedMesh &&
      (t.boneTransform(l, Ge), t.boneTransform(h, Ve), t.boneTransform(u, je));
    const p = rn(t, e, n, i, Ge, Ve, je, tn);
    if (p) {
      a &&
        (Qe.fromBufferAttribute(a, l),
        Ke.fromBufferAttribute(a, h),
        $e.fromBufferAttribute(a, u),
        (p.uv = ne.getUV(tn, Ge, Ve, je, Qe, Ke, $e, new P()))),
        c &&
          (Qe.fromBufferAttribute(c, l),
          Ke.fromBufferAttribute(c, h),
          $e.fromBufferAttribute(c, u),
          (p.uv2 = ne.getUV(tn, Ge, Ve, je, Qe, Ke, $e, new P())));
      const t = new he(l, h, u);
      ne.getNormal(Ge, Ve, je, t.normal), (p.face = t);
    }
    return p;
  }
  nn.prototype = Object.assign(Object.create(kt.prototype), {
    constructor: nn,
    isMesh: !0,
    copy: function (t) {
      return (
        kt.prototype.copy.call(this, t),
        void 0 !== t.morphTargetInfluences &&
          (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
        void 0 !== t.morphTargetDictionary &&
          (this.morphTargetDictionary = Object.assign(
            {},
            t.morphTargetDictionary
          )),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.material,
        r = this.matrixWorld;
      if (void 0 === i) return;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        ke.copy(n.boundingSphere),
        ke.applyMatrix4(r),
        !1 === t.ray.intersectsSphere(ke))
      )
        return;
      if (
        (He.copy(r).invert(),
        Fe.copy(t.ray).applyMatrix4(He),
        null !== n.boundingBox && !1 === Fe.intersectsBox(n.boundingBox))
      )
        return;
      let o;
      if (n.isBufferGeometry) {
        const r = n.index,
          s = n.attributes.position,
          a = n.morphAttributes.position,
          c = n.morphTargetsRelative,
          l = n.attributes.uv,
          h = n.attributes.uv2,
          u = n.groups,
          d = n.drawRange;
        if (null !== r)
          if (Array.isArray(i))
            for (let n = 0, p = u.length; n < p; n++) {
              const p = u[n],
                f = i[p.materialIndex];
              for (
                let n = Math.max(p.start, d.start),
                  i = Math.min(p.start + p.count, d.start + d.count);
                n < i;
                n += 3
              ) {
                const i = r.getX(n),
                  u = r.getX(n + 1),
                  d = r.getX(n + 2);
                (o = on(this, f, t, Fe, s, a, c, l, h, i, u, d)),
                  o &&
                    ((o.faceIndex = Math.floor(n / 3)),
                    (o.face.materialIndex = p.materialIndex),
                    e.push(o));
              }
            }
          else
            for (
              let n = Math.max(0, d.start),
                u = Math.min(r.count, d.start + d.count);
              n < u;
              n += 3
            ) {
              const u = r.getX(n),
                d = r.getX(n + 1),
                p = r.getX(n + 2);
              (o = on(this, i, t, Fe, s, a, c, l, h, u, d, p)),
                o && ((o.faceIndex = Math.floor(n / 3)), e.push(o));
            }
        else if (void 0 !== s)
          if (Array.isArray(i))
            for (let n = 0, r = u.length; n < r; n++) {
              const r = u[n],
                p = i[r.materialIndex];
              for (
                let n = Math.max(r.start, d.start),
                  i = Math.min(r.start + r.count, d.start + d.count);
                n < i;
                n += 3
              )
                (o = on(this, p, t, Fe, s, a, c, l, h, n, n + 1, n + 2)),
                  o &&
                    ((o.faceIndex = Math.floor(n / 3)),
                    (o.face.materialIndex = r.materialIndex),
                    e.push(o));
            }
          else
            for (
              let n = Math.max(0, d.start),
                r = Math.min(s.count, d.start + d.count);
              n < r;
              n += 3
            )
              (o = on(this, i, t, Fe, s, a, c, l, h, n, n + 1, n + 2)),
                o && ((o.faceIndex = Math.floor(n / 3)), e.push(o));
      } else if (n.isGeometry) {
        const r = Array.isArray(i),
          s = n.vertices,
          a = n.faces;
        let c;
        const l = n.faceVertexUvs[0];
        l.length > 0 && (c = l);
        for (let n = 0, l = a.length; n < l; n++) {
          const l = a[n],
            h = r ? i[l.materialIndex] : i;
          if (void 0 === h) continue;
          const u = s[l.a],
            d = s[l.b],
            p = s[l.c];
          if (((o = rn(this, h, t, Fe, u, d, p, tn)), o)) {
            if (c && c[n]) {
              const t = c[n];
              Qe.copy(t[0]),
                Ke.copy(t[1]),
                $e.copy(t[2]),
                (o.uv = ne.getUV(tn, u, d, p, Qe, Ke, $e, new P()));
            }
            (o.face = l), (o.faceIndex = n), e.push(o);
          }
        }
      }
    },
  });
  class sn extends Ue {
    constructor(t = 1, e = 1, n = 1, i = 1, r = 1, o = 1) {
      super(),
        (this.type = "BoxBufferGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          depth: n,
          widthSegments: i,
          heightSegments: r,
          depthSegments: o,
        });
      const s = this;
      (i = Math.floor(i)), (r = Math.floor(r)), (o = Math.floor(o));
      const a = [],
        c = [],
        l = [],
        h = [];
      let u = 0,
        d = 0;
      function p(t, e, n, i, r, o, p, f, m, g, v) {
        const y = o / m,
          _ = p / g,
          x = o / 2,
          b = p / 2,
          w = f / 2,
          M = m + 1,
          S = g + 1;
        let E = 0,
          T = 0;
        const A = new G();
        for (let o = 0; o < S; o++) {
          const s = o * _ - b;
          for (let a = 0; a < M; a++) {
            const u = a * y - x;
            (A[t] = u * i),
              (A[e] = s * r),
              (A[n] = w),
              c.push(A.x, A.y, A.z),
              (A[t] = 0),
              (A[e] = 0),
              (A[n] = f > 0 ? 1 : -1),
              l.push(A.x, A.y, A.z),
              h.push(a / m),
              h.push(1 - o / g),
              (E += 1);
          }
        }
        for (let t = 0; t < g; t++)
          for (let e = 0; e < m; e++) {
            const n = u + e + M * t,
              i = u + e + M * (t + 1),
              r = u + (e + 1) + M * (t + 1),
              o = u + (e + 1) + M * t;
            a.push(n, i, o), a.push(i, r, o), (T += 6);
          }
        s.addGroup(d, T, v), (d += T), (u += E);
      }
      p("z", "y", "x", -1, -1, n, e, t, o, r, 0),
        p("z", "y", "x", 1, -1, n, e, -t, o, r, 1),
        p("x", "z", "y", 1, 1, t, n, e, i, o, 2),
        p("x", "z", "y", 1, -1, t, n, -e, i, o, 3),
        p("x", "y", "z", 1, -1, t, e, n, i, r, 4),
        p("x", "y", "z", -1, -1, t, e, -n, i, r, 5),
        this.setIndex(a),
        this.setAttribute("position", new Ee(c, 3)),
        this.setAttribute("normal", new Ee(l, 3)),
        this.setAttribute("uv", new Ee(h, 2));
    }
  }
  function an(t) {
    const e = {};
    for (const n in t) {
      e[n] = {};
      for (const i in t[n]) {
        const r = t[n][i];
        r &&
        (r.isColor ||
          r.isMatrix3 ||
          r.isMatrix4 ||
          r.isVector2 ||
          r.isVector3 ||
          r.isVector4 ||
          r.isTexture)
          ? (e[n][i] = r.clone())
          : Array.isArray(r)
          ? (e[n][i] = r.slice())
          : (e[n][i] = r);
      }
    }
    return e;
  }
  function cn(t) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const i = an(t[n]);
      for (const t in i) e[t] = i[t];
    }
    return e;
  }
  const ln = { clone: an, merge: cn };
  function hn(t) {
    de.call(this),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.vertexShader =
        "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"),
      (this.fragmentShader =
        "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}"),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.extensions = {
        derivatives: !1,
        fragDepth: !1,
        drawBuffers: !1,
        shaderTextureLOD: !1,
      }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      void 0 !== t &&
        (void 0 !== t.attributes &&
          console.error(
            "THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."
          ),
        this.setValues(t));
  }
  function un() {
    kt.call(this),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new gt()),
      (this.projectionMatrix = new gt()),
      (this.projectionMatrixInverse = new gt());
  }
  function dn(t = 50, e = 1, n = 0.1, i = 2e3) {
    un.call(this),
      (this.type = "PerspectiveCamera"),
      (this.fov = t),
      (this.zoom = 1),
      (this.near = n),
      (this.far = i),
      (this.focus = 10),
      (this.aspect = e),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix();
  }
  (hn.prototype = Object.create(de.prototype)),
    (hn.prototype.constructor = hn),
    (hn.prototype.isShaderMaterial = !0),
    (hn.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        (this.fragmentShader = t.fragmentShader),
        (this.vertexShader = t.vertexShader),
        (this.uniforms = an(t.uniforms)),
        (this.defines = Object.assign({}, t.defines)),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.lights = t.lights),
        (this.clipping = t.clipping),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.extensions = Object.assign({}, t.extensions)),
        (this.glslVersion = t.glslVersion),
        this
      );
    }),
    (hn.prototype.toJSON = function (t) {
      const e = de.prototype.toJSON.call(this, t);
      (e.glslVersion = this.glslVersion), (e.uniforms = {});
      for (const n in this.uniforms) {
        const i = this.uniforms[n].value;
        i && i.isTexture
          ? (e.uniforms[n] = { type: "t", value: i.toJSON(t).uuid })
          : i && i.isColor
          ? (e.uniforms[n] = { type: "c", value: i.getHex() })
          : i && i.isVector2
          ? (e.uniforms[n] = { type: "v2", value: i.toArray() })
          : i && i.isVector3
          ? (e.uniforms[n] = { type: "v3", value: i.toArray() })
          : i && i.isVector4
          ? (e.uniforms[n] = { type: "v4", value: i.toArray() })
          : i && i.isMatrix3
          ? (e.uniforms[n] = { type: "m3", value: i.toArray() })
          : i && i.isMatrix4
          ? (e.uniforms[n] = { type: "m4", value: i.toArray() })
          : (e.uniforms[n] = { value: i });
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines),
        (e.vertexShader = this.vertexShader),
        (e.fragmentShader = this.fragmentShader);
      const n = {};
      for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0);
      return Object.keys(n).length > 0 && (e.extensions = n), e;
    }),
    (un.prototype = Object.assign(Object.create(kt.prototype), {
      constructor: un,
      isCamera: !0,
      copy: function (t, e) {
        return (
          kt.prototype.copy.call(this, t, e),
          this.matrixWorldInverse.copy(t.matrixWorldInverse),
          this.projectionMatrix.copy(t.projectionMatrix),
          this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
          this
        );
      },
      getWorldDirection: function (t) {
        void 0 === t &&
          (console.warn(
            "THREE.Camera: .getWorldDirection() target is now required"
          ),
          (t = new G())),
          this.updateWorldMatrix(!0, !1);
        const e = this.matrixWorld.elements;
        return t.set(-e[8], -e[9], -e[10]).normalize();
      },
      updateMatrixWorld: function (t) {
        kt.prototype.updateMatrixWorld.call(this, t),
          this.matrixWorldInverse.copy(this.matrixWorld).invert();
      },
      updateWorldMatrix: function (t, e) {
        kt.prototype.updateWorldMatrix.call(this, t, e),
          this.matrixWorldInverse.copy(this.matrixWorld).invert();
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
    })),
    (dn.prototype = Object.assign(Object.create(un.prototype), {
      constructor: dn,
      isPerspectiveCamera: !0,
      copy: function (t, e) {
        return (
          un.prototype.copy.call(this, t, e),
          (this.fov = t.fov),
          (this.zoom = t.zoom),
          (this.near = t.near),
          (this.far = t.far),
          (this.focus = t.focus),
          (this.aspect = t.aspect),
          (this.view = null === t.view ? null : Object.assign({}, t.view)),
          (this.filmGauge = t.filmGauge),
          (this.filmOffset = t.filmOffset),
          this
        );
      },
      setFocalLength: function (t) {
        const e = (0.5 * this.getFilmHeight()) / t;
        (this.fov = 2 * R.RAD2DEG * Math.atan(e)),
          this.updateProjectionMatrix();
      },
      getFocalLength: function () {
        const t = Math.tan(0.5 * R.DEG2RAD * this.fov);
        return (0.5 * this.getFilmHeight()) / t;
      },
      getEffectiveFOV: function () {
        return (
          2 *
          R.RAD2DEG *
          Math.atan(Math.tan(0.5 * R.DEG2RAD * this.fov) / this.zoom)
        );
      },
      getFilmWidth: function () {
        return this.filmGauge * Math.min(this.aspect, 1);
      },
      getFilmHeight: function () {
        return this.filmGauge / Math.max(this.aspect, 1);
      },
      setViewOffset: function (t, e, n, i, r, o) {
        (this.aspect = t / e),
          null === this.view &&
            (this.view = {
              enabled: !0,
              fullWidth: 1,
              fullHeight: 1,
              offsetX: 0,
              offsetY: 0,
              width: 1,
              height: 1,
            }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = n),
          (this.view.offsetY = i),
          (this.view.width = r),
          (this.view.height = o),
          this.updateProjectionMatrix();
      },
      clearViewOffset: function () {
        null !== this.view && (this.view.enabled = !1),
          this.updateProjectionMatrix();
      },
      updateProjectionMatrix: function () {
        const t = this.near;
        let e = (t * Math.tan(0.5 * R.DEG2RAD * this.fov)) / this.zoom,
          n = 2 * e,
          i = this.aspect * n,
          r = -0.5 * i;
        const o = this.view;
        if (null !== this.view && this.view.enabled) {
          const t = o.fullWidth,
            s = o.fullHeight;
          (r += (o.offsetX * i) / t),
            (e -= (o.offsetY * n) / s),
            (i *= o.width / t),
            (n *= o.height / s);
        }
        const s = this.filmOffset;
        0 !== s && (r += (t * s) / this.getFilmWidth()),
          this.projectionMatrix.makePerspective(
            r,
            r + i,
            e,
            e - n,
            t,
            this.far
          ),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
      },
      toJSON: function (t) {
        const e = kt.prototype.toJSON.call(this, t);
        return (
          (e.object.fov = this.fov),
          (e.object.zoom = this.zoom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          (e.object.focus = this.focus),
          (e.object.aspect = this.aspect),
          null !== this.view && (e.object.view = Object.assign({}, this.view)),
          (e.object.filmGauge = this.filmGauge),
          (e.object.filmOffset = this.filmOffset),
          e
        );
      },
    }));
  const pn = 90;
  function fn(t, e, n) {
    if (
      (kt.call(this),
      (this.type = "CubeCamera"),
      !0 !== n.isWebGLCubeRenderTarget)
    )
      return void console.error(
        "THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter."
      );
    this.renderTarget = n;
    const i = new dn(pn, 1, t, e);
    (i.layers = this.layers),
      i.up.set(0, -1, 0),
      i.lookAt(new G(1, 0, 0)),
      this.add(i);
    const r = new dn(pn, 1, t, e);
    (r.layers = this.layers),
      r.up.set(0, -1, 0),
      r.lookAt(new G(-1, 0, 0)),
      this.add(r);
    const o = new dn(pn, 1, t, e);
    (o.layers = this.layers),
      o.up.set(0, 0, 1),
      o.lookAt(new G(0, 1, 0)),
      this.add(o);
    const s = new dn(pn, 1, t, e);
    (s.layers = this.layers),
      s.up.set(0, 0, -1),
      s.lookAt(new G(0, -1, 0)),
      this.add(s);
    const a = new dn(pn, 1, t, e);
    (a.layers = this.layers),
      a.up.set(0, -1, 0),
      a.lookAt(new G(0, 0, 1)),
      this.add(a);
    const c = new dn(pn, 1, t, e);
    (c.layers = this.layers),
      c.up.set(0, -1, 0),
      c.lookAt(new G(0, 0, -1)),
      this.add(c),
      (this.update = function (t, e) {
        null === this.parent && this.updateMatrixWorld();
        const l = t.xr.enabled,
          h = t.getRenderTarget();
        t.xr.enabled = !1;
        const u = n.texture.generateMipmaps;
        (n.texture.generateMipmaps = !1),
          t.setRenderTarget(n, 0),
          t.render(e, i),
          t.setRenderTarget(n, 1),
          t.render(e, r),
          t.setRenderTarget(n, 2),
          t.render(e, o),
          t.setRenderTarget(n, 3),
          t.render(e, s),
          t.setRenderTarget(n, 4),
          t.render(e, a),
          (n.texture.generateMipmaps = u),
          t.setRenderTarget(n, 5),
          t.render(e, c),
          t.setRenderTarget(h),
          (t.xr.enabled = l);
      });
  }
  function mn(t, e, n, i, r, o, s, a, c, l) {
    (t = void 0 !== t ? t : []),
      (e = void 0 !== e ? e : 301),
      (s = void 0 !== s ? s : d),
      z.call(this, t, e, n, i, r, o, s, a, c, l),
      (this.flipY = !1),
      (this._needsFlipEnvMap = !0);
  }
  function gn(t, e, n) {
    Number.isInteger(e) &&
      (console.warn(
        "THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"
      ),
      (e = n)),
      H.call(this, t, t, e),
      (e = e || {}),
      (this.texture = new mn(
        void 0,
        e.mapping,
        e.wrapS,
        e.wrapT,
        e.magFilter,
        e.minFilter,
        e.format,
        e.type,
        e.anisotropy,
        e.encoding
      )),
      (this.texture._needsFlipEnvMap = !1);
  }
  function vn(t, e, n, i, o, s, a, c, l, h, u, d) {
    z.call(this, null, s, a, c, l, h, i, o, u, d),
      (this.image = { data: t || null, width: e || 1, height: n || 1 }),
      (this.magFilter = void 0 !== l ? l : r),
      (this.minFilter = void 0 !== h ? h : r),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1),
      (this.needsUpdate = !0);
  }
  (fn.prototype = Object.create(kt.prototype)),
    (fn.prototype.constructor = fn),
    (mn.prototype = Object.create(z.prototype)),
    (mn.prototype.constructor = mn),
    (mn.prototype.isCubeTexture = !0),
    Object.defineProperty(mn.prototype, "images", {
      get: function () {
        return this.image;
      },
      set: function (t) {
        this.image = t;
      },
    }),
    (gn.prototype = Object.create(H.prototype)),
    (gn.prototype.constructor = gn),
    (gn.prototype.isWebGLCubeRenderTarget = !0),
    (gn.prototype.fromEquirectangularTexture = function (t, e) {
      (this.texture.type = e.type),
        (this.texture.format = p),
        (this.texture.encoding = e.encoding),
        (this.texture.generateMipmaps = e.generateMipmaps),
        (this.texture.minFilter = e.minFilter),
        (this.texture.magFilter = e.magFilter);
      const n = { tEquirect: { value: null } },
        i =
          "\n\n\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t#include <begin_vertex>\n\t\t\t\t#include <project_vertex>\n\n\t\t\t}\n\t\t",
        r =
          "\n\n\t\t\tuniform sampler2D tEquirect;\n\n\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t}\n\t\t",
        a = new sn(5, 5, 5),
        c = new hn({
          name: "CubemapFromEquirect",
          uniforms: an(n),
          vertexShader: i,
          fragmentShader: r,
          side: 1,
          blending: 0,
        });
      c.uniforms.tEquirect.value = e;
      const l = new nn(a, c),
        h = e.minFilter;
      return (
        e.minFilter === s && (e.minFilter = o),
        new fn(1, 10, this).update(t, l),
        (e.minFilter = h),
        l.geometry.dispose(),
        l.material.dispose(),
        this
      );
    }),
    (gn.prototype.clear = function (t, e, n, i) {
      const r = t.getRenderTarget();
      for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i);
      t.setRenderTarget(r);
    }),
    (vn.prototype = Object.create(z.prototype)),
    (vn.prototype.constructor = vn),
    (vn.prototype.isDataTexture = !0);
  const yn = new at(),
    _n = new G();
  class xn {
    constructor(t, e, n, i, r, o) {
      this.planes = [
        void 0 !== t ? t : new Wt(),
        void 0 !== e ? e : new Wt(),
        void 0 !== n ? n : new Wt(),
        void 0 !== i ? i : new Wt(),
        void 0 !== r ? r : new Wt(),
        void 0 !== o ? o : new Wt(),
      ];
    }
    set(t, e, n, i, r, o) {
      const s = this.planes;
      return (
        s[0].copy(t),
        s[1].copy(e),
        s[2].copy(n),
        s[3].copy(i),
        s[4].copy(r),
        s[5].copy(o),
        this
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
      return this;
    }
    setFromProjectionMatrix(t) {
      const e = this.planes,
        n = t.elements,
        i = n[0],
        r = n[1],
        o = n[2],
        s = n[3],
        a = n[4],
        c = n[5],
        l = n[6],
        h = n[7],
        u = n[8],
        d = n[9],
        p = n[10],
        f = n[11],
        m = n[12],
        g = n[13],
        v = n[14],
        y = n[15];
      return (
        e[0].setComponents(s - i, h - a, f - u, y - m).normalize(),
        e[1].setComponents(s + i, h + a, f + u, y + m).normalize(),
        e[2].setComponents(s + r, h + c, f + d, y + g).normalize(),
        e[3].setComponents(s - r, h - c, f - d, y - g).normalize(),
        e[4].setComponents(s - o, h - l, f - p, y - v).normalize(),
        e[5].setComponents(s + o, h + l, f + p, y + v).normalize(),
        this
      );
    }
    intersectsObject(t) {
      const e = t.geometry;
      return (
        null === e.boundingSphere && e.computeBoundingSphere(),
        yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),
        this.intersectsSphere(yn)
      );
    }
    intersectsSprite(t) {
      return (
        yn.center.set(0, 0, 0),
        (yn.radius = 0.7071067811865476),
        yn.applyMatrix4(t.matrixWorld),
        this.intersectsSphere(yn)
      );
    }
    intersectsSphere(t) {
      const e = this.planes,
        n = t.center,
        i = -t.radius;
      for (let t = 0; t < 6; t++) if (e[t].distanceToPoint(n) < i) return !1;
      return !0;
    }
    intersectsBox(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) {
        const i = e[n];
        if (
          ((_n.x = i.normal.x > 0 ? t.max.x : t.min.x),
          (_n.y = i.normal.y > 0 ? t.max.y : t.min.y),
          (_n.z = i.normal.z > 0 ? t.max.z : t.min.z),
          i.distanceToPoint(_n) < 0)
        )
          return !1;
      }
      return !0;
    }
    containsPoint(t) {
      const e = this.planes;
      for (let n = 0; n < 6; n++) if (e[n].distanceToPoint(t) < 0) return !1;
      return !0;
    }
  }
  function bn() {
    let t = null,
      e = !1,
      n = null,
      i = null;
    function r(e, o) {
      n(e, o), (i = t.requestAnimationFrame(r));
    }
    return {
      start: function () {
        !0 !== e && null !== n && ((i = t.requestAnimationFrame(r)), (e = !0));
      },
      stop: function () {
        t.cancelAnimationFrame(i), (e = !1);
      },
      setAnimationLoop: function (t) {
        n = t;
      },
      setContext: function (e) {
        t = e;
      },
    };
  }
  function wn(t, e) {
    const n = e.isWebGL2,
      i = new WeakMap();
    return {
      get: function (t) {
        return t.isInterleavedBufferAttribute && (t = t.data), i.get(t);
      },
      remove: function (e) {
        e.isInterleavedBufferAttribute && (e = e.data);
        const n = i.get(e);
        n && (t.deleteBuffer(n.buffer), i.delete(e));
      },
      update: function (e, r) {
        if (e.isGLBufferAttribute) {
          const t = i.get(e);
          return void (
            (!t || t.version < e.version) &&
            i.set(e, {
              buffer: e.buffer,
              type: e.type,
              bytesPerElement: e.elementSize,
              version: e.version,
            })
          );
        }
        e.isInterleavedBufferAttribute && (e = e.data);
        const o = i.get(e);
        void 0 === o
          ? i.set(
              e,
              (function (e, i) {
                const r = e.array,
                  o = e.usage,
                  s = t.createBuffer();
                t.bindBuffer(i, s), t.bufferData(i, r, o), e.onUploadCallback();
                let a = 5126;
                return (
                  r instanceof Float32Array
                    ? (a = 5126)
                    : r instanceof Float64Array
                    ? console.warn(
                        "THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."
                      )
                    : r instanceof Uint16Array
                    ? e.isFloat16BufferAttribute
                      ? n
                        ? (a = 5131)
                        : console.warn(
                            "THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."
                          )
                      : (a = 5123)
                    : r instanceof Int16Array
                    ? (a = 5122)
                    : r instanceof Uint32Array
                    ? (a = 5125)
                    : r instanceof Int32Array
                    ? (a = 5124)
                    : r instanceof Int8Array
                    ? (a = 5120)
                    : r instanceof Uint8Array && (a = 5121),
                  {
                    buffer: s,
                    type: a,
                    bytesPerElement: r.BYTES_PER_ELEMENT,
                    version: e.version,
                  }
                );
              })(e, r)
            )
          : o.version < e.version &&
            ((function (e, i, r) {
              const o = i.array,
                s = i.updateRange;
              t.bindBuffer(r, e),
                -1 === s.count
                  ? t.bufferSubData(r, 0, o)
                  : (n
                      ? t.bufferSubData(
                          r,
                          s.offset * o.BYTES_PER_ELEMENT,
                          o,
                          s.offset,
                          s.count
                        )
                      : t.bufferSubData(
                          r,
                          s.offset * o.BYTES_PER_ELEMENT,
                          o.subarray(s.offset, s.offset + s.count)
                        ),
                    (s.count = -1));
            })(o.buffer, e, r),
            (o.version = e.version));
      },
    };
  }
  class Mn extends Ue {
    constructor(t = 1, e = 1, n = 1, i = 1) {
      super(),
        (this.type = "PlaneBufferGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          widthSegments: n,
          heightSegments: i,
        });
      const r = t / 2,
        o = e / 2,
        s = Math.floor(n),
        a = Math.floor(i),
        c = s + 1,
        l = a + 1,
        h = t / s,
        u = e / a,
        d = [],
        p = [],
        f = [],
        m = [];
      for (let t = 0; t < l; t++) {
        const e = t * u - o;
        for (let n = 0; n < c; n++) {
          const i = n * h - r;
          p.push(i, -e, 0), f.push(0, 0, 1), m.push(n / s), m.push(1 - t / a);
        }
      }
      for (let t = 0; t < a; t++)
        for (let e = 0; e < s; e++) {
          const n = e + c * t,
            i = e + c * (t + 1),
            r = e + 1 + c * (t + 1),
            o = e + 1 + c * t;
          d.push(n, i, o), d.push(i, r, o);
        }
      this.setIndex(d),
        this.setAttribute("position", new Ee(p, 3)),
        this.setAttribute("normal", new Ee(f, 3)),
        this.setAttribute("uv", new Ee(m, 2));
    }
  }
  const Sn = {
      alphamap_fragment:
        "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
      alphamap_pars_fragment:
        "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      alphatest_fragment:
        "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
      aomap_fragment:
        "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
      aomap_pars_fragment:
        "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
      begin_vertex: "vec3 transformed = vec3( position );",
      beginnormal_vertex:
        "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
      bsdfs:
        "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",
      bumpmap_pars_fragment:
        "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
      clipping_planes_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
      clipping_planes_pars_fragment:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
      clipping_planes_pars_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
      clipping_planes_vertex:
        "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
      color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
      color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
      color_pars_vertex:
        "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
      color_vertex:
        "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz *= color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
      common:
        "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",
      cube_uv_reflection_fragment:
        "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
      defaultnormal_vertex:
        "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
      displacementmap_pars_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
      displacementmap_vertex:
        "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",
      emissivemap_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
      emissivemap_pars_fragment:
        "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
      encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
      encodings_pars_fragment:
        "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
      envmap_fragment:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
      envmap_common_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
      envmap_pars_fragment:
        "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
      envmap_pars_vertex:
        "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
      envmap_physical_pars_fragment:
        "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
      envmap_vertex:
        "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
      fog_vertex: "#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif",
      fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
      fog_fragment:
        "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
      fog_pars_fragment:
        "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
      gradientmap_pars_fragment:
        "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",
      lightmap_fragment:
        "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif",
      lightmap_pars_fragment:
        "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
      lights_lambert_vertex:
        "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",
      lights_pars_begin:
        "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
      lights_toon_fragment:
        "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
      lights_toon_pars_fragment:
        "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",
      lights_phong_fragment:
        "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
      lights_phong_pars_fragment:
        "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
      lights_physical_fragment:
        "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",
      lights_physical_pars_fragment:
        "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
      lights_fragment_begin:
        "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
      lights_fragment_maps:
        "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",
      lights_fragment_end:
        "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
      logdepthbuf_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
      logdepthbuf_pars_fragment:
        "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
      logdepthbuf_pars_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
      logdepthbuf_vertex:
        "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
      map_fragment:
        "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
      map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
      map_particle_fragment:
        "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
      map_particle_pars_fragment:
        "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
      metalnessmap_fragment:
        "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
      metalnessmap_pars_fragment:
        "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
      morphnormal_vertex:
        "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif",
      morphtarget_pars_vertex:
        "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
      morphtarget_vertex:
        "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
      normal_fragment_begin:
        "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
      normal_fragment_maps:
        "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif",
      normalmap_pars_fragment:
        "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tmat3 tsn = mat3( S, T, N );\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif",
      clearcoat_normal_fragment_begin:
        "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
      clearcoat_normal_fragment_maps:
        "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN );\n\t#endif\n#endif",
      clearcoat_pars_fragment:
        "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
      packing:
        "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
      premultiplied_alpha_fragment:
        "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
      project_vertex:
        "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
      dithering_fragment:
        "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
      dithering_pars_fragment:
        "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
      roughnessmap_fragment:
        "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
      roughnessmap_pars_fragment:
        "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
      shadowmap_pars_fragment:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
      shadowmap_pars_vertex:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
      shadowmap_vertex:
        "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",
      shadowmask_pars_fragment:
        "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
      skinbase_vertex:
        "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
      skinning_pars_vertex:
        "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
      skinning_vertex:
        "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
      skinnormal_vertex:
        "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
      specularmap_fragment:
        "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
      specularmap_pars_fragment:
        "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
      tonemapping_fragment:
        "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
      tonemapping_pars_fragment:
        "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
      transmissionmap_fragment:
        "#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif",
      transmissionmap_pars_fragment:
        "#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif",
      uv_pars_fragment:
        "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",
      uv_pars_vertex:
        "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",
      uv_vertex:
        "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
      uv2_pars_fragment:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
      uv2_pars_vertex:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",
      uv2_vertex:
        "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",
      worldpos_vertex:
        "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
      background_frag:
        "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      background_vert:
        "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
      cube_frag:
        "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      cube_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
      depth_frag:
        "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
      depth_vert:
        "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
      distanceRGBA_frag:
        "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
      distanceRGBA_vert:
        "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
      equirect_frag:
        "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
      equirect_vert:
        "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
      linedashed_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      linedashed_vert:
        "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
      meshbasic_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshbasic_vert:
        "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
      meshlambert_frag:
        "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshlambert_vert:
        "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshmatcap_frag:
        "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshmatcap_vert:
        "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
      meshtoon_frag:
        "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshtoon_vert:
        "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshphong_frag:
        "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshphong_vert:
        "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      meshphysical_frag:
        "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
      meshphysical_vert:
        "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      normal_frag:
        "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
      normal_vert:
        "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
      points_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
      points_vert:
        "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
      shadow_frag:
        "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
      shadow_vert:
        "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
      sprite_frag:
        "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
      sprite_vert:
        "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
    },
    En = {
      common: {
        diffuse: { value: new le(15658734) },
        opacity: { value: 1 },
        map: { value: null },
        uvTransform: { value: new O() },
        uv2Transform: { value: new O() },
        alphaMap: { value: null },
      },
      specularmap: { specularMap: { value: null } },
      envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1 },
        refractionRatio: { value: 0.98 },
        maxMipLevel: { value: 0 },
      },
      aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
      lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
      emissivemap: { emissiveMap: { value: null } },
      bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
      normalmap: {
        normalMap: { value: null },
        normalScale: { value: new P(1, 1) },
      },
      displacementmap: {
        displacementMap: { value: null },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      roughnessmap: { roughnessMap: { value: null } },
      metalnessmap: { metalnessMap: { value: null } },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 25e-5 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new le(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        directionalLights: {
          value: [],
          properties: { direction: {}, color: {} },
        },
        directionalLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            direction: {},
            distance: {},
            coneCos: {},
            penumbraCos: {},
            decay: {},
          },
        },
        spotLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        spotShadowMap: { value: [] },
        spotShadowMatrix: { value: [] },
        pointLights: {
          value: [],
          properties: { color: {}, position: {}, decay: {}, distance: {} },
        },
        pointLightShadows: {
          value: [],
          properties: {
            shadowBias: {},
            shadowNormalBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },
        hemisphereLights: {
          value: [],
          properties: { direction: {}, skyColor: {}, groundColor: {} },
        },
        rectAreaLights: {
          value: [],
          properties: { color: {}, position: {}, width: {}, height: {} },
        },
        ltc_1: { value: null },
        ltc_2: { value: null },
      },
      points: {
        diffuse: { value: new le(15658734) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new O() },
      },
      sprite: {
        diffuse: { value: new le(15658734) },
        opacity: { value: 1 },
        center: { value: new P(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new O() },
      },
    },
    Tn = {
      basic: {
        uniforms: cn([
          En.common,
          En.specularmap,
          En.envmap,
          En.aomap,
          En.lightmap,
          En.fog,
        ]),
        vertexShader: Sn.meshbasic_vert,
        fragmentShader: Sn.meshbasic_frag,
      },
      lambert: {
        uniforms: cn([
          En.common,
          En.specularmap,
          En.envmap,
          En.aomap,
          En.lightmap,
          En.emissivemap,
          En.fog,
          En.lights,
          { emissive: { value: new le(0) } },
        ]),
        vertexShader: Sn.meshlambert_vert,
        fragmentShader: Sn.meshlambert_frag,
      },
      phong: {
        uniforms: cn([
          En.common,
          En.specularmap,
          En.envmap,
          En.aomap,
          En.lightmap,
          En.emissivemap,
          En.bumpmap,
          En.normalmap,
          En.displacementmap,
          En.fog,
          En.lights,
          {
            emissive: { value: new le(0) },
            specular: { value: new le(1118481) },
            shininess: { value: 30 },
          },
        ]),
        vertexShader: Sn.meshphong_vert,
        fragmentShader: Sn.meshphong_frag,
      },
      standard: {
        uniforms: cn([
          En.common,
          En.envmap,
          En.aomap,
          En.lightmap,
          En.emissivemap,
          En.bumpmap,
          En.normalmap,
          En.displacementmap,
          En.roughnessmap,
          En.metalnessmap,
          En.fog,
          En.lights,
          {
            emissive: { value: new le(0) },
            roughness: { value: 1 },
            metalness: { value: 0 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: Sn.meshphysical_vert,
        fragmentShader: Sn.meshphysical_frag,
      },
      toon: {
        uniforms: cn([
          En.common,
          En.aomap,
          En.lightmap,
          En.emissivemap,
          En.bumpmap,
          En.normalmap,
          En.displacementmap,
          En.gradientmap,
          En.fog,
          En.lights,
          { emissive: { value: new le(0) } },
        ]),
        vertexShader: Sn.meshtoon_vert,
        fragmentShader: Sn.meshtoon_frag,
      },
      matcap: {
        uniforms: cn([
          En.common,
          En.bumpmap,
          En.normalmap,
          En.displacementmap,
          En.fog,
          { matcap: { value: null } },
        ]),
        vertexShader: Sn.meshmatcap_vert,
        fragmentShader: Sn.meshmatcap_frag,
      },
      points: {
        uniforms: cn([En.points, En.fog]),
        vertexShader: Sn.points_vert,
        fragmentShader: Sn.points_frag,
      },
      dashed: {
        uniforms: cn([
          En.common,
          En.fog,
          {
            scale: { value: 1 },
            dashSize: { value: 1 },
            totalSize: { value: 2 },
          },
        ]),
        vertexShader: Sn.linedashed_vert,
        fragmentShader: Sn.linedashed_frag,
      },
      depth: {
        uniforms: cn([En.common, En.displacementmap]),
        vertexShader: Sn.depth_vert,
        fragmentShader: Sn.depth_frag,
      },
      normal: {
        uniforms: cn([
          En.common,
          En.bumpmap,
          En.normalmap,
          En.displacementmap,
          { opacity: { value: 1 } },
        ]),
        vertexShader: Sn.normal_vert,
        fragmentShader: Sn.normal_frag,
      },
      sprite: {
        uniforms: cn([En.sprite, En.fog]),
        vertexShader: Sn.sprite_vert,
        fragmentShader: Sn.sprite_frag,
      },
      background: {
        uniforms: { uvTransform: { value: new O() }, t2D: { value: null } },
        vertexShader: Sn.background_vert,
        fragmentShader: Sn.background_frag,
      },
      cube: {
        uniforms: cn([En.envmap, { opacity: { value: 1 } }]),
        vertexShader: Sn.cube_vert,
        fragmentShader: Sn.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: Sn.equirect_vert,
        fragmentShader: Sn.equirect_frag,
      },
      distanceRGBA: {
        uniforms: cn([
          En.common,
          En.displacementmap,
          {
            referencePosition: { value: new G() },
            nearDistance: { value: 1 },
            farDistance: { value: 1e3 },
          },
        ]),
        vertexShader: Sn.distanceRGBA_vert,
        fragmentShader: Sn.distanceRGBA_frag,
      },
      shadow: {
        uniforms: cn([
          En.lights,
          En.fog,
          { color: { value: new le(0) }, opacity: { value: 1 } },
        ]),
        vertexShader: Sn.shadow_vert,
        fragmentShader: Sn.shadow_frag,
      },
    };
  function An(t, e, n, i, r) {
    const o = new le(0);
    let s,
      a,
      c = 0,
      l = null,
      h = 0,
      u = null;
    function d(t, e) {
      n.buffers.color.setClear(t.r, t.g, t.b, e, r);
    }
    return {
      getClearColor: function () {
        return o;
      },
      setClearColor: function (t, e = 1) {
        o.set(t), (c = e), d(o, c);
      },
      getClearAlpha: function () {
        return c;
      },
      setClearAlpha: function (t) {
        (c = t), d(o, c);
      },
      render: function (n, r, p, f) {
        let m = !0 === r.isScene ? r.background : null;
        m && m.isTexture && (m = e.get(m));
        const g = t.xr,
          v = g.getSession && g.getSession();
        v && "additive" === v.environmentBlendMode && (m = null),
          null === m ? d(o, c) : m && m.isColor && (d(m, 1), (f = !0)),
          (t.autoClear || f) &&
            t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          m &&
          (m.isCubeTexture || m.isWebGLCubeRenderTarget || 306 === m.mapping)
            ? (void 0 === a &&
                ((a = new nn(
                  new sn(1, 1, 1),
                  new hn({
                    name: "BackgroundCubeMaterial",
                    uniforms: an(Tn.cube.uniforms),
                    vertexShader: Tn.cube.vertexShader,
                    fragmentShader: Tn.cube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                a.geometry.deleteAttribute("normal"),
                a.geometry.deleteAttribute("uv"),
                (a.onBeforeRender = function (t, e, n) {
                  this.matrixWorld.copyPosition(n.matrixWorld);
                }),
                Object.defineProperty(a.material, "envMap", {
                  get: function () {
                    return this.uniforms.envMap.value;
                  },
                }),
                i.update(a)),
              m.isWebGLCubeRenderTarget && (m = m.texture),
              (a.material.uniforms.envMap.value = m),
              (a.material.uniforms.flipEnvMap.value =
                m.isCubeTexture && m._needsFlipEnvMap ? -1 : 1),
              (l === m && h === m.version && u === t.toneMapping) ||
                ((a.material.needsUpdate = !0),
                (l = m),
                (h = m.version),
                (u = t.toneMapping)),
              n.unshift(a, a.geometry, a.material, 0, 0, null))
            : m &&
              m.isTexture &&
              (void 0 === s &&
                ((s = new nn(
                  new Mn(2, 2),
                  new hn({
                    name: "BackgroundMaterial",
                    uniforms: an(Tn.background.uniforms),
                    vertexShader: Tn.background.vertexShader,
                    fragmentShader: Tn.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1,
                  })
                )),
                s.geometry.deleteAttribute("normal"),
                Object.defineProperty(s.material, "map", {
                  get: function () {
                    return this.uniforms.t2D.value;
                  },
                }),
                i.update(s)),
              (s.material.uniforms.t2D.value = m),
              !0 === m.matrixAutoUpdate && m.updateMatrix(),
              s.material.uniforms.uvTransform.value.copy(m.matrix),
              (l === m && h === m.version && u === t.toneMapping) ||
                ((s.material.needsUpdate = !0),
                (l = m),
                (h = m.version),
                (u = t.toneMapping)),
              n.unshift(s, s.geometry, s.material, 0, 0, null));
      },
    };
  }
  function Ln(t, e, n, i) {
    const r = t.getParameter(34921),
      o = i.isWebGL2 ? null : e.get("OES_vertex_array_object"),
      s = i.isWebGL2 || null !== o,
      a = {},
      c = d(null);
    let l = c;
    function h(e) {
      return i.isWebGL2 ? t.bindVertexArray(e) : o.bindVertexArrayOES(e);
    }
    function u(e) {
      return i.isWebGL2 ? t.deleteVertexArray(e) : o.deleteVertexArrayOES(e);
    }
    function d(t) {
      const e = [],
        n = [],
        i = [];
      for (let t = 0; t < r; t++) (e[t] = 0), (n[t] = 0), (i[t] = 0);
      return {
        geometry: null,
        program: null,
        wireframe: !1,
        newAttributes: e,
        enabledAttributes: n,
        attributeDivisors: i,
        object: t,
        attributes: {},
        index: null,
      };
    }
    function p() {
      const t = l.newAttributes;
      for (let e = 0, n = t.length; e < n; e++) t[e] = 0;
    }
    function f(t) {
      m(t, 0);
    }
    function m(n, r) {
      const o = l.newAttributes,
        s = l.enabledAttributes,
        a = l.attributeDivisors;
      (o[n] = 1),
        0 === s[n] && (t.enableVertexAttribArray(n), (s[n] = 1)),
        a[n] !== r &&
          ((i.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[
            i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"
          ](n, r),
          (a[n] = r));
    }
    function g() {
      const e = l.newAttributes,
        n = l.enabledAttributes;
      for (let i = 0, r = n.length; i < r; i++)
        n[i] !== e[i] && (t.disableVertexAttribArray(i), (n[i] = 0));
    }
    function v(e, n, r, o, s, a) {
      !0 !== i.isWebGL2 || (5124 !== r && 5125 !== r)
        ? t.vertexAttribPointer(e, n, r, o, s, a)
        : t.vertexAttribIPointer(e, n, r, s, a);
    }
    function y() {
      _(), l !== c && ((l = c), h(l.object));
    }
    function _() {
      (c.geometry = null), (c.program = null), (c.wireframe = !1);
    }
    return {
      setup: function (r, c, u, y, _) {
        let x = !1;
        if (s) {
          const e = (function (e, n, r) {
            const s = !0 === r.wireframe;
            let c = a[e.id];
            void 0 === c && ((c = {}), (a[e.id] = c));
            let l = c[n.id];
            void 0 === l && ((l = {}), (c[n.id] = l));
            let h = l[s];
            return (
              void 0 === h &&
                ((h = d(
                  i.isWebGL2 ? t.createVertexArray() : o.createVertexArrayOES()
                )),
                (l[s] = h)),
              h
            );
          })(y, u, c);
          l !== e && ((l = e), h(l.object)),
            (x = (function (t, e) {
              const n = l.attributes,
                i = t.attributes;
              let r = 0;
              for (const t in i) {
                const e = n[t],
                  o = i[t];
                if (void 0 === e) return !0;
                if (e.attribute !== o) return !0;
                if (e.data !== o.data) return !0;
                r++;
              }
              return l.attributesNum !== r || l.index !== e;
            })(y, _)),
            x &&
              (function (t, e) {
                const n = {},
                  i = t.attributes;
                let r = 0;
                for (const t in i) {
                  const e = i[t],
                    o = {};
                  (o.attribute = e),
                    e.data && (o.data = e.data),
                    (n[t] = o),
                    r++;
                }
                (l.attributes = n), (l.attributesNum = r), (l.index = e);
              })(y, _);
        } else {
          const t = !0 === c.wireframe;
          (l.geometry === y.id && l.program === u.id && l.wireframe === t) ||
            ((l.geometry = y.id),
            (l.program = u.id),
            (l.wireframe = t),
            (x = !0));
        }
        !0 === r.isInstancedMesh && (x = !0),
          null !== _ && n.update(_, 34963),
          x &&
            ((function (r, o, s, a) {
              if (
                !1 === i.isWebGL2 &&
                (r.isInstancedMesh || a.isInstancedBufferGeometry) &&
                null === e.get("ANGLE_instanced_arrays")
              )
                return;
              p();
              const c = a.attributes,
                l = s.getAttributes(),
                h = o.defaultAttributeValues;
              for (const e in l) {
                const i = l[e];
                if (i >= 0) {
                  const o = c[e];
                  if (void 0 !== o) {
                    const e = o.normalized,
                      r = o.itemSize,
                      s = n.get(o);
                    if (void 0 === s) continue;
                    const c = s.buffer,
                      l = s.type,
                      h = s.bytesPerElement;
                    if (o.isInterleavedBufferAttribute) {
                      const n = o.data,
                        s = n.stride,
                        u = o.offset;
                      n && n.isInstancedInterleavedBuffer
                        ? (m(i, n.meshPerAttribute),
                          void 0 === a._maxInstanceCount &&
                            (a._maxInstanceCount =
                              n.meshPerAttribute * n.count))
                        : f(i),
                        t.bindBuffer(34962, c),
                        v(i, r, l, e, s * h, u * h);
                    } else
                      o.isInstancedBufferAttribute
                        ? (m(i, o.meshPerAttribute),
                          void 0 === a._maxInstanceCount &&
                            (a._maxInstanceCount =
                              o.meshPerAttribute * o.count))
                        : f(i),
                        t.bindBuffer(34962, c),
                        v(i, r, l, e, 0, 0);
                  } else if ("instanceMatrix" === e) {
                    const e = n.get(r.instanceMatrix);
                    if (void 0 === e) continue;
                    const o = e.buffer,
                      s = e.type;
                    m(i + 0, 1),
                      m(i + 1, 1),
                      m(i + 2, 1),
                      m(i + 3, 1),
                      t.bindBuffer(34962, o),
                      t.vertexAttribPointer(i + 0, 4, s, !1, 64, 0),
                      t.vertexAttribPointer(i + 1, 4, s, !1, 64, 16),
                      t.vertexAttribPointer(i + 2, 4, s, !1, 64, 32),
                      t.vertexAttribPointer(i + 3, 4, s, !1, 64, 48);
                  } else if ("instanceColor" === e) {
                    const e = n.get(r.instanceColor);
                    if (void 0 === e) continue;
                    const o = e.buffer,
                      s = e.type;
                    m(i, 1),
                      t.bindBuffer(34962, o),
                      t.vertexAttribPointer(i, 3, s, !1, 12, 0);
                  } else if (void 0 !== h) {
                    const n = h[e];
                    if (void 0 !== n)
                      switch (n.length) {
                        case 2:
                          t.vertexAttrib2fv(i, n);
                          break;
                        case 3:
                          t.vertexAttrib3fv(i, n);
                          break;
                        case 4:
                          t.vertexAttrib4fv(i, n);
                          break;
                        default:
                          t.vertexAttrib1fv(i, n);
                      }
                  }
                }
              }
              g();
            })(r, c, u, y),
            null !== _ && t.bindBuffer(34963, n.get(_).buffer));
      },
      reset: y,
      resetDefaultState: _,
      dispose: function () {
        y();
        for (const t in a) {
          const e = a[t];
          for (const t in e) {
            const n = e[t];
            for (const t in n) u(n[t].object), delete n[t];
            delete e[t];
          }
          delete a[t];
        }
      },
      releaseStatesOfGeometry: function (t) {
        if (void 0 === a[t.id]) return;
        const e = a[t.id];
        for (const t in e) {
          const n = e[t];
          for (const t in n) u(n[t].object), delete n[t];
          delete e[t];
        }
        delete a[t.id];
      },
      releaseStatesOfProgram: function (t) {
        for (const e in a) {
          const n = a[e];
          if (void 0 === n[t.id]) continue;
          const i = n[t.id];
          for (const t in i) u(i[t].object), delete i[t];
          delete n[t.id];
        }
      },
      initAttributes: p,
      enableAttribute: f,
      disableUnusedAttributes: g,
    };
  }
  function Cn(t, e, n, i) {
    const r = i.isWebGL2;
    let o;
    (this.setMode = function (t) {
      o = t;
    }),
      (this.render = function (e, i) {
        t.drawArrays(o, e, i), n.update(i, o, 1);
      }),
      (this.renderInstances = function (i, s, a) {
        if (0 === a) return;
        let c, l;
        if (r) (c = t), (l = "drawArraysInstanced");
        else if (
          ((c = e.get("ANGLE_instanced_arrays")),
          (l = "drawArraysInstancedANGLE"),
          null === c)
        )
          return void console.error(
            "THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        c[l](o, i, s, a), n.update(s, o, a);
      });
  }
  function Rn(t, e, n) {
    let i;
    function r(e) {
      if ("highp" === e) {
        if (
          t.getShaderPrecisionFormat(35633, 36338).precision > 0 &&
          t.getShaderPrecisionFormat(35632, 36338).precision > 0
        )
          return "highp";
        e = "mediump";
      }
      return "mediump" === e &&
        t.getShaderPrecisionFormat(35633, 36337).precision > 0 &&
        t.getShaderPrecisionFormat(35632, 36337).precision > 0
        ? "mediump"
        : "lowp";
    }
    const o =
      ("undefined" != typeof WebGL2RenderingContext &&
        t instanceof WebGL2RenderingContext) ||
      ("undefined" != typeof WebGL2ComputeRenderingContext &&
        t instanceof WebGL2ComputeRenderingContext);
    let s = void 0 !== n.precision ? n.precision : "highp";
    const a = r(s);
    a !== s &&
      (console.warn(
        "THREE.WebGLRenderer:",
        s,
        "not supported, using",
        a,
        "instead."
      ),
      (s = a));
    const c = !0 === n.logarithmicDepthBuffer,
      l = t.getParameter(34930),
      h = t.getParameter(35660),
      u = t.getParameter(3379),
      d = t.getParameter(34076),
      p = t.getParameter(34921),
      f = t.getParameter(36347),
      m = t.getParameter(36348),
      g = t.getParameter(36349),
      v = h > 0,
      y = o || !!e.get("OES_texture_float");
    return {
      isWebGL2: o,
      getMaxAnisotropy: function () {
        if (void 0 !== i) return i;
        const n = e.get("EXT_texture_filter_anisotropic");
        return (
          (i =
            null !== n ? t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0),
          i
        );
      },
      getMaxPrecision: r,
      precision: s,
      logarithmicDepthBuffer: c,
      maxTextures: l,
      maxVertexTextures: h,
      maxTextureSize: u,
      maxCubemapSize: d,
      maxAttributes: p,
      maxVertexUniforms: f,
      maxVaryings: m,
      maxFragmentUniforms: g,
      vertexTextures: v,
      floatFragmentTextures: y,
      floatVertexTextures: v && y,
      maxSamples: o ? t.getParameter(36183) : 0,
    };
  }
  function Pn(t) {
    const e = this;
    let n = null,
      i = 0,
      r = !1,
      o = !1;
    const s = new Wt(),
      a = new O(),
      c = { value: null, needsUpdate: !1 };
    function l() {
      c.value !== n && ((c.value = n), (c.needsUpdate = i > 0)),
        (e.numPlanes = i),
        (e.numIntersection = 0);
    }
    function h(t, n, i, r) {
      const o = null !== t ? t.length : 0;
      let l = null;
      if (0 !== o) {
        if (((l = c.value), !0 !== r || null === l)) {
          const e = i + 4 * o,
            r = n.matrixWorldInverse;
          a.getNormalMatrix(r),
            (null === l || l.length < e) && (l = new Float32Array(e));
          for (let e = 0, n = i; e !== o; ++e, n += 4)
            s.copy(t[e]).applyMatrix4(r, a),
              s.normal.toArray(l, n),
              (l[n + 3] = s.constant);
        }
        (c.value = l), (c.needsUpdate = !0);
      }
      return (e.numPlanes = o), (e.numIntersection = 0), l;
    }
    (this.uniform = c),
      (this.numPlanes = 0),
      (this.numIntersection = 0),
      (this.init = function (t, e, o) {
        const s = 0 !== t.length || e || 0 !== i || r;
        return (r = e), (n = h(t, o, 0)), (i = t.length), s;
      }),
      (this.beginShadows = function () {
        (o = !0), h(null);
      }),
      (this.endShadows = function () {
        (o = !1), l();
      }),
      (this.setState = function (e, s, a) {
        const u = e.clippingPlanes,
          d = e.clipIntersection,
          p = e.clipShadows,
          f = t.get(e);
        if (!r || null === u || 0 === u.length || (o && !p)) o ? h(null) : l();
        else {
          const t = o ? 0 : i,
            e = 4 * t;
          let r = f.clippingState || null;
          (c.value = r), (r = h(u, s, e, a));
          for (let t = 0; t !== e; ++t) r[t] = n[t];
          (f.clippingState = r),
            (this.numIntersection = d ? this.numPlanes : 0),
            (this.numPlanes += t);
        }
      });
  }
  function On(t) {
    let e = new WeakMap();
    function n(t, e) {
      return 303 === e ? (t.mapping = 301) : 304 === e && (t.mapping = 302), t;
    }
    function i(t) {
      const n = t.target;
      n.removeEventListener("dispose", i);
      const r = e.get(n);
      void 0 !== r && (e.delete(n), r.dispose());
    }
    return {
      get: function (r) {
        if (r && r.isTexture) {
          const o = r.mapping;
          if (303 === o || 304 === o) {
            if (e.has(r)) return n(e.get(r).texture, r.mapping);
            {
              const o = r.image;
              if (o && o.height > 0) {
                const s = t.getRenderList(),
                  a = t.getRenderTarget(),
                  c = new gn(o.height / 2);
                return (
                  c.fromEquirectangularTexture(t, r),
                  e.set(r, c),
                  t.setRenderTarget(a),
                  t.setRenderList(s),
                  r.addEventListener("dispose", i),
                  n(c.texture, r.mapping)
                );
              }
              return null;
            }
          }
        }
        return r;
      },
      dispose: function () {
        e = new WeakMap();
      },
    };
  }
  function Nn(t) {
    const e = {};
    return {
      has: function (n) {
        if (void 0 !== e[n]) return null !== e[n];
        let i;
        switch (n) {
          case "WEBGL_depth_texture":
            i =
              t.getExtension("WEBGL_depth_texture") ||
              t.getExtension("MOZ_WEBGL_depth_texture") ||
              t.getExtension("WEBKIT_WEBGL_depth_texture");
            break;
          case "EXT_texture_filter_anisotropic":
            i =
              t.getExtension("EXT_texture_filter_anisotropic") ||
              t.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
              t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
          case "WEBGL_compressed_texture_s3tc":
            i =
              t.getExtension("WEBGL_compressed_texture_s3tc") ||
              t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
              t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
          case "WEBGL_compressed_texture_pvrtc":
            i =
              t.getExtension("WEBGL_compressed_texture_pvrtc") ||
              t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
          default:
            i = t.getExtension(n);
        }
        return (e[n] = i), null !== i;
      },
      get: function (t) {
        return (
          this.has(t) ||
            console.warn(
              "THREE.WebGLRenderer: " + t + " extension not supported."
            ),
          e[t]
        );
      },
    };
  }
  function In(t, e, n, i) {
    const r = new WeakMap(),
      o = new WeakMap();
    function s(t) {
      const a = t.target,
        c = r.get(a);
      null !== c.index && e.remove(c.index);
      for (const t in c.attributes) e.remove(c.attributes[t]);
      a.removeEventListener("dispose", s), r.delete(a);
      const l = o.get(c);
      l && (e.remove(l), o.delete(c)),
        i.releaseStatesOfGeometry(c),
        !0 === a.isInstancedBufferGeometry && delete a._maxInstanceCount,
        n.memory.geometries--;
    }
    function a(t) {
      const n = [],
        i = t.index,
        r = t.attributes.position;
      let s = 0;
      if (null !== i) {
        const t = i.array;
        s = i.version;
        for (let e = 0, i = t.length; e < i; e += 3) {
          const i = t[e + 0],
            r = t[e + 1],
            o = t[e + 2];
          n.push(i, r, r, o, o, i);
        }
      } else {
        const t = r.array;
        s = r.version;
        for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
          const t = e + 0,
            i = e + 1,
            r = e + 2;
          n.push(t, i, i, r, r, t);
        }
      }
      const a = new (Le(n) > 65535 ? Me : be)(n, 1);
      a.version = s;
      const c = o.get(t);
      c && e.remove(c), o.set(t, a);
    }
    return {
      get: function (t, e) {
        let i = r.get(e);
        return (
          i ||
          (e.addEventListener("dispose", s),
          e.isBufferGeometry
            ? (i = e)
            : e.isGeometry &&
              (void 0 === e._bufferGeometry &&
                (e._bufferGeometry = new Ue().setFromObject(t)),
              (i = e._bufferGeometry)),
          r.set(e, i),
          n.memory.geometries++,
          i)
        );
      },
      update: function (t) {
        const n = t.attributes;
        for (const t in n) e.update(n[t], 34962);
        const i = t.morphAttributes;
        for (const t in i) {
          const n = i[t];
          for (let t = 0, i = n.length; t < i; t++) e.update(n[t], 34962);
        }
      },
      getWireframeAttribute: function (t) {
        const e = o.get(t);
        if (e) {
          const n = t.index;
          null !== n && e.version < n.version && a(t);
        } else a(t);
        return o.get(t);
      },
    };
  }
  function Dn(t, e, n, i) {
    const r = i.isWebGL2;
    let o, s, a;
    (this.setMode = function (t) {
      o = t;
    }),
      (this.setIndex = function (t) {
        (s = t.type), (a = t.bytesPerElement);
      }),
      (this.render = function (e, i) {
        t.drawElements(o, i, s, e * a), n.update(i, o, 1);
      }),
      (this.renderInstances = function (i, c, l) {
        if (0 === l) return;
        let h, u;
        if (r) (h = t), (u = "drawElementsInstanced");
        else if (
          ((h = e.get("ANGLE_instanced_arrays")),
          (u = "drawElementsInstancedANGLE"),
          null === h)
        )
          return void console.error(
            "THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays."
          );
        h[u](o, c, s, i * a, l), n.update(c, o, l);
      });
  }
  function zn(t) {
    const e = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return {
      memory: { geometries: 0, textures: 0 },
      render: e,
      programs: null,
      autoReset: !0,
      reset: function () {
        e.frame++,
          (e.calls = 0),
          (e.triangles = 0),
          (e.points = 0),
          (e.lines = 0);
      },
      update: function (t, n, i) {
        switch ((e.calls++, n)) {
          case 4:
            e.triangles += i * (t / 3);
            break;
          case 1:
            e.lines += i * (t / 2);
            break;
          case 3:
            e.lines += i * (t - 1);
            break;
          case 2:
            e.lines += i * t;
            break;
          case 0:
            e.points += i * t;
            break;
          default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        }
      },
    };
  }
  function Bn(t, e) {
    return t[0] - e[0];
  }
  function Un(t, e) {
    return Math.abs(e[1]) - Math.abs(t[1]);
  }
  function Hn(t) {
    const e = {},
      n = new Float32Array(8),
      i = [];
    for (let t = 0; t < 8; t++) i[t] = [t, 0];
    return {
      update: function (r, o, s, a) {
        const c = r.morphTargetInfluences,
          l = void 0 === c ? 0 : c.length;
        let h = e[o.id];
        if (void 0 === h) {
          h = [];
          for (let t = 0; t < l; t++) h[t] = [t, 0];
          e[o.id] = h;
        }
        for (let t = 0; t < l; t++) {
          const e = h[t];
          (e[0] = t), (e[1] = c[t]);
        }
        h.sort(Un);
        for (let t = 0; t < 8; t++)
          t < l && h[t][1]
            ? ((i[t][0] = h[t][0]), (i[t][1] = h[t][1]))
            : ((i[t][0] = Number.MAX_SAFE_INTEGER), (i[t][1] = 0));
        i.sort(Bn);
        const u = s.morphTargets && o.morphAttributes.position,
          d = s.morphNormals && o.morphAttributes.normal;
        let p = 0;
        for (let t = 0; t < 8; t++) {
          const e = i[t],
            r = e[0],
            s = e[1];
          r !== Number.MAX_SAFE_INTEGER && s
            ? (u &&
                o.getAttribute("morphTarget" + t) !== u[r] &&
                o.setAttribute("morphTarget" + t, u[r]),
              d &&
                o.getAttribute("morphNormal" + t) !== d[r] &&
                o.setAttribute("morphNormal" + t, d[r]),
              (n[t] = s),
              (p += s))
            : (u &&
                !0 === o.hasAttribute("morphTarget" + t) &&
                o.deleteAttribute("morphTarget" + t),
              d &&
                !0 === o.hasAttribute("morphNormal" + t) &&
                o.deleteAttribute("morphNormal" + t),
              (n[t] = 0));
        }
        const f = o.morphTargetsRelative ? 1 : 1 - p;
        a.getUniforms().setValue(t, "morphTargetBaseInfluence", f),
          a.getUniforms().setValue(t, "morphTargetInfluences", n);
      },
    };
  }
  function Fn(t, e, n, i) {
    let r = new WeakMap();
    function o(t) {
      const e = t.target;
      e.removeEventListener("dispose", o),
        n.remove(e.instanceMatrix),
        null !== e.instanceColor && n.remove(e.instanceColor);
    }
    return {
      update: function (t) {
        const s = i.render.frame,
          a = t.geometry,
          c = e.get(t, a);
        return (
          r.get(c) !== s &&
            (a.isGeometry && c.updateFromObject(t), e.update(c), r.set(c, s)),
          t.isInstancedMesh &&
            (!1 === t.hasEventListener("dispose", o) &&
              t.addEventListener("dispose", o),
            n.update(t.instanceMatrix, 34962),
            null !== t.instanceColor && n.update(t.instanceColor, 34962)),
          c
        );
      },
      dispose: function () {
        r = new WeakMap();
      },
    };
  }
  function kn(t = null, e = 1, i = 1, o = 1) {
    z.call(this, null),
      (this.image = { data: t, width: e, height: i, depth: o }),
      (this.magFilter = r),
      (this.minFilter = r),
      (this.wrapR = n),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.needsUpdate = !0);
  }
  function Gn(t = null, e = 1, i = 1, o = 1) {
    z.call(this, null),
      (this.image = { data: t, width: e, height: i, depth: o }),
      (this.magFilter = r),
      (this.minFilter = r),
      (this.wrapR = n),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.needsUpdate = !0);
  }
  (Tn.physical = {
    uniforms: cn([
      Tn.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatNormalScale: { value: new P(1, 1) },
        clearcoatNormalMap: { value: null },
        sheen: { value: new le(0) },
        transmission: { value: 0 },
        transmissionMap: { value: null },
      },
    ]),
    vertexShader: Sn.meshphysical_vert,
    fragmentShader: Sn.meshphysical_frag,
  }),
    (kn.prototype = Object.create(z.prototype)),
    (kn.prototype.constructor = kn),
    (kn.prototype.isDataTexture2DArray = !0),
    (Gn.prototype = Object.create(z.prototype)),
    (Gn.prototype.constructor = Gn),
    (Gn.prototype.isDataTexture3D = !0);
  const Vn = new z(),
    jn = new kn(),
    Wn = new Gn(),
    qn = new mn(),
    Xn = [],
    Yn = [],
    Zn = new Float32Array(16),
    Jn = new Float32Array(9),
    Qn = new Float32Array(4);
  function Kn(t, e, n) {
    const i = t[0];
    if (i <= 0 || i > 0) return t;
    const r = e * n;
    let o = Xn[r];
    if ((void 0 === o && ((o = new Float32Array(r)), (Xn[r] = o)), 0 !== e)) {
      i.toArray(o, 0);
      for (let i = 1, r = 0; i !== e; ++i) (r += n), t[i].toArray(o, r);
    }
    return o;
  }
  function $n(t, e) {
    if (t.length !== e.length) return !1;
    for (let n = 0, i = t.length; n < i; n++) if (t[n] !== e[n]) return !1;
    return !0;
  }
  function ti(t, e) {
    for (let n = 0, i = e.length; n < i; n++) t[n] = e[n];
  }
  function ei(t, e) {
    let n = Yn[e];
    void 0 === n && ((n = new Int32Array(e)), (Yn[e] = n));
    for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit();
    return n;
  }
  function ni(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1f(this.addr, e), (n[0] = e));
  }
  function ii(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y) ||
        (t.uniform2f(this.addr, e.x, e.y), (n[0] = e.x), (n[1] = e.y));
    else {
      if ($n(n, e)) return;
      t.uniform2fv(this.addr, e), ti(n, e);
    }
  }
  function ri(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z) ||
        (t.uniform3f(this.addr, e.x, e.y, e.z),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z));
    else if (void 0 !== e.r)
      (n[0] === e.r && n[1] === e.g && n[2] === e.b) ||
        (t.uniform3f(this.addr, e.r, e.g, e.b),
        (n[0] = e.r),
        (n[1] = e.g),
        (n[2] = e.b));
    else {
      if ($n(n, e)) return;
      t.uniform3fv(this.addr, e), ti(n, e);
    }
  }
  function oi(t, e) {
    const n = this.cache;
    if (void 0 !== e.x)
      (n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w) ||
        (t.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z),
        (n[3] = e.w));
    else {
      if ($n(n, e)) return;
      t.uniform4fv(this.addr, e), ti(n, e);
    }
  }
  function si(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if ($n(n, e)) return;
      t.uniformMatrix2fv(this.addr, !1, e), ti(n, e);
    } else {
      if ($n(n, i)) return;
      Qn.set(i), t.uniformMatrix2fv(this.addr, !1, Qn), ti(n, i);
    }
  }
  function ai(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if ($n(n, e)) return;
      t.uniformMatrix3fv(this.addr, !1, e), ti(n, e);
    } else {
      if ($n(n, i)) return;
      Jn.set(i), t.uniformMatrix3fv(this.addr, !1, Jn), ti(n, i);
    }
  }
  function ci(t, e) {
    const n = this.cache,
      i = e.elements;
    if (void 0 === i) {
      if ($n(n, e)) return;
      t.uniformMatrix4fv(this.addr, !1, e), ti(n, e);
    } else {
      if ($n(n, i)) return;
      Zn.set(i), t.uniformMatrix4fv(this.addr, !1, Zn), ti(n, i);
    }
  }
  function li(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.safeSetTexture2D(e || Vn, r);
  }
  function hi(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.setTexture2DArray(e || jn, r);
  }
  function ui(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.setTexture3D(e || Wn, r);
  }
  function di(t, e, n) {
    const i = this.cache,
      r = n.allocateTextureUnit();
    i[0] !== r && (t.uniform1i(this.addr, r), (i[0] = r)),
      n.safeSetTextureCube(e || qn, r);
  }
  function pi(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1i(this.addr, e), (n[0] = e));
  }
  function fi(t, e) {
    const n = this.cache;
    $n(n, e) || (t.uniform2iv(this.addr, e), ti(n, e));
  }
  function mi(t, e) {
    const n = this.cache;
    $n(n, e) || (t.uniform3iv(this.addr, e), ti(n, e));
  }
  function gi(t, e) {
    const n = this.cache;
    $n(n, e) || (t.uniform4iv(this.addr, e), ti(n, e));
  }
  function vi(t, e) {
    const n = this.cache;
    n[0] !== e && (t.uniform1ui(this.addr, e), (n[0] = e));
  }
  function yi(t, e) {
    t.uniform1fv(this.addr, e);
  }
  function _i(t, e) {
    t.uniform1iv(this.addr, e);
  }
  function xi(t, e) {
    t.uniform2iv(this.addr, e);
  }
  function bi(t, e) {
    t.uniform3iv(this.addr, e);
  }
  function wi(t, e) {
    t.uniform4iv(this.addr, e);
  }
  function Mi(t, e) {
    const n = Kn(e, this.size, 2);
    t.uniform2fv(this.addr, n);
  }
  function Si(t, e) {
    const n = Kn(e, this.size, 3);
    t.uniform3fv(this.addr, n);
  }
  function Ei(t, e) {
    const n = Kn(e, this.size, 4);
    t.uniform4fv(this.addr, n);
  }
  function Ti(t, e) {
    const n = Kn(e, this.size, 4);
    t.uniformMatrix2fv(this.addr, !1, n);
  }
  function Ai(t, e) {
    const n = Kn(e, this.size, 9);
    t.uniformMatrix3fv(this.addr, !1, n);
  }
  function Li(t, e) {
    const n = Kn(e, this.size, 16);
    t.uniformMatrix4fv(this.addr, !1, n);
  }
  function Ci(t, e, n) {
    const i = e.length,
      r = ei(n, i);
    t.uniform1iv(this.addr, r);
    for (let t = 0; t !== i; ++t) n.safeSetTexture2D(e[t] || Vn, r[t]);
  }
  function Ri(t, e, n) {
    const i = e.length,
      r = ei(n, i);
    t.uniform1iv(this.addr, r);
    for (let t = 0; t !== i; ++t) n.safeSetTextureCube(e[t] || qn, r[t]);
  }
  function Pi(t, e, n) {
    (this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return ni;
          case 35664:
            return ii;
          case 35665:
            return ri;
          case 35666:
            return oi;
          case 35674:
            return si;
          case 35675:
            return ai;
          case 35676:
            return ci;
          case 5124:
          case 35670:
            return pi;
          case 35667:
          case 35671:
            return fi;
          case 35668:
          case 35672:
            return mi;
          case 35669:
          case 35673:
            return gi;
          case 5125:
            return vi;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return li;
          case 35679:
          case 36299:
          case 36307:
            return ui;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return di;
          case 36289:
          case 36303:
          case 36311:
          case 36292:
            return hi;
        }
      })(e.type));
  }
  function Oi(t, e, n) {
    (this.id = t),
      (this.addr = n),
      (this.cache = []),
      (this.size = e.size),
      (this.setValue = (function (t) {
        switch (t) {
          case 5126:
            return yi;
          case 35664:
            return Mi;
          case 35665:
            return Si;
          case 35666:
            return Ei;
          case 35674:
            return Ti;
          case 35675:
            return Ai;
          case 35676:
            return Li;
          case 5124:
          case 35670:
            return _i;
          case 35667:
          case 35671:
            return xi;
          case 35668:
          case 35672:
            return bi;
          case 35669:
          case 35673:
            return wi;
          case 35678:
          case 36198:
          case 36298:
          case 36306:
          case 35682:
            return Ci;
          case 35680:
          case 36300:
          case 36308:
          case 36293:
            return Ri;
        }
      })(e.type));
  }
  function Ni(t) {
    (this.id = t), (this.seq = []), (this.map = {});
  }
  (Oi.prototype.updateCache = function (t) {
    const e = this.cache;
    t instanceof Float32Array &&
      e.length !== t.length &&
      (this.cache = new Float32Array(t.length)),
      ti(e, t);
  }),
    (Ni.prototype.setValue = function (t, e, n) {
      const i = this.seq;
      for (let r = 0, o = i.length; r !== o; ++r) {
        const o = i[r];
        o.setValue(t, e[o.id], n);
      }
    });
  const Ii = /(\w+)(\])?(\[|\.)?/g;
  function Di(t, e) {
    t.seq.push(e), (t.map[e.id] = e);
  }
  function zi(t, e, n) {
    const i = t.name,
      r = i.length;
    for (Ii.lastIndex = 0; ; ) {
      const o = Ii.exec(i),
        s = Ii.lastIndex;
      let a = o[1];
      const c = "]" === o[2],
        l = o[3];
      if ((c && (a |= 0), void 0 === l || ("[" === l && s + 2 === r))) {
        Di(n, void 0 === l ? new Pi(a, t, e) : new Oi(a, t, e));
        break;
      }
      {
        let t = n.map[a];
        void 0 === t && ((t = new Ni(a)), Di(n, t)), (n = t);
      }
    }
  }
  function Bi(t, e) {
    (this.seq = []), (this.map = {});
    const n = t.getProgramParameter(e, 35718);
    for (let i = 0; i < n; ++i) {
      const n = t.getActiveUniform(e, i);
      zi(n, t.getUniformLocation(e, n.name), this);
    }
  }
  function Ui(t, e, n) {
    const i = t.createShader(e);
    return t.shaderSource(i, n), t.compileShader(i), i;
  }
  (Bi.prototype.setValue = function (t, e, n, i) {
    const r = this.map[e];
    void 0 !== r && r.setValue(t, n, i);
  }),
    (Bi.prototype.setOptional = function (t, e, n) {
      const i = e[n];
      void 0 !== i && this.setValue(t, n, i);
    }),
    (Bi.upload = function (t, e, n, i) {
      for (let r = 0, o = e.length; r !== o; ++r) {
        const o = e[r],
          s = n[o.id];
        !1 !== s.needsUpdate && o.setValue(t, s.value, i);
      }
    }),
    (Bi.seqWithValue = function (t, e) {
      const n = [];
      for (let i = 0, r = t.length; i !== r; ++i) {
        const r = t[i];
        r.id in e && n.push(r);
      }
      return n;
    });
  let Hi = 0;
  function Fi(t) {
    switch (t) {
      case w:
        return ["Linear", "( value )"];
      case 3001:
        return ["sRGB", "( value )"];
      case 3002:
        return ["RGBE", "( value )"];
      case 3004:
        return ["RGBM", "( value, 7.0 )"];
      case 3005:
        return ["RGBM", "( value, 16.0 )"];
      case 3006:
        return ["RGBD", "( value, 256.0 )"];
      case 3007:
        return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
      case 3003:
        return ["LogLuv", "( value )"];
      default:
        return (
          console.warn("THREE.WebGLProgram: Unsupported encoding:", t),
          ["Linear", "( value )"]
        );
    }
  }
  function ki(t, e, n) {
    const i = t.getShaderParameter(e, 35713),
      r = t.getShaderInfoLog(e).trim();
    return i && "" === r
      ? ""
      : "THREE.WebGLShader: gl.getShaderInfoLog() " +
          n +
          "\n" +
          r +
          (function (t) {
            const e = t.split("\n");
            for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
            return e.join("\n");
          })(t.getShaderSource(e));
  }
  function Gi(t, e) {
    const n = Fi(e);
    return (
      "vec4 " +
      t +
      "( vec4 value ) { return " +
      n[0] +
      "ToLinear" +
      n[1] +
      "; }"
    );
  }
  function Vi(t, e) {
    const n = Fi(e);
    return (
      "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
    );
  }
  function ji(t, e) {
    let n;
    switch (e) {
      case 1:
        n = "Linear";
        break;
      case 2:
        n = "Reinhard";
        break;
      case 3:
        n = "OptimizedCineon";
        break;
      case 4:
        n = "ACESFilmic";
        break;
      case 5:
        n = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e),
          (n = "Linear");
    }
    return (
      "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
    );
  }
  function Wi(t) {
    return "" !== t;
  }
  function qi(t, e) {
    return t
      .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
      .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
  }
  function Xi(t, e) {
    return t
      .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
      .replace(
        /UNION_CLIPPING_PLANES/g,
        e.numClippingPlanes - e.numClipIntersection
      );
  }
  const Yi = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function Zi(t) {
    return t.replace(Yi, Ji);
  }
  function Ji(t, e) {
    const n = Sn[e];
    if (void 0 === n) throw new Error("Can not resolve #include <" + e + ">");
    return Zi(n);
  }
  const Qi =
      /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
    Ki =
      /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function $i(t) {
    return t.replace(Ki, er).replace(Qi, tr);
  }
  function tr(t, e, n, i) {
    return (
      console.warn(
        "WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."
      ),
      er(0, e, n, i)
    );
  }
  function er(t, e, n, i) {
    let r = "";
    for (let t = parseInt(e); t < parseInt(n); t++)
      r += i
        .replace(/\[\s*i\s*\]/g, "[ " + t + " ]")
        .replace(/UNROLLED_LOOP_INDEX/g, t);
    return r;
  }
  function nr(t) {
    let e =
      "precision " +
      t.precision +
      " float;\nprecision " +
      t.precision +
      " int;";
    return (
      "highp" === t.precision
        ? (e += "\n#define HIGH_PRECISION")
        : "mediump" === t.precision
        ? (e += "\n#define MEDIUM_PRECISION")
        : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"),
      e
    );
  }
  function ir(t, e, n, i) {
    const r = t.getContext(),
      o = n.defines;
    let s = n.vertexShader,
      a = n.fragmentShader;
    const c = (function (t) {
        let e = "SHADOWMAP_TYPE_BASIC";
        return (
          1 === t.shadowMapType
            ? (e = "SHADOWMAP_TYPE_PCF")
            : 2 === t.shadowMapType
            ? (e = "SHADOWMAP_TYPE_PCF_SOFT")
            : 3 === t.shadowMapType && (e = "SHADOWMAP_TYPE_VSM"),
          e
        );
      })(n),
      l = (function (t) {
        let e = "ENVMAP_TYPE_CUBE";
        if (t.envMap)
          switch (t.envMapMode) {
            case 301:
            case 302:
              e = "ENVMAP_TYPE_CUBE";
              break;
            case 306:
            case 307:
              e = "ENVMAP_TYPE_CUBE_UV";
          }
        return e;
      })(n),
      h = (function (t) {
        let e = "ENVMAP_MODE_REFLECTION";
        if (t.envMap)
          switch (t.envMapMode) {
            case 302:
            case 307:
              e = "ENVMAP_MODE_REFRACTION";
          }
        return e;
      })(n),
      u = (function (t) {
        let e = "ENVMAP_BLENDING_NONE";
        if (t.envMap)
          switch (t.combine) {
            case 0:
              e = "ENVMAP_BLENDING_MULTIPLY";
              break;
            case 1:
              e = "ENVMAP_BLENDING_MIX";
              break;
            case 2:
              e = "ENVMAP_BLENDING_ADD";
          }
        return e;
      })(n),
      d = t.gammaFactor > 0 ? t.gammaFactor : 1,
      p = n.isWebGL2
        ? ""
        : (function (t) {
            return [
              t.extensionDerivatives ||
              t.envMapCubeUV ||
              t.bumpMap ||
              t.tangentSpaceNormalMap ||
              t.clearcoatNormalMap ||
              t.flatShading ||
              "physical" === t.shaderID
                ? "#extension GL_OES_standard_derivatives : enable"
                : "",
              (t.extensionFragDepth || t.logarithmicDepthBuffer) &&
              t.rendererExtensionFragDepth
                ? "#extension GL_EXT_frag_depth : enable"
                : "",
              t.extensionDrawBuffers && t.rendererExtensionDrawBuffers
                ? "#extension GL_EXT_draw_buffers : require"
                : "",
              (t.extensionShaderTextureLOD || t.envMap) &&
              t.rendererExtensionShaderTextureLod
                ? "#extension GL_EXT_shader_texture_lod : enable"
                : "",
            ]
              .filter(Wi)
              .join("\n");
          })(n),
      f = (function (t) {
        const e = [];
        for (const n in t) {
          const i = t[n];
          !1 !== i && e.push("#define " + n + " " + i);
        }
        return e.join("\n");
      })(o),
      m = r.createProgram();
    let g,
      v,
      y = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
    n.isRawShaderMaterial
      ? ((g = [f].filter(Wi).join("\n")),
        g.length > 0 && (g += "\n"),
        (v = [p, f].filter(Wi).join("\n")),
        v.length > 0 && (v += "\n"))
      : ((g = [
          nr(n),
          "#define SHADER_NAME " + n.shaderName,
          f,
          n.instancing ? "#define USE_INSTANCING" : "",
          n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
          n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
          "#define GAMMA_FACTOR " + d,
          "#define MAX_BONES " + n.maxBones,
          n.useFog && n.fog ? "#define USE_FOG" : "",
          n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
          n.map ? "#define USE_MAP" : "",
          n.envMap ? "#define USE_ENVMAP" : "",
          n.envMap ? "#define " + h : "",
          n.lightMap ? "#define USE_LIGHTMAP" : "",
          n.aoMap ? "#define USE_AOMAP" : "",
          n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          n.bumpMap ? "#define USE_BUMPMAP" : "",
          n.normalMap ? "#define USE_NORMALMAP" : "",
          n.normalMap && n.objectSpaceNormalMap
            ? "#define OBJECTSPACE_NORMALMAP"
            : "",
          n.normalMap && n.tangentSpaceNormalMap
            ? "#define TANGENTSPACE_NORMALMAP"
            : "",
          n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          n.displacementMap && n.supportsVertexTextures
            ? "#define USE_DISPLACEMENTMAP"
            : "",
          n.specularMap ? "#define USE_SPECULARMAP" : "",
          n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          n.metalnessMap ? "#define USE_METALNESSMAP" : "",
          n.alphaMap ? "#define USE_ALPHAMAP" : "",
          n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          n.vertexTangents ? "#define USE_TANGENT" : "",
          n.vertexColors ? "#define USE_COLOR" : "",
          n.vertexUvs ? "#define USE_UV" : "",
          n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
          n.flatShading ? "#define FLAT_SHADED" : "",
          n.skinning ? "#define USE_SKINNING" : "",
          n.useVertexTexture ? "#define BONE_TEXTURE" : "",
          n.morphTargets ? "#define USE_MORPHTARGETS" : "",
          n.morphNormals && !1 === n.flatShading
            ? "#define USE_MORPHNORMALS"
            : "",
          n.doubleSided ? "#define DOUBLE_SIDED" : "",
          n.flipSided ? "#define FLIP_SIDED" : "",
          n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          n.shadowMapEnabled ? "#define " + c : "",
          n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
          n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          "uniform mat4 modelMatrix;",
          "uniform mat4 modelViewMatrix;",
          "uniform mat4 projectionMatrix;",
          "uniform mat4 viewMatrix;",
          "uniform mat3 normalMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          "#ifdef USE_INSTANCING",
          "\tattribute mat4 instanceMatrix;",
          "#endif",
          "#ifdef USE_INSTANCING_COLOR",
          "\tattribute vec3 instanceColor;",
          "#endif",
          "attribute vec3 position;",
          "attribute vec3 normal;",
          "attribute vec2 uv;",
          "#ifdef USE_TANGENT",
          "\tattribute vec4 tangent;",
          "#endif",
          "#ifdef USE_COLOR",
          "\tattribute vec3 color;",
          "#endif",
          "#ifdef USE_MORPHTARGETS",
          "\tattribute vec3 morphTarget0;",
          "\tattribute vec3 morphTarget1;",
          "\tattribute vec3 morphTarget2;",
          "\tattribute vec3 morphTarget3;",
          "\t#ifdef USE_MORPHNORMALS",
          "\t\tattribute vec3 morphNormal0;",
          "\t\tattribute vec3 morphNormal1;",
          "\t\tattribute vec3 morphNormal2;",
          "\t\tattribute vec3 morphNormal3;",
          "\t#else",
          "\t\tattribute vec3 morphTarget4;",
          "\t\tattribute vec3 morphTarget5;",
          "\t\tattribute vec3 morphTarget6;",
          "\t\tattribute vec3 morphTarget7;",
          "\t#endif",
          "#endif",
          "#ifdef USE_SKINNING",
          "\tattribute vec4 skinIndex;",
          "\tattribute vec4 skinWeight;",
          "#endif",
          "\n",
        ]
          .filter(Wi)
          .join("\n")),
        (v = [
          p,
          nr(n),
          "#define SHADER_NAME " + n.shaderName,
          f,
          n.alphaTest
            ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0")
            : "",
          "#define GAMMA_FACTOR " + d,
          n.useFog && n.fog ? "#define USE_FOG" : "",
          n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
          n.map ? "#define USE_MAP" : "",
          n.matcap ? "#define USE_MATCAP" : "",
          n.envMap ? "#define USE_ENVMAP" : "",
          n.envMap ? "#define " + l : "",
          n.envMap ? "#define " + h : "",
          n.envMap ? "#define " + u : "",
          n.lightMap ? "#define USE_LIGHTMAP" : "",
          n.aoMap ? "#define USE_AOMAP" : "",
          n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
          n.bumpMap ? "#define USE_BUMPMAP" : "",
          n.normalMap ? "#define USE_NORMALMAP" : "",
          n.normalMap && n.objectSpaceNormalMap
            ? "#define OBJECTSPACE_NORMALMAP"
            : "",
          n.normalMap && n.tangentSpaceNormalMap
            ? "#define TANGENTSPACE_NORMALMAP"
            : "",
          n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
          n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
          n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
          n.specularMap ? "#define USE_SPECULARMAP" : "",
          n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
          n.metalnessMap ? "#define USE_METALNESSMAP" : "",
          n.alphaMap ? "#define USE_ALPHAMAP" : "",
          n.sheen ? "#define USE_SHEEN" : "",
          n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
          n.vertexTangents ? "#define USE_TANGENT" : "",
          n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
          n.vertexUvs ? "#define USE_UV" : "",
          n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
          n.gradientMap ? "#define USE_GRADIENTMAP" : "",
          n.flatShading ? "#define FLAT_SHADED" : "",
          n.doubleSided ? "#define DOUBLE_SIDED" : "",
          n.flipSided ? "#define FLIP_SIDED" : "",
          n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
          n.shadowMapEnabled ? "#define " + c : "",
          n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
          n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
          n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
          n.logarithmicDepthBuffer && n.rendererExtensionFragDepth
            ? "#define USE_LOGDEPTHBUF_EXT"
            : "",
          (n.extensionShaderTextureLOD || n.envMap) &&
          n.rendererExtensionShaderTextureLod
            ? "#define TEXTURE_LOD_EXT"
            : "",
          "uniform mat4 viewMatrix;",
          "uniform vec3 cameraPosition;",
          "uniform bool isOrthographic;",
          0 !== n.toneMapping ? "#define TONE_MAPPING" : "",
          0 !== n.toneMapping ? Sn.tonemapping_pars_fragment : "",
          0 !== n.toneMapping ? ji("toneMapping", n.toneMapping) : "",
          n.dithering ? "#define DITHERING" : "",
          Sn.encodings_pars_fragment,
          n.map ? Gi("mapTexelToLinear", n.mapEncoding) : "",
          n.matcap ? Gi("matcapTexelToLinear", n.matcapEncoding) : "",
          n.envMap ? Gi("envMapTexelToLinear", n.envMapEncoding) : "",
          n.emissiveMap
            ? Gi("emissiveMapTexelToLinear", n.emissiveMapEncoding)
            : "",
          n.lightMap ? Gi("lightMapTexelToLinear", n.lightMapEncoding) : "",
          Vi("linearToOutputTexel", n.outputEncoding),
          n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
          "\n",
        ]
          .filter(Wi)
          .join("\n"))),
      (s = Zi(s)),
      (s = qi(s, n)),
      (s = Xi(s, n)),
      (a = Zi(a)),
      (a = qi(a, n)),
      (a = Xi(a, n)),
      (s = $i(s)),
      (a = $i(a)),
      n.isWebGL2 &&
        !0 !== n.isRawShaderMaterial &&
        ((y = "#version 300 es\n"),
        (g =
          [
            "#define attribute in",
            "#define varying out",
            "#define texture2D texture",
          ].join("\n") +
          "\n" +
          g),
        (v =
          [
            "#define varying in",
            n.glslVersion === T ? "" : "out highp vec4 pc_fragColor;",
            n.glslVersion === T ? "" : "#define gl_FragColor pc_fragColor",
            "#define gl_FragDepthEXT gl_FragDepth",
            "#define texture2D texture",
            "#define textureCube texture",
            "#define texture2DProj textureProj",
            "#define texture2DLodEXT textureLod",
            "#define texture2DProjLodEXT textureProjLod",
            "#define textureCubeLodEXT textureLod",
            "#define texture2DGradEXT textureGrad",
            "#define texture2DProjGradEXT textureProjGrad",
            "#define textureCubeGradEXT textureGrad",
          ].join("\n") +
          "\n" +
          v));
    const _ = y + v + a,
      x = Ui(r, 35633, y + g + s),
      b = Ui(r, 35632, _);
    if (
      (r.attachShader(m, x),
      r.attachShader(m, b),
      void 0 !== n.index0AttributeName
        ? r.bindAttribLocation(m, 0, n.index0AttributeName)
        : !0 === n.morphTargets && r.bindAttribLocation(m, 0, "position"),
      r.linkProgram(m),
      t.debug.checkShaderErrors)
    ) {
      const t = r.getProgramInfoLog(m).trim(),
        e = r.getShaderInfoLog(x).trim(),
        n = r.getShaderInfoLog(b).trim();
      let i = !0,
        o = !0;
      if (!1 === r.getProgramParameter(m, 35714)) {
        i = !1;
        const e = ki(r, x, "vertex"),
          n = ki(r, b, "fragment");
        console.error(
          "THREE.WebGLProgram: shader error: ",
          r.getError(),
          "35715",
          r.getProgramParameter(m, 35715),
          "gl.getProgramInfoLog",
          t,
          e,
          n
        );
      } else
        "" !== t
          ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", t)
          : ("" !== e && "" !== n) || (o = !1);
      o &&
        (this.diagnostics = {
          runnable: i,
          programLog: t,
          vertexShader: { log: e, prefix: g },
          fragmentShader: { log: n, prefix: v },
        });
    }
    let w, M;
    return (
      r.deleteShader(x),
      r.deleteShader(b),
      (this.getUniforms = function () {
        return void 0 === w && (w = new Bi(r, m)), w;
      }),
      (this.getAttributes = function () {
        return (
          void 0 === M &&
            (M = (function (t, e) {
              const n = {},
                i = t.getProgramParameter(e, 35721);
              for (let r = 0; r < i; r++) {
                const i = t.getActiveAttrib(e, r).name;
                n[i] = t.getAttribLocation(e, i);
              }
              return n;
            })(r, m)),
          M
        );
      }),
      (this.destroy = function () {
        i.releaseStatesOfProgram(this),
          r.deleteProgram(m),
          (this.program = void 0);
      }),
      (this.name = n.shaderName),
      (this.id = Hi++),
      (this.cacheKey = e),
      (this.usedTimes = 1),
      (this.program = m),
      (this.vertexShader = x),
      (this.fragmentShader = b),
      this
    );
  }
  function rr(t, e, n, i, r, o) {
    const s = [],
      a = i.isWebGL2,
      c = i.logarithmicDepthBuffer,
      l = i.floatVertexTextures,
      h = i.maxVertexUniforms,
      u = i.vertexTextures;
    let d = i.precision;
    const p = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite",
      },
      f = [
        "precision",
        "isWebGL2",
        "supportsVertexTextures",
        "outputEncoding",
        "instancing",
        "instancingColor",
        "map",
        "mapEncoding",
        "matcap",
        "matcapEncoding",
        "envMap",
        "envMapMode",
        "envMapEncoding",
        "envMapCubeUV",
        "lightMap",
        "lightMapEncoding",
        "aoMap",
        "emissiveMap",
        "emissiveMapEncoding",
        "bumpMap",
        "normalMap",
        "objectSpaceNormalMap",
        "tangentSpaceNormalMap",
        "clearcoatMap",
        "clearcoatRoughnessMap",
        "clearcoatNormalMap",
        "displacementMap",
        "specularMap",
        "roughnessMap",
        "metalnessMap",
        "gradientMap",
        "alphaMap",
        "combine",
        "vertexColors",
        "vertexTangents",
        "vertexUvs",
        "uvsVertexOnly",
        "fog",
        "useFog",
        "fogExp2",
        "flatShading",
        "sizeAttenuation",
        "logarithmicDepthBuffer",
        "skinning",
        "maxBones",
        "useVertexTexture",
        "morphTargets",
        "morphNormals",
        "maxMorphTargets",
        "maxMorphNormals",
        "premultipliedAlpha",
        "numDirLights",
        "numPointLights",
        "numSpotLights",
        "numHemiLights",
        "numRectAreaLights",
        "numDirLightShadows",
        "numPointLightShadows",
        "numSpotLightShadows",
        "shadowMapEnabled",
        "shadowMapType",
        "toneMapping",
        "physicallyCorrectLights",
        "alphaTest",
        "doubleSided",
        "flipSided",
        "numClippingPlanes",
        "numClipIntersection",
        "depthPacking",
        "dithering",
        "sheen",
        "transmissionMap",
      ];
    function m(t) {
      let e;
      return (
        t && t.isTexture
          ? (e = t.encoding)
          : t && t.isWebGLRenderTarget
          ? (console.warn(
              "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."
            ),
            (e = t.texture.encoding))
          : (e = w),
        e
      );
    }
    return {
      getParameters: function (r, s, f, g, v) {
        const y = g.fog,
          _ = r.isMeshStandardMaterial ? g.environment : null,
          x = e.get(r.envMap || _),
          b = p[r.type],
          w = v.isSkinnedMesh
            ? (function (t) {
                const e = t.skeleton.bones;
                if (l) return 1024;
                {
                  const t = h,
                    n = Math.floor((t - 20) / 4),
                    i = Math.min(n, e.length);
                  return i < e.length
                    ? (console.warn(
                        "THREE.WebGLRenderer: Skeleton has " +
                          e.length +
                          " bones. This GPU supports " +
                          i +
                          "."
                      ),
                      0)
                    : i;
                }
              })(v)
            : 0;
        let M, S;
        if (
          (null !== r.precision &&
            ((d = i.getMaxPrecision(r.precision)),
            d !== r.precision &&
              console.warn(
                "THREE.WebGLProgram.getParameters:",
                r.precision,
                "not supported, using",
                d,
                "instead."
              )),
          b)
        ) {
          const t = Tn[b];
          (M = t.vertexShader), (S = t.fragmentShader);
        } else (M = r.vertexShader), (S = r.fragmentShader);
        const E = t.getRenderTarget();
        return {
          isWebGL2: a,
          shaderID: b,
          shaderName: r.type,
          vertexShader: M,
          fragmentShader: S,
          defines: r.defines,
          isRawShaderMaterial: !0 === r.isRawShaderMaterial,
          glslVersion: r.glslVersion,
          precision: d,
          instancing: !0 === v.isInstancedMesh,
          instancingColor: !0 === v.isInstancedMesh && null !== v.instanceColor,
          supportsVertexTextures: u,
          outputEncoding: null !== E ? m(E.texture) : t.outputEncoding,
          map: !!r.map,
          mapEncoding: m(r.map),
          matcap: !!r.matcap,
          matcapEncoding: m(r.matcap),
          envMap: !!x,
          envMapMode: x && x.mapping,
          envMapEncoding: m(x),
          envMapCubeUV: !!x && (306 === x.mapping || 307 === x.mapping),
          lightMap: !!r.lightMap,
          lightMapEncoding: m(r.lightMap),
          aoMap: !!r.aoMap,
          emissiveMap: !!r.emissiveMap,
          emissiveMapEncoding: m(r.emissiveMap),
          bumpMap: !!r.bumpMap,
          normalMap: !!r.normalMap,
          objectSpaceNormalMap: 1 === r.normalMapType,
          tangentSpaceNormalMap: 0 === r.normalMapType,
          clearcoatMap: !!r.clearcoatMap,
          clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
          clearcoatNormalMap: !!r.clearcoatNormalMap,
          displacementMap: !!r.displacementMap,
          roughnessMap: !!r.roughnessMap,
          metalnessMap: !!r.metalnessMap,
          specularMap: !!r.specularMap,
          alphaMap: !!r.alphaMap,
          gradientMap: !!r.gradientMap,
          sheen: !!r.sheen,
          transmissionMap: !!r.transmissionMap,
          combine: r.combine,
          vertexTangents: r.normalMap && r.vertexTangents,
          vertexColors: r.vertexColors,
          vertexUvs: !!(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatMap ||
            r.clearcoatRoughnessMap ||
            r.clearcoatNormalMap ||
            r.displacementMap ||
            r.transmissionMap
          ),
          uvsVertexOnly: !(
            r.map ||
            r.bumpMap ||
            r.normalMap ||
            r.specularMap ||
            r.alphaMap ||
            r.emissiveMap ||
            r.roughnessMap ||
            r.metalnessMap ||
            r.clearcoatNormalMap ||
            r.transmissionMap ||
            !r.displacementMap
          ),
          fog: !!y,
          useFog: r.fog,
          fogExp2: y && y.isFogExp2,
          flatShading: r.flatShading,
          sizeAttenuation: r.sizeAttenuation,
          logarithmicDepthBuffer: c,
          skinning: r.skinning && w > 0,
          maxBones: w,
          useVertexTexture: l,
          morphTargets: r.morphTargets,
          morphNormals: r.morphNormals,
          maxMorphTargets: t.maxMorphTargets,
          maxMorphNormals: t.maxMorphNormals,
          numDirLights: s.directional.length,
          numPointLights: s.point.length,
          numSpotLights: s.spot.length,
          numRectAreaLights: s.rectArea.length,
          numHemiLights: s.hemi.length,
          numDirLightShadows: s.directionalShadowMap.length,
          numPointLightShadows: s.pointShadowMap.length,
          numSpotLightShadows: s.spotShadowMap.length,
          numClippingPlanes: o.numPlanes,
          numClipIntersection: o.numIntersection,
          dithering: r.dithering,
          shadowMapEnabled: t.shadowMap.enabled && f.length > 0,
          shadowMapType: t.shadowMap.type,
          toneMapping: r.toneMapped ? t.toneMapping : 0,
          physicallyCorrectLights: t.physicallyCorrectLights,
          premultipliedAlpha: r.premultipliedAlpha,
          alphaTest: r.alphaTest,
          doubleSided: 2 === r.side,
          flipSided: 1 === r.side,
          depthPacking: void 0 !== r.depthPacking && r.depthPacking,
          index0AttributeName: r.index0AttributeName,
          extensionDerivatives: r.extensions && r.extensions.derivatives,
          extensionFragDepth: r.extensions && r.extensions.fragDepth,
          extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
          extensionShaderTextureLOD:
            r.extensions && r.extensions.shaderTextureLOD,
          rendererExtensionFragDepth: a || n.has("EXT_frag_depth"),
          rendererExtensionDrawBuffers: a || n.has("WEBGL_draw_buffers"),
          rendererExtensionShaderTextureLod:
            a || n.has("EXT_shader_texture_lod"),
          customProgramCacheKey: r.customProgramCacheKey(),
        };
      },
      getProgramCacheKey: function (e) {
        const n = [];
        if (
          (e.shaderID
            ? n.push(e.shaderID)
            : (n.push(e.fragmentShader), n.push(e.vertexShader)),
          void 0 !== e.defines)
        )
          for (const t in e.defines) n.push(t), n.push(e.defines[t]);
        if (!1 === e.isRawShaderMaterial) {
          for (let t = 0; t < f.length; t++) n.push(e[f[t]]);
          n.push(t.outputEncoding), n.push(t.gammaFactor);
        }
        return n.push(e.customProgramCacheKey), n.join();
      },
      getUniforms: function (t) {
        const e = p[t.type];
        let n;
        if (e) {
          const t = Tn[e];
          n = ln.clone(t.uniforms);
        } else n = t.uniforms;
        return n;
      },
      acquireProgram: function (e, n) {
        let i;
        for (let t = 0, e = s.length; t < e; t++) {
          const e = s[t];
          if (e.cacheKey === n) {
            (i = e), ++i.usedTimes;
            break;
          }
        }
        return void 0 === i && ((i = new ir(t, n, e, r)), s.push(i)), i;
      },
      releaseProgram: function (t) {
        if (0 == --t.usedTimes) {
          const e = s.indexOf(t);
          (s[e] = s[s.length - 1]), s.pop(), t.destroy();
        }
      },
      programs: s,
    };
  }
  function or() {
    let t = new WeakMap();
    return {
      get: function (e) {
        let n = t.get(e);
        return void 0 === n && ((n = {}), t.set(e, n)), n;
      },
      remove: function (e) {
        t.delete(e);
      },
      update: function (e, n, i) {
        t.get(e)[n] = i;
      },
      dispose: function () {
        t = new WeakMap();
      },
    };
  }
  function sr(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.program !== e.program
      ? t.program.id - e.program.id
      : t.material.id !== e.material.id
      ? t.material.id - e.material.id
      : t.z !== e.z
      ? t.z - e.z
      : t.id - e.id;
  }
  function ar(t, e) {
    return t.groupOrder !== e.groupOrder
      ? t.groupOrder - e.groupOrder
      : t.renderOrder !== e.renderOrder
      ? t.renderOrder - e.renderOrder
      : t.z !== e.z
      ? e.z - t.z
      : t.id - e.id;
  }
  function cr(t) {
    const e = [];
    let n = 0;
    const i = [],
      r = [],
      o = { id: -1 };
    function s(i, r, s, a, c, l) {
      let h = e[n];
      const u = t.get(s);
      return (
        void 0 === h
          ? ((h = {
              id: i.id,
              object: i,
              geometry: r,
              material: s,
              program: u.program || o,
              groupOrder: a,
              renderOrder: i.renderOrder,
              z: c,
              group: l,
            }),
            (e[n] = h))
          : ((h.id = i.id),
            (h.object = i),
            (h.geometry = r),
            (h.material = s),
            (h.program = u.program || o),
            (h.groupOrder = a),
            (h.renderOrder = i.renderOrder),
            (h.z = c),
            (h.group = l)),
        n++,
        h
      );
    }
    return {
      opaque: i,
      transparent: r,
      init: function () {
        (n = 0), (i.length = 0), (r.length = 0);
      },
      push: function (t, e, n, o, a, c) {
        const l = s(t, e, n, o, a, c);
        (!0 === n.transparent ? r : i).push(l);
      },
      unshift: function (t, e, n, o, a, c) {
        const l = s(t, e, n, o, a, c);
        (!0 === n.transparent ? r : i).unshift(l);
      },
      finish: function () {
        for (let t = n, i = e.length; t < i; t++) {
          const n = e[t];
          if (null === n.id) break;
          (n.id = null),
            (n.object = null),
            (n.geometry = null),
            (n.material = null),
            (n.program = null),
            (n.group = null);
        }
      },
      sort: function (t, e) {
        i.length > 1 && i.sort(t || sr), r.length > 1 && r.sort(e || ar);
      },
    };
  }
  function lr(t) {
    let e = new WeakMap();
    return {
      get: function (n, i) {
        const r = e.get(n);
        let o;
        return (
          void 0 === r
            ? ((o = new cr(t)), e.set(n, new WeakMap()), e.get(n).set(i, o))
            : ((o = r.get(i)), void 0 === o && ((o = new cr(t)), r.set(i, o))),
          o
        );
      },
      dispose: function () {
        e = new WeakMap();
      },
    };
  }
  function hr() {
    const t = {};
    return {
      get: function (e) {
        if (void 0 !== t[e.id]) return t[e.id];
        let n;
        switch (e.type) {
          case "DirectionalLight":
            n = { direction: new G(), color: new le() };
            break;
          case "SpotLight":
            n = {
              position: new G(),
              direction: new G(),
              color: new le(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
            };
            break;
          case "PointLight":
            n = { position: new G(), color: new le(), distance: 0, decay: 0 };
            break;
          case "HemisphereLight":
            n = {
              direction: new G(),
              skyColor: new le(),
              groundColor: new le(),
            };
            break;
          case "RectAreaLight":
            n = {
              color: new le(),
              position: new G(),
              halfWidth: new G(),
              halfHeight: new G(),
            };
        }
        return (t[e.id] = n), n;
      },
    };
  }
  let ur = 0;
  function dr(t, e) {
    return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0);
  }
  function pr(t, e) {
    const n = new hr(),
      i = (function () {
        const t = {};
        return {
          get: function (e) {
            if (void 0 !== t[e.id]) return t[e.id];
            let n;
            switch (e.type) {
              case "DirectionalLight":
              case "SpotLight":
                n = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new P(),
                };
                break;
              case "PointLight":
                n = {
                  shadowBias: 0,
                  shadowNormalBias: 0,
                  shadowRadius: 1,
                  shadowMapSize: new P(),
                  shadowCameraNear: 1,
                  shadowCameraFar: 1e3,
                };
            }
            return (t[e.id] = n), n;
          },
        };
      })(),
      r = {
        version: 0,
        hash: {
          directionalLength: -1,
          pointLength: -1,
          spotLength: -1,
          rectAreaLength: -1,
          hemiLength: -1,
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotShadow: [],
        spotShadowMap: [],
        spotShadowMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
      };
    for (let t = 0; t < 9; t++) r.probe.push(new G());
    const o = new G(),
      s = new gt(),
      a = new gt();
    return {
      setup: function (o) {
        let s = 0,
          a = 0,
          c = 0;
        for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0);
        let l = 0,
          h = 0,
          u = 0,
          d = 0,
          p = 0,
          f = 0,
          m = 0,
          g = 0;
        o.sort(dr);
        for (let t = 0, e = o.length; t < e; t++) {
          const e = o[t],
            v = e.color,
            y = e.intensity,
            _ = e.distance,
            x = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
          if (e.isAmbientLight) (s += v.r * y), (a += v.g * y), (c += v.b * y);
          else if (e.isLightProbe)
            for (let t = 0; t < 9; t++)
              r.probe[t].addScaledVector(e.sh.coefficients[t], y);
          else if (e.isDirectionalLight) {
            const t = n.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity), e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.directionalShadow[l] = n),
                (r.directionalShadowMap[l] = x),
                (r.directionalShadowMatrix[l] = e.shadow.matrix),
                f++;
            }
            (r.directional[l] = t), l++;
          } else if (e.isSpotLight) {
            const t = n.get(e);
            if (
              (t.position.setFromMatrixPosition(e.matrixWorld),
              t.color.copy(v).multiplyScalar(y),
              (t.distance = _),
              (t.coneCos = Math.cos(e.angle)),
              (t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra))),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (r.spotShadow[u] = n),
                (r.spotShadowMap[u] = x),
                (r.spotShadowMatrix[u] = e.shadow.matrix),
                g++;
            }
            (r.spot[u] = t), u++;
          } else if (e.isRectAreaLight) {
            const t = n.get(e);
            t.color.copy(v).multiplyScalar(y),
              t.halfWidth.set(0.5 * e.width, 0, 0),
              t.halfHeight.set(0, 0.5 * e.height, 0),
              (r.rectArea[d] = t),
              d++;
          } else if (e.isPointLight) {
            const t = n.get(e);
            if (
              (t.color.copy(e.color).multiplyScalar(e.intensity),
              (t.distance = e.distance),
              (t.decay = e.decay),
              e.castShadow)
            ) {
              const t = e.shadow,
                n = i.get(e);
              (n.shadowBias = t.bias),
                (n.shadowNormalBias = t.normalBias),
                (n.shadowRadius = t.radius),
                (n.shadowMapSize = t.mapSize),
                (n.shadowCameraNear = t.camera.near),
                (n.shadowCameraFar = t.camera.far),
                (r.pointShadow[h] = n),
                (r.pointShadowMap[h] = x),
                (r.pointShadowMatrix[h] = e.shadow.matrix),
                m++;
            }
            (r.point[h] = t), h++;
          } else if (e.isHemisphereLight) {
            const t = n.get(e);
            t.skyColor.copy(e.color).multiplyScalar(y),
              t.groundColor.copy(e.groundColor).multiplyScalar(y),
              (r.hemi[p] = t),
              p++;
          }
        }
        d > 0 &&
          (e.isWebGL2 || !0 === t.has("OES_texture_float_linear")
            ? ((r.rectAreaLTC1 = En.LTC_FLOAT_1),
              (r.rectAreaLTC2 = En.LTC_FLOAT_2))
            : !0 === t.has("OES_texture_half_float_linear")
            ? ((r.rectAreaLTC1 = En.LTC_HALF_1),
              (r.rectAreaLTC2 = En.LTC_HALF_2))
            : console.error(
                "THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions."
              )),
          (r.ambient[0] = s),
          (r.ambient[1] = a),
          (r.ambient[2] = c);
        const v = r.hash;
        (v.directionalLength === l &&
          v.pointLength === h &&
          v.spotLength === u &&
          v.rectAreaLength === d &&
          v.hemiLength === p &&
          v.numDirectionalShadows === f &&
          v.numPointShadows === m &&
          v.numSpotShadows === g) ||
          ((r.directional.length = l),
          (r.spot.length = u),
          (r.rectArea.length = d),
          (r.point.length = h),
          (r.hemi.length = p),
          (r.directionalShadow.length = f),
          (r.directionalShadowMap.length = f),
          (r.pointShadow.length = m),
          (r.pointShadowMap.length = m),
          (r.spotShadow.length = g),
          (r.spotShadowMap.length = g),
          (r.directionalShadowMatrix.length = f),
          (r.pointShadowMatrix.length = m),
          (r.spotShadowMatrix.length = g),
          (v.directionalLength = l),
          (v.pointLength = h),
          (v.spotLength = u),
          (v.rectAreaLength = d),
          (v.hemiLength = p),
          (v.numDirectionalShadows = f),
          (v.numPointShadows = m),
          (v.numSpotShadows = g),
          (r.version = ur++));
      },
      setupView: function (t, e) {
        let n = 0,
          i = 0,
          c = 0,
          l = 0,
          h = 0;
        const u = e.matrixWorldInverse;
        for (let e = 0, d = t.length; e < d; e++) {
          const d = t[e];
          if (d.isDirectionalLight) {
            const t = r.directional[n];
            t.direction.setFromMatrixPosition(d.matrixWorld),
              o.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(o),
              t.direction.transformDirection(u),
              n++;
          } else if (d.isSpotLight) {
            const t = r.spot[c];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              t.direction.setFromMatrixPosition(d.matrixWorld),
              o.setFromMatrixPosition(d.target.matrixWorld),
              t.direction.sub(o),
              t.direction.transformDirection(u),
              c++;
          } else if (d.isRectAreaLight) {
            const t = r.rectArea[l];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              a.identity(),
              s.copy(d.matrixWorld),
              s.premultiply(u),
              a.extractRotation(s),
              t.halfWidth.set(0.5 * d.width, 0, 0),
              t.halfHeight.set(0, 0.5 * d.height, 0),
              t.halfWidth.applyMatrix4(a),
              t.halfHeight.applyMatrix4(a),
              l++;
          } else if (d.isPointLight) {
            const t = r.point[i];
            t.position.setFromMatrixPosition(d.matrixWorld),
              t.position.applyMatrix4(u),
              i++;
          } else if (d.isHemisphereLight) {
            const t = r.hemi[h];
            t.direction.setFromMatrixPosition(d.matrixWorld),
              t.direction.transformDirection(u),
              t.direction.normalize(),
              h++;
          }
        }
      },
      state: r,
    };
  }
  function fr(t, e) {
    const n = new pr(t, e),
      i = [],
      r = [];
    return {
      init: function () {
        (i.length = 0), (r.length = 0);
      },
      state: { lightsArray: i, shadowsArray: r, lights: n },
      setupLights: function () {
        n.setup(i);
      },
      setupLightsView: function (t) {
        n.setupView(i, t);
      },
      pushLight: function (t) {
        i.push(t);
      },
      pushShadow: function (t) {
        r.push(t);
      },
    };
  }
  function mr(t, e) {
    let n = new WeakMap();
    return {
      get: function (i, r = 0) {
        let o;
        return (
          !1 === n.has(i)
            ? ((o = new fr(t, e)), n.set(i, []), n.get(i).push(o))
            : r >= n.get(i).length
            ? ((o = new fr(t, e)), n.get(i).push(o))
            : (o = n.get(i)[r]),
          o
        );
      },
      dispose: function () {
        n = new WeakMap();
      },
    };
  }
  function gr(t) {
    de.call(this),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = 3200),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      this.setValues(t);
  }
  function vr(t) {
    de.call(this),
      (this.type = "MeshDistanceMaterial"),
      (this.referencePosition = new G()),
      (this.nearDistance = 1),
      (this.farDistance = 1e3),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.fog = !1),
      this.setValues(t);
  }
  function yr(t, e, n) {
    let i = new xn();
    const s = new P(),
      a = new P(),
      c = new U(),
      l = [],
      h = [],
      u = {},
      d = { 0: 1, 1: 0, 2: 2 },
      f = new hn({
        defines: { SAMPLE_RATE: 2 / 8, HALF_SAMPLE_RATE: 1 / 8 },
        uniforms: {
          shadow_pass: { value: null },
          resolution: { value: new P() },
          radius: { value: 4 },
        },
        vertexShader:
          "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
        fragmentShader:
          "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}",
      }),
      m = f.clone();
    m.defines.HORIZONTAL_PASS = 1;
    const g = new Ue();
    g.setAttribute(
      "position",
      new ge(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3)
    );
    const v = new nn(g, f),
      y = this;
    function _(n, i) {
      const r = e.update(v);
      (f.uniforms.shadow_pass.value = n.map.texture),
        (f.uniforms.resolution.value = n.mapSize),
        (f.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.mapPass),
        t.clear(),
        t.renderBufferDirect(i, null, r, f, v, null),
        (m.uniforms.shadow_pass.value = n.mapPass.texture),
        (m.uniforms.resolution.value = n.mapSize),
        (m.uniforms.radius.value = n.radius),
        t.setRenderTarget(n.map),
        t.clear(),
        t.renderBufferDirect(i, null, r, m, v, null);
    }
    function x(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2);
      let r = l[i];
      return (
        void 0 === r &&
          ((r = new gr({ depthPacking: 3201, morphTargets: t, skinning: e })),
          (l[i] = r)),
        r
      );
    }
    function b(t, e, n) {
      const i = (t << 0) | (e << 1) | (n << 2);
      let r = h[i];
      return (
        void 0 === r &&
          ((r = new vr({ morphTargets: t, skinning: e })), (h[i] = r)),
        r
      );
    }
    function w(e, n, i, r, o, s, a) {
      let c = null,
        l = x,
        h = e.customDepthMaterial;
      if (
        (!0 === r.isPointLight && ((l = b), (h = e.customDistanceMaterial)),
        void 0 === h)
      ) {
        let t = !1;
        !0 === i.morphTargets &&
          (t =
            n.morphAttributes &&
            n.morphAttributes.position &&
            n.morphAttributes.position.length > 0);
        let r = !1;
        !0 === e.isSkinnedMesh &&
          (!0 === i.skinning
            ? (r = !0)
            : console.warn(
                "THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",
                e
              )),
          (c = l(t, r, !0 === e.isInstancedMesh));
      } else c = h;
      if (
        t.localClippingEnabled &&
        !0 === i.clipShadows &&
        0 !== i.clippingPlanes.length
      ) {
        const t = c.uuid,
          e = i.uuid;
        let n = u[t];
        void 0 === n && ((n = {}), (u[t] = n));
        let r = n[e];
        void 0 === r && ((r = c.clone()), (n[e] = r)), (c = r);
      }
      return (
        (c.visible = i.visible),
        (c.wireframe = i.wireframe),
        (c.side =
          3 === a
            ? null !== i.shadowSide
              ? i.shadowSide
              : i.side
            : null !== i.shadowSide
            ? i.shadowSide
            : d[i.side]),
        (c.clipShadows = i.clipShadows),
        (c.clippingPlanes = i.clippingPlanes),
        (c.clipIntersection = i.clipIntersection),
        (c.wireframeLinewidth = i.wireframeLinewidth),
        (c.linewidth = i.linewidth),
        !0 === r.isPointLight &&
          !0 === c.isMeshDistanceMaterial &&
          (c.referencePosition.setFromMatrixPosition(r.matrixWorld),
          (c.nearDistance = o),
          (c.farDistance = s)),
        c
      );
    }
    function M(n, r, o, s, a) {
      if (!1 === n.visible) return;
      if (
        n.layers.test(r.layers) &&
        (n.isMesh || n.isLine || n.isPoints) &&
        (n.castShadow || (n.receiveShadow && 3 === a)) &&
        (!n.frustumCulled || i.intersectsObject(n))
      ) {
        n.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse, n.matrixWorld);
        const i = e.update(n),
          r = n.material;
        if (Array.isArray(r)) {
          const e = i.groups;
          for (let c = 0, l = e.length; c < l; c++) {
            const l = e[c],
              h = r[l.materialIndex];
            if (h && h.visible) {
              const e = w(n, i, h, s, o.near, o.far, a);
              t.renderBufferDirect(o, null, i, e, n, l);
            }
          }
        } else if (r.visible) {
          const e = w(n, i, r, s, o.near, o.far, a);
          t.renderBufferDirect(o, null, i, e, n, null);
        }
      }
      const c = n.children;
      for (let t = 0, e = c.length; t < e; t++) M(c[t], r, o, s, a);
    }
    (this.enabled = !1),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this.type = 1),
      (this.render = function (e, l, h) {
        if (!1 === y.enabled) return;
        if (!1 === y.autoUpdate && !1 === y.needsUpdate) return;
        if (0 === e.length) return;
        const u = t.getRenderTarget(),
          d = t.getActiveCubeFace(),
          f = t.getActiveMipmapLevel(),
          m = t.state;
        m.setBlending(0),
          m.buffers.color.setClear(1, 1, 1, 1),
          m.buffers.depth.setTest(!0),
          m.setScissorTest(!1);
        for (let u = 0, d = e.length; u < d; u++) {
          const d = e[u],
            f = d.shadow;
          if (void 0 === f) {
            console.warn("THREE.WebGLShadowMap:", d, "has no shadow.");
            continue;
          }
          if (!1 === f.autoUpdate && !1 === f.needsUpdate) continue;
          s.copy(f.mapSize);
          const g = f.getFrameExtents();
          if (
            (s.multiply(g),
            a.copy(f.mapSize),
            (s.x > n || s.y > n) &&
              (s.x > n &&
                ((a.x = Math.floor(n / g.x)),
                (s.x = a.x * g.x),
                (f.mapSize.x = a.x)),
              s.y > n &&
                ((a.y = Math.floor(n / g.y)),
                (s.y = a.y * g.y),
                (f.mapSize.y = a.y))),
            null === f.map && !f.isPointLightShadow && 3 === this.type)
          ) {
            const t = { minFilter: o, magFilter: o, format: p };
            (f.map = new H(s.x, s.y, t)),
              (f.map.texture.name = d.name + ".shadowMap"),
              (f.mapPass = new H(s.x, s.y, t)),
              f.camera.updateProjectionMatrix();
          }
          if (null === f.map) {
            const t = { minFilter: r, magFilter: r, format: p };
            (f.map = new H(s.x, s.y, t)),
              (f.map.texture.name = d.name + ".shadowMap"),
              f.camera.updateProjectionMatrix();
          }
          t.setRenderTarget(f.map), t.clear();
          const v = f.getViewportCount();
          for (let t = 0; t < v; t++) {
            const e = f.getViewport(t);
            c.set(a.x * e.x, a.y * e.y, a.x * e.z, a.y * e.w),
              m.viewport(c),
              f.updateMatrices(d, t),
              (i = f.getFrustum()),
              M(l, h, f.camera, d, this.type);
          }
          f.isPointLightShadow || 3 !== this.type || _(f, h),
            (f.needsUpdate = !1);
        }
        (y.needsUpdate = !1), t.setRenderTarget(u, d, f);
      });
  }
  function _r(e, n, i) {
    const r = i.isWebGL2,
      o = new (function () {
        let t = !1;
        const n = new U();
        let i = null;
        const r = new U(0, 0, 0, 0);
        return {
          setMask: function (n) {
            i === n || t || (e.colorMask(n, n, n, n), (i = n));
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t, i, o, s, a) {
            !0 === a && ((t *= s), (i *= s), (o *= s)),
              n.set(t, i, o, s),
              !1 === r.equals(n) && (e.clearColor(t, i, o, s), r.copy(n));
          },
          reset: function () {
            (t = !1), (i = null), r.set(-1, 0, 0, 0);
          },
        };
      })(),
      s = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null;
        return {
          setTest: function (t) {
            t ? I(2929) : D(2929);
          },
          setMask: function (i) {
            n === i || t || (e.depthMask(i), (n = i));
          },
          setFunc: function (t) {
            if (i !== t) {
              if (t)
                switch (t) {
                  case 0:
                    e.depthFunc(512);
                    break;
                  case 1:
                    e.depthFunc(519);
                    break;
                  case 2:
                    e.depthFunc(513);
                    break;
                  case 3:
                    e.depthFunc(515);
                    break;
                  case 4:
                    e.depthFunc(514);
                    break;
                  case 5:
                    e.depthFunc(518);
                    break;
                  case 6:
                    e.depthFunc(516);
                    break;
                  case 7:
                    e.depthFunc(517);
                    break;
                  default:
                    e.depthFunc(515);
                }
              else e.depthFunc(515);
              i = t;
            }
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t) {
            r !== t && (e.clearDepth(t), (r = t));
          },
          reset: function () {
            (t = !1), (n = null), (i = null), (r = null);
          },
        };
      })(),
      a = new (function () {
        let t = !1,
          n = null,
          i = null,
          r = null,
          o = null,
          s = null,
          a = null,
          c = null,
          l = null;
        return {
          setTest: function (e) {
            t || (e ? I(2960) : D(2960));
          },
          setMask: function (i) {
            n === i || t || (e.stencilMask(i), (n = i));
          },
          setFunc: function (t, n, s) {
            (i === t && r === n && o === s) ||
              (e.stencilFunc(t, n, s), (i = t), (r = n), (o = s));
          },
          setOp: function (t, n, i) {
            (s === t && a === n && c === i) ||
              (e.stencilOp(t, n, i), (s = t), (a = n), (c = i));
          },
          setLocked: function (e) {
            t = e;
          },
          setClear: function (t) {
            l !== t && (e.clearStencil(t), (l = t));
          },
          reset: function () {
            (t = !1),
              (n = null),
              (i = null),
              (r = null),
              (o = null),
              (s = null),
              (a = null),
              (c = null),
              (l = null);
          },
        };
      })();
    let c = {},
      l = null,
      h = null,
      u = null,
      d = null,
      p = null,
      f = null,
      m = null,
      g = null,
      v = null,
      y = !1,
      _ = null,
      x = null,
      b = null,
      w = null,
      M = null;
    const S = e.getParameter(35661);
    let E = !1,
      T = 0;
    const A = e.getParameter(7938);
    -1 !== A.indexOf("WebGL")
      ? ((T = parseFloat(/^WebGL (\d)/.exec(A)[1])), (E = T >= 1))
      : -1 !== A.indexOf("OpenGL ES") &&
        ((T = parseFloat(/^OpenGL ES (\d)/.exec(A)[1])), (E = T >= 2));
    let L = null,
      C = {};
    const R = new U(),
      P = new U();
    function O(t, n, i) {
      const r = new Uint8Array(4),
        o = e.createTexture();
      e.bindTexture(t, o),
        e.texParameteri(t, 10241, 9728),
        e.texParameteri(t, 10240, 9728);
      for (let t = 0; t < i; t++)
        e.texImage2D(n + t, 0, 6408, 1, 1, 0, 6408, 5121, r);
      return o;
    }
    const N = {};
    function I(t) {
      !0 !== c[t] && (e.enable(t), (c[t] = !0));
    }
    function D(t) {
      !1 !== c[t] && (e.disable(t), (c[t] = !1));
    }
    (N[3553] = O(3553, 3553, 1)),
      (N[34067] = O(34067, 34069, 6)),
      o.setClear(0, 0, 0, 1),
      s.setClear(1),
      a.setClear(0),
      I(2929),
      s.setFunc(3),
      F(!1),
      k(1),
      I(2884),
      H(0);
    const z = { [t]: 32774, 101: 32778, 102: 32779 };
    if (r) (z[103] = 32775), (z[104] = 32776);
    else {
      const t = n.get("EXT_blend_minmax");
      null !== t && ((z[103] = t.MIN_EXT), (z[104] = t.MAX_EXT));
    }
    const B = {
      200: 0,
      201: 1,
      202: 768,
      204: 770,
      210: 776,
      208: 774,
      206: 772,
      203: 769,
      205: 771,
      209: 775,
      207: 773,
    };
    function H(n, i, r, o, s, a, c, l) {
      if (0 !== n) {
        if ((h || (I(3042), (h = !0)), 5 === n))
          (s = s || i),
            (a = a || r),
            (c = c || o),
            (i === d && s === m) ||
              (e.blendEquationSeparate(z[i], z[s]), (d = i), (m = s)),
            (r === p && o === f && a === g && c === v) ||
              (e.blendFuncSeparate(B[r], B[o], B[a], B[c]),
              (p = r),
              (f = o),
              (g = a),
              (v = c)),
            (u = n),
            (y = null);
        else if (n !== u || l !== y) {
          if (
            ((d === t && m === t) || (e.blendEquation(32774), (d = t), (m = t)),
            l)
          )
            switch (n) {
              case 1:
                e.blendFuncSeparate(1, 771, 1, 771);
                break;
              case 2:
                e.blendFunc(1, 1);
                break;
              case 3:
                e.blendFuncSeparate(0, 0, 769, 771);
                break;
              case 4:
                e.blendFuncSeparate(0, 768, 0, 770);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", n);
            }
          else
            switch (n) {
              case 1:
                e.blendFuncSeparate(770, 771, 1, 771);
                break;
              case 2:
                e.blendFunc(770, 1);
                break;
              case 3:
                e.blendFunc(0, 769);
                break;
              case 4:
                e.blendFunc(0, 768);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", n);
            }
          (p = null), (f = null), (g = null), (v = null), (u = n), (y = l);
        }
      } else h && (D(3042), (h = !1));
    }
    function F(t) {
      _ !== t && (t ? e.frontFace(2304) : e.frontFace(2305), (_ = t));
    }
    function k(t) {
      0 !== t
        ? (I(2884),
          t !== x &&
            (1 === t
              ? e.cullFace(1029)
              : 2 === t
              ? e.cullFace(1028)
              : e.cullFace(1032)))
        : D(2884),
        (x = t);
    }
    function G(t, n, i) {
      t
        ? (I(32823),
          (w === n && M === i) || (e.polygonOffset(n, i), (w = n), (M = i)))
        : D(32823);
    }
    function V(t) {
      void 0 === t && (t = 33984 + S - 1),
        L !== t && (e.activeTexture(t), (L = t));
    }
    return {
      buffers: { color: o, depth: s, stencil: a },
      enable: I,
      disable: D,
      useProgram: function (t) {
        return l !== t && (e.useProgram(t), (l = t), !0);
      },
      setBlending: H,
      setMaterial: function (t, e) {
        2 === t.side ? D(2884) : I(2884);
        let n = 1 === t.side;
        e && (n = !n),
          F(n),
          1 === t.blending && !1 === t.transparent
            ? H(0)
            : H(
                t.blending,
                t.blendEquation,
                t.blendSrc,
                t.blendDst,
                t.blendEquationAlpha,
                t.blendSrcAlpha,
                t.blendDstAlpha,
                t.premultipliedAlpha
              ),
          s.setFunc(t.depthFunc),
          s.setTest(t.depthTest),
          s.setMask(t.depthWrite),
          o.setMask(t.colorWrite);
        const i = t.stencilWrite;
        a.setTest(i),
          i &&
            (a.setMask(t.stencilWriteMask),
            a.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask),
            a.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)),
          G(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits);
      },
      setFlipSided: F,
      setCullFace: k,
      setLineWidth: function (t) {
        t !== b && (E && e.lineWidth(t), (b = t));
      },
      setPolygonOffset: G,
      setScissorTest: function (t) {
        t ? I(3089) : D(3089);
      },
      activeTexture: V,
      bindTexture: function (t, n) {
        null === L && V();
        let i = C[L];
        void 0 === i && ((i = { type: void 0, texture: void 0 }), (C[L] = i)),
          (i.type === t && i.texture === n) ||
            (e.bindTexture(t, n || N[t]), (i.type = t), (i.texture = n));
      },
      unbindTexture: function () {
        const t = C[L];
        void 0 !== t &&
          void 0 !== t.type &&
          (e.bindTexture(t.type, null),
          (t.type = void 0),
          (t.texture = void 0));
      },
      compressedTexImage2D: function () {
        try {
          e.compressedTexImage2D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage2D: function () {
        try {
          e.texImage2D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      texImage3D: function () {
        try {
          e.texImage3D.apply(e, arguments);
        } catch (t) {
          console.error("THREE.WebGLState:", t);
        }
      },
      scissor: function (t) {
        !1 === R.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), R.copy(t));
      },
      viewport: function (t) {
        !1 === P.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), P.copy(t));
      },
      reset: function () {
        (c = {}),
          (L = null),
          (C = {}),
          (l = null),
          (h = null),
          (u = null),
          (d = null),
          (p = null),
          (f = null),
          (m = null),
          (g = null),
          (v = null),
          (y = !1),
          (_ = null),
          (x = null),
          (b = null),
          (w = null),
          (M = null),
          o.reset(),
          s.reset(),
          a.reset();
      },
    };
  }
  function xr(t, g, v, y, _, x, b) {
    const w = _.isWebGL2,
      M = _.maxTextures,
      S = _.maxCubemapSize,
      E = _.maxTextureSize,
      T = _.maxSamples,
      A = new WeakMap();
    let L,
      C = !1;
    try {
      C =
        "undefined" != typeof OffscreenCanvas &&
        null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (t) {}
    function P(t, e) {
      return C
        ? new OffscreenCanvas(t, e)
        : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    }
    function O(t, e, n, i) {
      let r = 1;
      if (
        ((t.width > i || t.height > i) && (r = i / Math.max(t.width, t.height)),
        r < 1 || !0 === e)
      ) {
        if (
          ("undefined" != typeof HTMLImageElement &&
            t instanceof HTMLImageElement) ||
          ("undefined" != typeof HTMLCanvasElement &&
            t instanceof HTMLCanvasElement) ||
          ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
        ) {
          const i = e ? R.floorPowerOfTwo : Math.floor,
            o = i(r * t.width),
            s = i(r * t.height);
          void 0 === L && (L = P(o, s));
          const a = n ? P(o, s) : L;
          return (
            (a.width = o),
            (a.height = s),
            a.getContext("2d").drawImage(t, 0, 0, o, s),
            console.warn(
              "THREE.WebGLRenderer: Texture has been resized from (" +
                t.width +
                "x" +
                t.height +
                ") to (" +
                o +
                "x" +
                s +
                ")."
            ),
            a
          );
        }
        return (
          "data" in t &&
            console.warn(
              "THREE.WebGLRenderer: Image in DataTexture is too big (" +
                t.width +
                "x" +
                t.height +
                ")."
            ),
          t
        );
      }
      return t;
    }
    function N(t) {
      return R.isPowerOfTwo(t.width) && R.isPowerOfTwo(t.height);
    }
    function I(t, e) {
      return t.generateMipmaps && e && t.minFilter !== r && t.minFilter !== o;
    }
    function D(e, n, i, r) {
      t.generateMipmap(e),
        (y.get(n).__maxMipLevel = Math.log(Math.max(i, r)) * Math.LOG2E);
    }
    function z(e, n, i) {
      if (!1 === w) return n;
      if (null !== e) {
        if (void 0 !== t[e]) return t[e];
        console.warn(
          "THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
            e +
            "'"
        );
      }
      let r = n;
      return (
        6403 === n &&
          (5126 === i && (r = 33326),
          5131 === i && (r = 33325),
          5121 === i && (r = 33321)),
        6407 === n &&
          (5126 === i && (r = 34837),
          5131 === i && (r = 34843),
          5121 === i && (r = 32849)),
        6408 === n &&
          (5126 === i && (r = 34836),
          5131 === i && (r = 34842),
          5121 === i && (r = 32856)),
        (33325 !== r && 33326 !== r && 34842 !== r && 34836 !== r) ||
          g.get("EXT_color_buffer_float"),
        r
      );
    }
    function B(t) {
      return t === r || 1004 === t || 1005 === t ? 9728 : 9729;
    }
    function U(e) {
      const n = e.target;
      n.removeEventListener("dispose", U),
        (function (e) {
          const n = y.get(e);
          void 0 !== n.__webglInit &&
            (t.deleteTexture(n.__webglTexture), y.remove(e));
        })(n),
        n.isVideoTexture && A.delete(n),
        b.memory.textures--;
    }
    function H(e) {
      const n = e.target;
      n.removeEventListener("dispose", H),
        (function (e) {
          const n = y.get(e),
            i = y.get(e.texture);
          if (e) {
            if (
              (void 0 !== i.__webglTexture && t.deleteTexture(i.__webglTexture),
              e.depthTexture && e.depthTexture.dispose(),
              e.isWebGLCubeRenderTarget)
            )
              for (let e = 0; e < 6; e++)
                t.deleteFramebuffer(n.__webglFramebuffer[e]),
                  n.__webglDepthbuffer &&
                    t.deleteRenderbuffer(n.__webglDepthbuffer[e]);
            else
              t.deleteFramebuffer(n.__webglFramebuffer),
                n.__webglDepthbuffer &&
                  t.deleteRenderbuffer(n.__webglDepthbuffer),
                n.__webglMultisampledFramebuffer &&
                  t.deleteFramebuffer(n.__webglMultisampledFramebuffer),
                n.__webglColorRenderbuffer &&
                  t.deleteRenderbuffer(n.__webglColorRenderbuffer),
                n.__webglDepthRenderbuffer &&
                  t.deleteRenderbuffer(n.__webglDepthRenderbuffer);
            y.remove(e.texture), y.remove(e);
          }
        })(n),
        b.memory.textures--;
    }
    let F = 0;
    function k(t, e) {
      const n = y.get(t);
      if (
        (t.isVideoTexture &&
          (function (t) {
            const e = b.render.frame;
            A.get(t) !== e && (A.set(t, e), t.update());
          })(t),
        t.version > 0 && n.__version !== t.version)
      ) {
        const i = t.image;
        if (void 0 === i)
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but image is undefined"
          );
        else {
          if (!1 !== i.complete) return void X(n, t, e);
          console.warn(
            "THREE.WebGLRenderer: Texture marked for update but image is incomplete"
          );
        }
      }
      v.activeTexture(33984 + e), v.bindTexture(3553, n.__webglTexture);
    }
    function G(e, n) {
      const i = y.get(e);
      e.version > 0 && i.__version !== e.version
        ? (function (e, n, i) {
            if (6 !== n.image.length) return;
            q(e, n),
              v.activeTexture(33984 + i),
              v.bindTexture(34067, e.__webglTexture),
              t.pixelStorei(37440, n.flipY);
            const r =
                n && (n.isCompressedTexture || n.image[0].isCompressedTexture),
              o = n.image[0] && n.image[0].isDataTexture,
              s = [];
            for (let t = 0; t < 6; t++)
              s[t] =
                r || o
                  ? o
                    ? n.image[t].image
                    : n.image[t]
                  : O(n.image[t], !1, !0, S);
            const a = s[0],
              c = N(a) || w,
              l = x.convert(n.format),
              h = x.convert(n.type),
              u = z(n.internalFormat, l, h);
            let f;
            if ((W(34067, n, c), r)) {
              for (let t = 0; t < 6; t++) {
                f = s[t].mipmaps;
                for (let e = 0; e < f.length; e++) {
                  const i = f[e];
                  n.format !== p && n.format !== d
                    ? null !== l
                      ? v.compressedTexImage2D(
                          34069 + t,
                          e,
                          u,
                          i.width,
                          i.height,
                          0,
                          i.data
                        )
                      : console.warn(
                          "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"
                        )
                    : v.texImage2D(
                        34069 + t,
                        e,
                        u,
                        i.width,
                        i.height,
                        0,
                        l,
                        h,
                        i.data
                      );
                }
              }
              e.__maxMipLevel = f.length - 1;
            } else {
              f = n.mipmaps;
              for (let t = 0; t < 6; t++)
                if (o) {
                  v.texImage2D(
                    34069 + t,
                    0,
                    u,
                    s[t].width,
                    s[t].height,
                    0,
                    l,
                    h,
                    s[t].data
                  );
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e].image[t].image;
                    v.texImage2D(
                      34069 + t,
                      e + 1,
                      u,
                      n.width,
                      n.height,
                      0,
                      l,
                      h,
                      n.data
                    );
                  }
                } else {
                  v.texImage2D(34069 + t, 0, u, l, h, s[t]);
                  for (let e = 0; e < f.length; e++) {
                    const n = f[e];
                    v.texImage2D(34069 + t, e + 1, u, l, h, n.image[t]);
                  }
                }
              e.__maxMipLevel = f.length;
            }
            I(n, c) && D(34067, n, a.width, a.height),
              (e.__version = n.version),
              n.onUpdate && n.onUpdate(n);
          })(i, e, n)
        : (v.activeTexture(33984 + n), v.bindTexture(34067, i.__webglTexture));
    }
    const V = { [e]: 10497, [n]: 33071, [i]: 33648 },
      j = {
        [r]: 9728,
        1004: 9984,
        1005: 9986,
        [o]: 9729,
        1007: 9985,
        [s]: 9987,
      };
    function W(e, i, s) {
      s
        ? (t.texParameteri(e, 10242, V[i.wrapS]),
          t.texParameteri(e, 10243, V[i.wrapT]),
          (32879 !== e && 35866 !== e) || t.texParameteri(e, 32882, V[i.wrapR]),
          t.texParameteri(e, 10240, j[i.magFilter]),
          t.texParameteri(e, 10241, j[i.minFilter]))
        : (t.texParameteri(e, 10242, 33071),
          t.texParameteri(e, 10243, 33071),
          (32879 !== e && 35866 !== e) || t.texParameteri(e, 32882, 33071),
          (i.wrapS === n && i.wrapT === n) ||
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."
            ),
          t.texParameteri(e, 10240, B(i.magFilter)),
          t.texParameteri(e, 10241, B(i.minFilter)),
          i.minFilter !== r &&
            i.minFilter !== o &&
            console.warn(
              "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."
            ));
      const a = g.get("EXT_texture_filter_anisotropic");
      if (a) {
        if (i.type === l && null === g.get("OES_texture_float_linear")) return;
        if (
          i.type === h &&
          null === (w || g.get("OES_texture_half_float_linear"))
        )
          return;
        (i.anisotropy > 1 || y.get(i).__currentAnisotropy) &&
          (t.texParameterf(
            e,
            a.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(i.anisotropy, _.getMaxAnisotropy())
          ),
          (y.get(i).__currentAnisotropy = i.anisotropy));
      }
    }
    function q(e, n) {
      void 0 === e.__webglInit &&
        ((e.__webglInit = !0),
        n.addEventListener("dispose", U),
        (e.__webglTexture = t.createTexture()),
        b.memory.textures++);
    }
    function X(e, i, s) {
      let h = 3553;
      i.isDataTexture2DArray && (h = 35866),
        i.isDataTexture3D && (h = 32879),
        q(e, i),
        v.activeTexture(33984 + s),
        v.bindTexture(h, e.__webglTexture),
        t.pixelStorei(37440, i.flipY),
        t.pixelStorei(37441, i.premultiplyAlpha),
        t.pixelStorei(3317, i.unpackAlignment);
      const g =
          (function (t) {
            return (
              !w &&
              (t.wrapS !== n ||
                t.wrapT !== n ||
                (t.minFilter !== r && t.minFilter !== o))
            );
          })(i) && !1 === N(i.image),
        y = O(i.image, g, !1, E),
        _ = N(y) || w,
        b = x.convert(i.format);
      let M,
        S = x.convert(i.type),
        T = z(i.internalFormat, b, S);
      W(h, i, _);
      const A = i.mipmaps;
      if (i.isDepthTexture)
        (T = 6402),
          w
            ? (T =
                i.type === l
                  ? 36012
                  : i.type === c
                  ? 33190
                  : i.type === u
                  ? 35056
                  : 33189)
            : i.type === l &&
              console.error(
                "WebGLRenderer: Floating point depth texture requires WebGL2."
              ),
          i.format === f &&
            6402 === T &&
            i.type !== a &&
            i.type !== c &&
            (console.warn(
              "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."
            ),
            (i.type = a),
            (S = x.convert(i.type))),
          i.format === m &&
            6402 === T &&
            ((T = 34041),
            i.type !== u &&
              (console.warn(
                "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."
              ),
              (i.type = u),
              (S = x.convert(i.type)))),
          v.texImage2D(3553, 0, T, y.width, y.height, 0, b, S, null);
      else if (i.isDataTexture)
        if (A.length > 0 && _) {
          for (let t = 0, e = A.length; t < e; t++)
            (M = A[t]),
              v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data);
          (i.generateMipmaps = !1), (e.__maxMipLevel = A.length - 1);
        } else
          v.texImage2D(3553, 0, T, y.width, y.height, 0, b, S, y.data),
            (e.__maxMipLevel = 0);
      else if (i.isCompressedTexture) {
        for (let t = 0, e = A.length; t < e; t++)
          (M = A[t]),
            i.format !== p && i.format !== d
              ? null !== b
                ? v.compressedTexImage2D(
                    3553,
                    t,
                    T,
                    M.width,
                    M.height,
                    0,
                    M.data
                  )
                : console.warn(
                    "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"
                  )
              : v.texImage2D(3553, t, T, M.width, M.height, 0, b, S, M.data);
        e.__maxMipLevel = A.length - 1;
      } else if (i.isDataTexture2DArray)
        v.texImage3D(35866, 0, T, y.width, y.height, y.depth, 0, b, S, y.data),
          (e.__maxMipLevel = 0);
      else if (i.isDataTexture3D)
        v.texImage3D(32879, 0, T, y.width, y.height, y.depth, 0, b, S, y.data),
          (e.__maxMipLevel = 0);
      else if (A.length > 0 && _) {
        for (let t = 0, e = A.length; t < e; t++)
          (M = A[t]), v.texImage2D(3553, t, T, b, S, M);
        (i.generateMipmaps = !1), (e.__maxMipLevel = A.length - 1);
      } else v.texImage2D(3553, 0, T, b, S, y), (e.__maxMipLevel = 0);
      I(i, _) && D(h, i, y.width, y.height),
        (e.__version = i.version),
        i.onUpdate && i.onUpdate(i);
    }
    function Y(e, n, i, r) {
      const o = x.convert(n.texture.format),
        s = x.convert(n.texture.type),
        a = z(n.texture.internalFormat, o, s);
      v.texImage2D(r, 0, a, n.width, n.height, 0, o, s, null),
        t.bindFramebuffer(36160, e),
        t.framebufferTexture2D(36160, i, r, y.get(n.texture).__webglTexture, 0),
        t.bindFramebuffer(36160, null);
    }
    function Z(e, n, i) {
      if ((t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer)) {
        let r = 33189;
        if (i) {
          const e = n.depthTexture;
          e &&
            e.isDepthTexture &&
            (e.type === l ? (r = 36012) : e.type === c && (r = 33190));
          const i = J(n);
          t.renderbufferStorageMultisample(36161, i, r, n.width, n.height);
        } else t.renderbufferStorage(36161, r, n.width, n.height);
        t.framebufferRenderbuffer(36160, 36096, 36161, e);
      } else if (n.depthBuffer && n.stencilBuffer) {
        if (i) {
          const e = J(n);
          t.renderbufferStorageMultisample(36161, e, 35056, n.width, n.height);
        } else t.renderbufferStorage(36161, 34041, n.width, n.height);
        t.framebufferRenderbuffer(36160, 33306, 36161, e);
      } else {
        const e = x.convert(n.texture.format),
          r = x.convert(n.texture.type),
          o = z(n.texture.internalFormat, e, r);
        if (i) {
          const e = J(n);
          t.renderbufferStorageMultisample(36161, e, o, n.width, n.height);
        } else t.renderbufferStorage(36161, o, n.width, n.height);
      }
      t.bindRenderbuffer(36161, null);
    }
    function J(t) {
      return w && t.isWebGLMultisampleRenderTarget ? Math.min(T, t.samples) : 0;
    }
    let Q = !1,
      K = !1;
    (this.allocateTextureUnit = function () {
      const t = F;
      return (
        t >= M &&
          console.warn(
            "THREE.WebGLTextures: Trying to use " +
              t +
              " texture units while this GPU supports only " +
              M
          ),
        (F += 1),
        t
      );
    }),
      (this.resetTextureUnits = function () {
        F = 0;
      }),
      (this.setTexture2D = k),
      (this.setTexture2DArray = function (t, e) {
        const n = y.get(t);
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e),
            v.bindTexture(35866, n.__webglTexture));
      }),
      (this.setTexture3D = function (t, e) {
        const n = y.get(t);
        t.version > 0 && n.__version !== t.version
          ? X(n, t, e)
          : (v.activeTexture(33984 + e),
            v.bindTexture(32879, n.__webglTexture));
      }),
      (this.setTextureCube = G),
      (this.setupRenderTarget = function (e) {
        const n = y.get(e),
          i = y.get(e.texture);
        e.addEventListener("dispose", H),
          (i.__webglTexture = t.createTexture()),
          b.memory.textures++;
        const r = !0 === e.isWebGLCubeRenderTarget,
          o = !0 === e.isWebGLMultisampleRenderTarget,
          s = N(e) || w;
        if (
          (!w ||
            e.texture.format !== d ||
            (e.texture.type !== l && e.texture.type !== h) ||
            ((e.texture.format = p),
            console.warn(
              "THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead."
            )),
          r)
        ) {
          n.__webglFramebuffer = [];
          for (let e = 0; e < 6; e++)
            n.__webglFramebuffer[e] = t.createFramebuffer();
        } else if (((n.__webglFramebuffer = t.createFramebuffer()), o))
          if (w) {
            (n.__webglMultisampledFramebuffer = t.createFramebuffer()),
              (n.__webglColorRenderbuffer = t.createRenderbuffer()),
              t.bindRenderbuffer(36161, n.__webglColorRenderbuffer);
            const i = x.convert(e.texture.format),
              r = x.convert(e.texture.type),
              o = z(e.texture.internalFormat, i, r),
              s = J(e);
            t.renderbufferStorageMultisample(36161, s, o, e.width, e.height),
              t.bindFramebuffer(36160, n.__webglMultisampledFramebuffer),
              t.framebufferRenderbuffer(
                36160,
                36064,
                36161,
                n.__webglColorRenderbuffer
              ),
              t.bindRenderbuffer(36161, null),
              e.depthBuffer &&
                ((n.__webglDepthRenderbuffer = t.createRenderbuffer()),
                Z(n.__webglDepthRenderbuffer, e, !0)),
              t.bindFramebuffer(36160, null);
          } else
            console.warn(
              "THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
            );
        if (r) {
          v.bindTexture(34067, i.__webglTexture), W(34067, e.texture, s);
          for (let t = 0; t < 6; t++)
            Y(n.__webglFramebuffer[t], e, 36064, 34069 + t);
          I(e.texture, s) && D(34067, e.texture, e.width, e.height),
            v.bindTexture(34067, null);
        } else
          v.bindTexture(3553, i.__webglTexture),
            W(3553, e.texture, s),
            Y(n.__webglFramebuffer, e, 36064, 3553),
            I(e.texture, s) && D(3553, e.texture, e.width, e.height),
            v.bindTexture(3553, null);
        e.depthBuffer &&
          (function (e) {
            const n = y.get(e),
              i = !0 === e.isWebGLCubeRenderTarget;
            if (e.depthTexture) {
              if (i)
                throw new Error(
                  "target.depthTexture not supported in Cube render targets"
                );
              !(function (e, n) {
                if (n && n.isWebGLCubeRenderTarget)
                  throw new Error(
                    "Depth Texture with cube render targets is not supported"
                  );
                if (
                  (t.bindFramebuffer(36160, e),
                  !n.depthTexture || !n.depthTexture.isDepthTexture)
                )
                  throw new Error(
                    "renderTarget.depthTexture must be an instance of THREE.DepthTexture"
                  );
                (y.get(n.depthTexture).__webglTexture &&
                  n.depthTexture.image.width === n.width &&
                  n.depthTexture.image.height === n.height) ||
                  ((n.depthTexture.image.width = n.width),
                  (n.depthTexture.image.height = n.height),
                  (n.depthTexture.needsUpdate = !0)),
                  k(n.depthTexture, 0);
                const i = y.get(n.depthTexture).__webglTexture;
                if (n.depthTexture.format === f)
                  t.framebufferTexture2D(36160, 36096, 3553, i, 0);
                else {
                  if (n.depthTexture.format !== m)
                    throw new Error("Unknown depthTexture format");
                  t.framebufferTexture2D(36160, 33306, 3553, i, 0);
                }
              })(n.__webglFramebuffer, e);
            } else if (i) {
              n.__webglDepthbuffer = [];
              for (let i = 0; i < 6; i++)
                t.bindFramebuffer(36160, n.__webglFramebuffer[i]),
                  (n.__webglDepthbuffer[i] = t.createRenderbuffer()),
                  Z(n.__webglDepthbuffer[i], e, !1);
            } else
              t.bindFramebuffer(36160, n.__webglFramebuffer),
                (n.__webglDepthbuffer = t.createRenderbuffer()),
                Z(n.__webglDepthbuffer, e, !1);
            t.bindFramebuffer(36160, null);
          })(e);
      }),
      (this.updateRenderTargetMipmap = function (t) {
        const e = t.texture;
        if (I(e, N(t) || w)) {
          const n = t.isWebGLCubeRenderTarget ? 34067 : 3553,
            i = y.get(e).__webglTexture;
          v.bindTexture(n, i),
            D(n, e, t.width, t.height),
            v.bindTexture(n, null);
        }
      }),
      (this.updateMultisampleRenderTarget = function (e) {
        if (e.isWebGLMultisampleRenderTarget)
          if (w) {
            const n = y.get(e);
            t.bindFramebuffer(36008, n.__webglMultisampledFramebuffer),
              t.bindFramebuffer(36009, n.__webglFramebuffer);
            const i = e.width,
              r = e.height;
            let o = 16384;
            e.depthBuffer && (o |= 256),
              e.stencilBuffer && (o |= 1024),
              t.blitFramebuffer(0, 0, i, r, 0, 0, i, r, o, 9728),
              t.bindFramebuffer(36160, n.__webglMultisampledFramebuffer);
          } else
            console.warn(
              "THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2."
            );
      }),
      (this.safeSetTexture2D = function (t, e) {
        t &&
          t.isWebGLRenderTarget &&
          (!1 === Q &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."
            ),
            (Q = !0)),
          (t = t.texture)),
          k(t, e);
      }),
      (this.safeSetTextureCube = function (t, e) {
        t &&
          t.isWebGLCubeRenderTarget &&
          (!1 === K &&
            (console.warn(
              "THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."
            ),
            (K = !0)),
          (t = t.texture)),
          G(t, e);
      });
  }
  function br(t, e, n) {
    const i = n.isWebGL2;
    return {
      convert: function (t) {
        let n;
        if (1009 === t) return 5121;
        if (1017 === t) return 32819;
        if (1018 === t) return 32820;
        if (1019 === t) return 33635;
        if (1010 === t) return 5120;
        if (1011 === t) return 5122;
        if (t === a) return 5123;
        if (1013 === t) return 5124;
        if (t === c) return 5125;
        if (t === l) return 5126;
        if (t === h)
          return i
            ? 5131
            : ((n = e.get("OES_texture_half_float")),
              null !== n ? n.HALF_FLOAT_OES : null);
        if (1021 === t) return 6406;
        if (t === d) return 6407;
        if (t === p) return 6408;
        if (1024 === t) return 6409;
        if (1025 === t) return 6410;
        if (t === f) return 6402;
        if (t === m) return 34041;
        if (1028 === t) return 6403;
        if (1029 === t) return 36244;
        if (1030 === t) return 33319;
        if (1031 === t) return 33320;
        if (1032 === t) return 36248;
        if (1033 === t) return 36249;
        if (33776 === t || 33777 === t || 33778 === t || 33779 === t) {
          if (((n = e.get("WEBGL_compressed_texture_s3tc")), null === n))
            return null;
          if (33776 === t) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (33777 === t) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (33778 === t) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (33779 === t) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
        if (35840 === t || 35841 === t || 35842 === t || 35843 === t) {
          if (((n = e.get("WEBGL_compressed_texture_pvrtc")), null === n))
            return null;
          if (35840 === t) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (35841 === t) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (35842 === t) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (35843 === t) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
        if (36196 === t)
          return (
            (n = e.get("WEBGL_compressed_texture_etc1")),
            null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null
          );
        if (
          (37492 === t || 37496 === t) &&
          ((n = e.get("WEBGL_compressed_texture_etc")), null !== n)
        ) {
          if (37492 === t) return n.COMPRESSED_RGB8_ETC2;
          if (37496 === t) return n.COMPRESSED_RGBA8_ETC2_EAC;
        }
        return 37808 === t ||
          37809 === t ||
          37810 === t ||
          37811 === t ||
          37812 === t ||
          37813 === t ||
          37814 === t ||
          37815 === t ||
          37816 === t ||
          37817 === t ||
          37818 === t ||
          37819 === t ||
          37820 === t ||
          37821 === t ||
          37840 === t ||
          37841 === t ||
          37842 === t ||
          37843 === t ||
          37844 === t ||
          37845 === t ||
          37846 === t ||
          37847 === t ||
          37848 === t ||
          37849 === t ||
          37850 === t ||
          37851 === t ||
          37852 === t ||
          37853 === t
          ? ((n = e.get("WEBGL_compressed_texture_astc")),
            null !== n ? t : null)
          : 36492 === t
          ? ((n = e.get("EXT_texture_compression_bptc")), null !== n ? t : null)
          : t === u
          ? i
            ? 34042
            : ((n = e.get("WEBGL_depth_texture")),
              null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null)
          : void 0;
      },
    };
  }
  function wr(t = []) {
    dn.call(this), (this.cameras = t);
  }
  function Mr() {
    kt.call(this), (this.type = "Group");
  }
  function Sr() {
    (this._targetRay = null), (this._grip = null), (this._hand = null);
  }
  function Er(t, e) {
    const n = this;
    let i = null,
      r = 1,
      o = null,
      s = "local-floor",
      a = null;
    const c = [],
      l = new Map(),
      h = new dn();
    h.layers.enable(1), (h.viewport = new U());
    const u = new dn();
    u.layers.enable(2), (u.viewport = new U());
    const d = [h, u],
      p = new wr();
    p.layers.enable(1), p.layers.enable(2);
    let f = null,
      m = null;
    function g(t) {
      const e = l.get(t.inputSource);
      e && e.dispatchEvent({ type: t.type, data: t.inputSource });
    }
    function v() {
      l.forEach(function (t, e) {
        t.disconnect(e);
      }),
        l.clear(),
        t.setFramebuffer(null),
        t.setRenderTarget(t.getRenderTarget()),
        S.stop(),
        (n.isPresenting = !1),
        n.dispatchEvent({ type: "sessionend" });
    }
    function y(t) {
      (o = t),
        S.setContext(i),
        S.start(),
        (n.isPresenting = !0),
        n.dispatchEvent({ type: "sessionstart" });
    }
    function _(t) {
      const e = i.inputSources;
      for (let t = 0; t < c.length; t++) l.set(e[t], c[t]);
      for (let e = 0; e < t.removed.length; e++) {
        const n = t.removed[e],
          i = l.get(n);
        i && (i.dispatchEvent({ type: "disconnected", data: n }), l.delete(n));
      }
      for (let e = 0; e < t.added.length; e++) {
        const n = t.added[e],
          i = l.get(n);
        i && i.dispatchEvent({ type: "connected", data: n });
      }
    }
    (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function (t) {
        let e = c[t];
        return (
          void 0 === e && ((e = new Sr()), (c[t] = e)), e.getTargetRaySpace()
        );
      }),
      (this.getControllerGrip = function (t) {
        let e = c[t];
        return void 0 === e && ((e = new Sr()), (c[t] = e)), e.getGripSpace();
      }),
      (this.getHand = function (t) {
        let e = c[t];
        return void 0 === e && ((e = new Sr()), (c[t] = e)), e.getHandSpace();
      }),
      (this.setFramebufferScaleFactor = function (t) {
        (r = t),
          !0 === n.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change framebuffer scale while presenting."
            );
      }),
      (this.setReferenceSpaceType = function (t) {
        (s = t),
          !0 === n.isPresenting &&
            console.warn(
              "THREE.WebXRManager: Cannot change reference space type while presenting."
            );
      }),
      (this.getReferenceSpace = function () {
        return o;
      }),
      (this.getSession = function () {
        return i;
      }),
      (this.setSession = function (t) {
        if (((i = t), null !== i)) {
          i.addEventListener("select", g),
            i.addEventListener("selectstart", g),
            i.addEventListener("selectend", g),
            i.addEventListener("squeeze", g),
            i.addEventListener("squeezestart", g),
            i.addEventListener("squeezeend", g),
            i.addEventListener("end", v);
          const t = e.getContextAttributes();
          !0 !== t.xrCompatible && e.makeXRCompatible();
          const n = {
              antialias: t.antialias,
              alpha: t.alpha,
              depth: t.depth,
              stencil: t.stencil,
              framebufferScaleFactor: r,
            },
            o = new XRWebGLLayer(i, e, n);
          i.updateRenderState({ baseLayer: o }),
            i.requestReferenceSpace(s).then(y),
            i.addEventListener("inputsourceschange", _);
        }
      });
    const x = new G(),
      b = new G();
    function w(t, e) {
      null === e
        ? t.matrixWorld.copy(t.matrix)
        : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix),
        t.matrixWorldInverse.copy(t.matrixWorld).invert();
    }
    this.getCamera = function (t) {
      (p.near = u.near = h.near = t.near),
        (p.far = u.far = h.far = t.far),
        (f === p.near && m === p.far) ||
          (i.updateRenderState({ depthNear: p.near, depthFar: p.far }),
          (f = p.near),
          (m = p.far));
      const e = t.parent,
        n = p.cameras;
      w(p, e);
      for (let t = 0; t < n.length; t++) w(n[t], e);
      t.matrixWorld.copy(p.matrixWorld);
      const r = t.children;
      for (let t = 0, e = r.length; t < e; t++) r[t].updateMatrixWorld(!0);
      return (
        2 === n.length
          ? (function (t, e, n) {
              x.setFromMatrixPosition(e.matrixWorld),
                b.setFromMatrixPosition(n.matrixWorld);
              const i = x.distanceTo(b),
                r = e.projectionMatrix.elements,
                o = n.projectionMatrix.elements,
                s = r[14] / (r[10] - 1),
                a = r[14] / (r[10] + 1),
                c = (r[9] + 1) / r[5],
                l = (r[9] - 1) / r[5],
                h = (r[8] - 1) / r[0],
                u = (o[8] + 1) / o[0],
                d = s * h,
                p = s * u,
                f = i / (-h + u),
                m = f * -h;
              e.matrixWorld.decompose(t.position, t.quaternion, t.scale),
                t.translateX(m),
                t.translateZ(f),
                t.matrixWorld.compose(t.position, t.quaternion, t.scale),
                t.matrixWorldInverse.copy(t.matrixWorld).invert();
              const g = s + f,
                v = a + f,
                y = d - m,
                _ = p + (i - m),
                w = ((c * a) / v) * g,
                M = ((l * a) / v) * g;
              t.projectionMatrix.makePerspective(y, _, w, M, g, v);
            })(p, h, u)
          : p.projectionMatrix.copy(h.projectionMatrix),
        p
      );
    };
    let M = null;
    const S = new bn();
    S.setAnimationLoop(function (e, n) {
      if (((a = n.getViewerPose(o)), null !== a)) {
        const e = a.views,
          n = i.renderState.baseLayer;
        t.setFramebuffer(n.framebuffer);
        let r = !1;
        e.length !== p.cameras.length && ((p.cameras.length = 0), (r = !0));
        for (let t = 0; t < e.length; t++) {
          const i = e[t],
            o = n.getViewport(i),
            s = d[t];
          s.matrix.fromArray(i.transform.matrix),
            s.projectionMatrix.fromArray(i.projectionMatrix),
            s.viewport.set(o.x, o.y, o.width, o.height),
            0 === t && p.matrix.copy(s.matrix),
            !0 === r && p.cameras.push(s);
        }
      }
      const r = i.inputSources;
      for (let t = 0; t < c.length; t++) {
        const e = c[t],
          i = r[t];
        e.update(i, n, o);
      }
      M && M(e, n);
    }),
      (this.setAnimationLoop = function (t) {
        M = t;
      }),
      (this.dispose = function () {});
  }
  function Tr(t) {
    function e(e, n) {
      (e.opacity.value = n.opacity),
        n.color && e.diffuse.value.copy(n.color),
        n.emissive &&
          e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),
        n.map && (e.map.value = n.map),
        n.alphaMap && (e.alphaMap.value = n.alphaMap),
        n.specularMap && (e.specularMap.value = n.specularMap);
      const i = t.get(n).envMap;
      if (i) {
        (e.envMap.value = i),
          (e.flipEnvMap.value = i.isCubeTexture && i._needsFlipEnvMap ? -1 : 1),
          (e.reflectivity.value = n.reflectivity),
          (e.refractionRatio.value = n.refractionRatio);
        const r = t.get(i).__maxMipLevel;
        void 0 !== r && (e.maxMipLevel.value = r);
      }
      let r, o;
      n.lightMap &&
        ((e.lightMap.value = n.lightMap),
        (e.lightMapIntensity.value = n.lightMapIntensity)),
        n.aoMap &&
          ((e.aoMap.value = n.aoMap),
          (e.aoMapIntensity.value = n.aoMapIntensity)),
        n.map
          ? (r = n.map)
          : n.specularMap
          ? (r = n.specularMap)
          : n.displacementMap
          ? (r = n.displacementMap)
          : n.normalMap
          ? (r = n.normalMap)
          : n.bumpMap
          ? (r = n.bumpMap)
          : n.roughnessMap
          ? (r = n.roughnessMap)
          : n.metalnessMap
          ? (r = n.metalnessMap)
          : n.alphaMap
          ? (r = n.alphaMap)
          : n.emissiveMap
          ? (r = n.emissiveMap)
          : n.clearcoatMap
          ? (r = n.clearcoatMap)
          : n.clearcoatNormalMap
          ? (r = n.clearcoatNormalMap)
          : n.clearcoatRoughnessMap && (r = n.clearcoatRoughnessMap),
        void 0 !== r &&
          (r.isWebGLRenderTarget && (r = r.texture),
          !0 === r.matrixAutoUpdate && r.updateMatrix(),
          e.uvTransform.value.copy(r.matrix)),
        n.aoMap ? (o = n.aoMap) : n.lightMap && (o = n.lightMap),
        void 0 !== o &&
          (o.isWebGLRenderTarget && (o = o.texture),
          !0 === o.matrixAutoUpdate && o.updateMatrix(),
          e.uv2Transform.value.copy(o.matrix));
    }
    function n(e, n) {
      (e.roughness.value = n.roughness),
        (e.metalness.value = n.metalness),
        n.roughnessMap && (e.roughnessMap.value = n.roughnessMap),
        n.metalnessMap && (e.metalnessMap.value = n.metalnessMap),
        n.emissiveMap && (e.emissiveMap.value = n.emissiveMap),
        n.bumpMap &&
          ((e.bumpMap.value = n.bumpMap),
          (e.bumpScale.value = n.bumpScale),
          1 === n.side && (e.bumpScale.value *= -1)),
        n.normalMap &&
          ((e.normalMap.value = n.normalMap),
          e.normalScale.value.copy(n.normalScale),
          1 === n.side && e.normalScale.value.negate()),
        n.displacementMap &&
          ((e.displacementMap.value = n.displacementMap),
          (e.displacementScale.value = n.displacementScale),
          (e.displacementBias.value = n.displacementBias)),
        t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity);
    }
    return {
      refreshFogUniforms: function (t, e) {
        t.fogColor.value.copy(e.color),
          e.isFog
            ? ((t.fogNear.value = e.near), (t.fogFar.value = e.far))
            : e.isFogExp2 && (t.fogDensity.value = e.density);
      },
      refreshMaterialUniforms: function (t, i, r, o) {
        i.isMeshBasicMaterial
          ? e(t, i)
          : i.isMeshLambertMaterial
          ? (e(t, i),
            (function (t, e) {
              e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
            })(t, i))
          : i.isMeshToonMaterial
          ? (e(t, i),
            (function (t, e) {
              e.gradientMap && (t.gradientMap.value = e.gradientMap),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshPhongMaterial
          ? (e(t, i),
            (function (t, e) {
              t.specular.value.copy(e.specular),
                (t.shininess.value = Math.max(e.shininess, 1e-4)),
                e.emissiveMap && (t.emissiveMap.value = e.emissiveMap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshStandardMaterial
          ? (e(t, i),
            i.isMeshPhysicalMaterial
              ? (function (t, e) {
                  n(t, e),
                    (t.reflectivity.value = e.reflectivity),
                    (t.clearcoat.value = e.clearcoat),
                    (t.clearcoatRoughness.value = e.clearcoatRoughness),
                    e.sheen && t.sheen.value.copy(e.sheen),
                    e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap),
                    e.clearcoatRoughnessMap &&
                      (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap),
                    e.clearcoatNormalMap &&
                      (t.clearcoatNormalScale.value.copy(
                        e.clearcoatNormalScale
                      ),
                      (t.clearcoatNormalMap.value = e.clearcoatNormalMap),
                      1 === e.side && t.clearcoatNormalScale.value.negate()),
                    (t.transmission.value = e.transmission),
                    e.transmissionMap &&
                      (t.transmissionMap.value = e.transmissionMap);
                })(t, i)
              : n(t, i))
          : i.isMeshMatcapMaterial
          ? (e(t, i),
            (function (t, e) {
              e.matcap && (t.matcap.value = e.matcap),
                e.bumpMap &&
                  ((t.bumpMap.value = e.bumpMap),
                  (t.bumpScale.value = e.bumpScale),
                  1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshDepthMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isMeshDistanceMaterial
          ? (e(t, i),
            (function (t, e) {
              e.displacementMap &&
                ((t.displacementMap.value = e.displacementMap),
                (t.displacementScale.value = e.displacementScale),
                (t.displacementBias.value = e.displacementBias)),
                t.referencePosition.value.copy(e.referencePosition),
                (t.nearDistance.value = e.nearDistance),
                (t.farDistance.value = e.farDistance);
            })(t, i))
          : i.isMeshNormalMaterial
          ? (e(t, i),
            (function (t, e) {
              e.bumpMap &&
                ((t.bumpMap.value = e.bumpMap),
                (t.bumpScale.value = e.bumpScale),
                1 === e.side && (t.bumpScale.value *= -1)),
                e.normalMap &&
                  ((t.normalMap.value = e.normalMap),
                  t.normalScale.value.copy(e.normalScale),
                  1 === e.side && t.normalScale.value.negate()),
                e.displacementMap &&
                  ((t.displacementMap.value = e.displacementMap),
                  (t.displacementScale.value = e.displacementScale),
                  (t.displacementBias.value = e.displacementBias));
            })(t, i))
          : i.isLineBasicMaterial
          ? ((function (t, e) {
              t.diffuse.value.copy(e.color), (t.opacity.value = e.opacity);
            })(t, i),
            i.isLineDashedMaterial &&
              (function (t, e) {
                (t.dashSize.value = e.dashSize),
                  (t.totalSize.value = e.dashSize + e.gapSize),
                  (t.scale.value = e.scale);
              })(t, i))
          : i.isPointsMaterial
          ? (function (t, e, n, i) {
              let r;
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.size.value = e.size * n),
                (t.scale.value = 0.5 * i),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (r = e.map) : e.alphaMap && (r = e.alphaMap),
                void 0 !== r &&
                  (!0 === r.matrixAutoUpdate && r.updateMatrix(),
                  t.uvTransform.value.copy(r.matrix));
            })(t, i, r, o)
          : i.isSpriteMaterial
          ? (function (t, e) {
              let n;
              t.diffuse.value.copy(e.color),
                (t.opacity.value = e.opacity),
                (t.rotation.value = e.rotation),
                e.map && (t.map.value = e.map),
                e.alphaMap && (t.alphaMap.value = e.alphaMap),
                e.map ? (n = e.map) : e.alphaMap && (n = e.alphaMap),
                void 0 !== n &&
                  (!0 === n.matrixAutoUpdate && n.updateMatrix(),
                  t.uvTransform.value.copy(n.matrix));
            })(t, i)
          : i.isShadowMaterial
          ? (t.color.value.copy(i.color), (t.opacity.value = i.opacity))
          : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
      },
    };
  }
  function Ar(t) {
    const e =
        void 0 !== (t = t || {}).canvas
          ? t.canvas
          : (function () {
              const t = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "canvas"
              );
              return (t.style.display = "block"), t;
            })(),
      n = void 0 !== t.context ? t.context : null,
      i = void 0 !== t.alpha && t.alpha,
      r = void 0 === t.depth || t.depth,
      o = void 0 === t.stencil || t.stencil,
      s = void 0 !== t.antialias && t.antialias,
      a = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
      c = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
      u = void 0 !== t.powerPreference ? t.powerPreference : "default",
      d =
        void 0 !== t.failIfMajorPerformanceCaveat &&
        t.failIfMajorPerformanceCaveat;
    let f = null,
      m = null;
    const g = [];
    (this.domElement = e),
      (this.debug = { checkShaderErrors: !0 }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.gammaFactor = 2),
      (this.outputEncoding = w),
      (this.physicallyCorrectLights = !1),
      (this.toneMapping = 0),
      (this.toneMappingExposure = 1),
      (this.maxMorphTargets = 8),
      (this.maxMorphNormals = 4);
    const v = this;
    let y = !1,
      _ = null,
      x = 0,
      b = 0,
      M = null,
      S = null,
      E = -1,
      T = null;
    const A = new U(),
      L = new U();
    let C = null,
      O = e.width,
      N = e.height,
      I = 1,
      D = null,
      z = null;
    const B = new U(0, 0, O, N),
      H = new U(0, 0, O, N);
    let F = !1;
    const k = new xn();
    let V = !1,
      j = !1;
    const W = new gt(),
      q = new G(),
      X = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    function Y() {
      return null === M ? I : 1;
    }
    let Z,
      J,
      Q,
      K,
      $,
      tt,
      et,
      nt,
      it,
      rt,
      ot,
      st,
      at,
      ct,
      lt,
      ht,
      ut,
      dt,
      pt,
      ft,
      mt,
      vt = n;
    function yt(t, n) {
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
          o = e.getContext(r, n);
        if (null !== o) return o;
      }
      return null;
    }
    try {
      const t = {
        alpha: i,
        depth: r,
        stencil: o,
        antialias: s,
        premultipliedAlpha: a,
        preserveDrawingBuffer: c,
        powerPreference: u,
        failIfMajorPerformanceCaveat: d,
      };
      if (
        (e.addEventListener("webglcontextlost", wt, !1),
        e.addEventListener("webglcontextrestored", Mt, !1),
        null === vt)
      ) {
        const e = ["webgl2", "webgl", "experimental-webgl"];
        if (
          (!0 === v.isWebGL1Renderer && e.shift(), (vt = yt(e, t)), null === vt)
        )
          throw yt(e)
            ? new Error(
                "Error creating WebGL context with your selected attributes."
              )
            : new Error("Error creating WebGL context.");
      }
      void 0 === vt.getShaderPrecisionFormat &&
        (vt.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 };
        });
    } catch (t) {
      throw (console.error("THREE.WebGLRenderer: " + t.message), t);
    }
    function _t() {
      (Z = new Nn(vt)),
        (J = new Rn(vt, Z, t)),
        !1 === J.isWebGL2 &&
          (Z.get("WEBGL_depth_texture"),
          Z.get("OES_texture_float"),
          Z.get("OES_texture_half_float"),
          Z.get("OES_texture_half_float_linear"),
          Z.get("OES_standard_derivatives"),
          Z.get("OES_element_index_uint"),
          Z.get("OES_vertex_array_object"),
          Z.get("ANGLE_instanced_arrays")),
        Z.get("OES_texture_float_linear"),
        (ft = new br(vt, Z, J)),
        (Q = new _r(vt, Z, J)),
        Q.scissor(L.copy(H).multiplyScalar(I).floor()),
        Q.viewport(A.copy(B).multiplyScalar(I).floor()),
        (K = new zn(vt)),
        ($ = new or()),
        (tt = new xr(vt, Z, Q, $, J, ft, K)),
        (et = new On(v)),
        (nt = new wn(vt, J)),
        (mt = new Ln(vt, Z, nt, J)),
        (it = new In(vt, nt, K, mt)),
        (rt = new Fn(vt, it, nt, K)),
        (ut = new Hn(vt)),
        (lt = new Pn($)),
        (ot = new rr(v, et, Z, J, mt, lt)),
        (st = new Tr($)),
        (at = new lr($)),
        (ct = new mr(Z, J)),
        (ht = new An(v, et, Q, rt, a)),
        (dt = new Cn(vt, Z, K, J)),
        (pt = new Dn(vt, Z, K, J)),
        (K.programs = ot.programs),
        (v.capabilities = J),
        (v.extensions = Z),
        (v.properties = $),
        (v.renderLists = at),
        (v.state = Q),
        (v.info = K);
    }
    _t();
    const xt = new Er(v, vt);
    this.xr = xt;
    const bt = new yr(v, rt, J.maxTextureSize);
    function wt(t) {
      t.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        (y = !0);
    }
    function Mt() {
      console.log("THREE.WebGLRenderer: Context Restored."), (y = !1), _t();
    }
    function St(t) {
      const e = t.target;
      e.removeEventListener("dispose", St),
        (function (t) {
          Et(t), $.remove(t);
        })(e);
    }
    function Et(t) {
      const e = $.get(t).program;
      void 0 !== e && ot.releaseProgram(e);
    }
    (this.shadowMap = bt),
      (this.getContext = function () {
        return vt;
      }),
      (this.getContextAttributes = function () {
        return vt.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const t = Z.get("WEBGL_lose_context");
        t && t.loseContext();
      }),
      (this.forceContextRestore = function () {
        const t = Z.get("WEBGL_lose_context");
        t && t.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return I;
      }),
      (this.setPixelRatio = function (t) {
        void 0 !== t && ((I = t), this.setSize(O, N, !1));
      }),
      (this.getSize = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getsize() now requires a Vector2 as an argument"
            ),
            (t = new P())),
          t.set(O, N)
        );
      }),
      (this.setSize = function (t, n, i) {
        xt.isPresenting
          ? console.warn(
              "THREE.WebGLRenderer: Can't change size while VR device is presenting."
            )
          : ((O = t),
            (N = n),
            (e.width = Math.floor(t * I)),
            (e.height = Math.floor(n * I)),
            !1 !== i &&
              ((e.style.width = t + "px"), (e.style.height = n + "px")),
            this.setViewport(0, 0, t, n));
      }),
      (this.getDrawingBufferSize = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"
            ),
            (t = new P())),
          t.set(O * I, N * I).floor()
        );
      }),
      (this.setDrawingBufferSize = function (t, n, i) {
        (O = t),
          (N = n),
          (I = i),
          (e.width = Math.floor(t * i)),
          (e.height = Math.floor(n * i)),
          this.setViewport(0, 0, t, n);
      }),
      (this.getCurrentViewport = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"
            ),
            (t = new U())),
          t.copy(A)
        );
      }),
      (this.getViewport = function (t) {
        return t.copy(B);
      }),
      (this.setViewport = function (t, e, n, i) {
        t.isVector4 ? B.set(t.x, t.y, t.z, t.w) : B.set(t, e, n, i),
          Q.viewport(A.copy(B).multiplyScalar(I).floor());
      }),
      (this.getScissor = function (t) {
        return t.copy(H);
      }),
      (this.setScissor = function (t, e, n, i) {
        t.isVector4 ? H.set(t.x, t.y, t.z, t.w) : H.set(t, e, n, i),
          Q.scissor(L.copy(H).multiplyScalar(I).floor());
      }),
      (this.getScissorTest = function () {
        return F;
      }),
      (this.setScissorTest = function (t) {
        Q.setScissorTest((F = t));
      }),
      (this.setOpaqueSort = function (t) {
        D = t;
      }),
      (this.setTransparentSort = function (t) {
        z = t;
      }),
      (this.getClearColor = function (t) {
        return (
          void 0 === t &&
            (console.warn(
              "WebGLRenderer: .getClearColor() now requires a Color as an argument"
            ),
            (t = new le())),
          t.copy(ht.getClearColor())
        );
      }),
      (this.setClearColor = function () {
        ht.setClearColor.apply(ht, arguments);
      }),
      (this.getClearAlpha = function () {
        return ht.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        ht.setClearAlpha.apply(ht, arguments);
      }),
      (this.clear = function (t, e, n) {
        let i = 0;
        (void 0 === t || t) && (i |= 16384),
          (void 0 === e || e) && (i |= 256),
          (void 0 === n || n) && (i |= 1024),
          vt.clear(i);
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        e.removeEventListener("webglcontextlost", wt, !1),
          e.removeEventListener("webglcontextrestored", Mt, !1),
          at.dispose(),
          ct.dispose(),
          $.dispose(),
          et.dispose(),
          rt.dispose(),
          mt.dispose(),
          xt.dispose(),
          At.stop();
      }),
      (this.renderBufferImmediate = function (t, e) {
        mt.initAttributes();
        const n = $.get(t);
        t.hasPositions && !n.position && (n.position = vt.createBuffer()),
          t.hasNormals && !n.normal && (n.normal = vt.createBuffer()),
          t.hasUvs && !n.uv && (n.uv = vt.createBuffer()),
          t.hasColors && !n.color && (n.color = vt.createBuffer());
        const i = e.getAttributes();
        t.hasPositions &&
          (vt.bindBuffer(34962, n.position),
          vt.bufferData(34962, t.positionArray, 35048),
          mt.enableAttribute(i.position),
          vt.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)),
          t.hasNormals &&
            (vt.bindBuffer(34962, n.normal),
            vt.bufferData(34962, t.normalArray, 35048),
            mt.enableAttribute(i.normal),
            vt.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)),
          t.hasUvs &&
            (vt.bindBuffer(34962, n.uv),
            vt.bufferData(34962, t.uvArray, 35048),
            mt.enableAttribute(i.uv),
            vt.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)),
          t.hasColors &&
            (vt.bindBuffer(34962, n.color),
            vt.bufferData(34962, t.colorArray, 35048),
            mt.enableAttribute(i.color),
            vt.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)),
          mt.disableUnusedAttributes(),
          vt.drawArrays(4, 0, t.count),
          (t.count = 0);
      }),
      (this.renderBufferDirect = function (t, e, n, i, r, o) {
        null === e && (e = X);
        const s = r.isMesh && r.matrixWorld.determinant() < 0,
          a = Ot(t, e, i, r);
        Q.setMaterial(i, s);
        let c = n.index;
        const l = n.attributes.position;
        if (null === c) {
          if (void 0 === l || 0 === l.count) return;
        } else if (0 === c.count) return;
        let h,
          u = 1;
        !0 === i.wireframe && ((c = it.getWireframeAttribute(n)), (u = 2)),
          (i.morphTargets || i.morphNormals) && ut.update(r, n, i, a),
          mt.setup(r, i, a, n, c);
        let d = dt;
        null !== c && ((h = nt.get(c)), (d = pt), d.setIndex(h));
        const p = null !== c ? c.count : l.count,
          f = n.drawRange.start * u,
          m = n.drawRange.count * u,
          g = null !== o ? o.start * u : 0,
          v = null !== o ? o.count * u : 1 / 0,
          y = Math.max(f, g),
          _ = Math.min(p, f + m, g + v) - 1,
          x = Math.max(0, _ - y + 1);
        if (0 !== x) {
          if (r.isMesh)
            !0 === i.wireframe
              ? (Q.setLineWidth(i.wireframeLinewidth * Y()), d.setMode(1))
              : d.setMode(4);
          else if (r.isLine) {
            let t = i.linewidth;
            void 0 === t && (t = 1),
              Q.setLineWidth(t * Y()),
              r.isLineSegments
                ? d.setMode(1)
                : r.isLineLoop
                ? d.setMode(2)
                : d.setMode(3);
          } else r.isPoints ? d.setMode(0) : r.isSprite && d.setMode(4);
          if (r.isInstancedMesh) d.renderInstances(y, x, r.count);
          else if (n.isInstancedBufferGeometry) {
            const t = Math.min(n.instanceCount, n._maxInstanceCount);
            d.renderInstances(y, x, t);
          } else d.render(y, x);
        }
      }),
      (this.compile = function (t, e) {
        (m = ct.get(t)),
          m.init(),
          t.traverseVisible(function (t) {
            t.isLight &&
              t.layers.test(e.layers) &&
              (m.pushLight(t), t.castShadow && m.pushShadow(t));
          }),
          m.setupLights();
        const n = new WeakMap();
        t.traverse(function (e) {
          const i = e.material;
          if (i)
            if (Array.isArray(i))
              for (let r = 0; r < i.length; r++) {
                const o = i[r];
                !1 === n.has(o) && (Pt(o, t, e), n.set(o));
              }
            else !1 === n.has(i) && (Pt(i, t, e), n.set(i));
        });
      });
    let Tt = null;
    const At = new bn();
    function Lt(t, e, n, i) {
      if (!1 === t.visible) return;
      if (t.layers.test(e.layers))
        if (t.isGroup) n = t.renderOrder;
        else if (t.isLOD) !0 === t.autoUpdate && t.update(e);
        else if (t.isLight) m.pushLight(t), t.castShadow && m.pushShadow(t);
        else if (t.isSprite) {
          if (!t.frustumCulled || k.intersectsSprite(t)) {
            i && q.setFromMatrixPosition(t.matrixWorld).applyMatrix4(W);
            const e = rt.update(t),
              r = t.material;
            r.visible && f.push(t, e, r, n, q.z, null);
          }
        } else if (t.isImmediateRenderObject)
          i && q.setFromMatrixPosition(t.matrixWorld).applyMatrix4(W),
            f.push(t, null, t.material, n, q.z, null);
        else if (
          (t.isMesh || t.isLine || t.isPoints) &&
          (t.isSkinnedMesh &&
            t.skeleton.frame !== K.render.frame &&
            (t.skeleton.update(), (t.skeleton.frame = K.render.frame)),
          !t.frustumCulled || k.intersectsObject(t))
        ) {
          i && q.setFromMatrixPosition(t.matrixWorld).applyMatrix4(W);
          const e = rt.update(t),
            r = t.material;
          if (Array.isArray(r)) {
            const i = e.groups;
            for (let o = 0, s = i.length; o < s; o++) {
              const s = i[o],
                a = r[s.materialIndex];
              a && a.visible && f.push(t, e, a, n, q.z, s);
            }
          } else r.visible && f.push(t, e, r, n, q.z, null);
        }
      const r = t.children;
      for (let t = 0, o = r.length; t < o; t++) Lt(r[t], e, n, i);
    }
    function Ct(t, e, n) {
      const i = !0 === e.isScene ? e.overrideMaterial : null;
      for (let r = 0, o = t.length; r < o; r++) {
        const o = t[r],
          s = o.object,
          a = o.geometry,
          c = null === i ? o.material : i,
          l = o.group;
        if (n.isArrayCamera) {
          const t = n.cameras;
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            s.layers.test(i.layers) &&
              (Q.viewport(A.copy(i.viewport)),
              m.setupLightsView(i),
              Rt(s, e, i, a, c, l));
          }
        } else Rt(s, e, n, a, c, l);
      }
    }
    function Rt(t, e, n, i, r, o) {
      if (
        (t.onBeforeRender(v, e, n, i, r, o),
        t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld),
        t.normalMatrix.getNormalMatrix(t.modelViewMatrix),
        t.isImmediateRenderObject)
      ) {
        const i = Ot(n, e, r, t);
        Q.setMaterial(r),
          mt.reset(),
          (function (t, e) {
            t.render(function (t) {
              v.renderBufferImmediate(t, e);
            });
          })(t, i);
      } else v.renderBufferDirect(n, e, i, r, t, o);
      t.onAfterRender(v, e, n, i, r, o);
    }
    function Pt(t, e, n) {
      !0 !== e.isScene && (e = X);
      const i = $.get(t),
        r = m.state.lights,
        o = m.state.shadowsArray,
        s = r.state.version,
        a = ot.getParameters(t, r.state, o, e, n),
        c = ot.getProgramCacheKey(a);
      let l = i.program,
        h = !0;
      if (void 0 === l) t.addEventListener("dispose", St);
      else if (l.cacheKey !== c) Et(t);
      else if (i.lightsStateVersion !== s) h = !1;
      else {
        if (void 0 !== a.shaderID) {
          const n = t.isMeshStandardMaterial ? e.environment : null;
          return void (i.envMap = et.get(t.envMap || n));
        }
        h = !1;
      }
      h &&
        ((a.uniforms = ot.getUniforms(t)),
        t.onBeforeCompile(a, v),
        (l = ot.acquireProgram(a, c)),
        (i.program = l),
        (i.uniforms = a.uniforms),
        (i.outputEncoding = a.outputEncoding));
      const u = i.uniforms;
      ((t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping) ||
        ((i.numClippingPlanes = lt.numPlanes),
        (i.numIntersection = lt.numIntersection),
        (u.clippingPlanes = lt.uniform)),
        (i.environment = t.isMeshStandardMaterial ? e.environment : null),
        (i.fog = e.fog),
        (i.envMap = et.get(t.envMap || i.environment)),
        (i.needsLights = (function (t) {
          return (
            t.isMeshLambertMaterial ||
            t.isMeshToonMaterial ||
            t.isMeshPhongMaterial ||
            t.isMeshStandardMaterial ||
            t.isShadowMaterial ||
            (t.isShaderMaterial && !0 === t.lights)
          );
        })(t)),
        (i.lightsStateVersion = s),
        i.needsLights &&
          ((u.ambientLightColor.value = r.state.ambient),
          (u.lightProbe.value = r.state.probe),
          (u.directionalLights.value = r.state.directional),
          (u.directionalLightShadows.value = r.state.directionalShadow),
          (u.spotLights.value = r.state.spot),
          (u.spotLightShadows.value = r.state.spotShadow),
          (u.rectAreaLights.value = r.state.rectArea),
          (u.ltc_1.value = r.state.rectAreaLTC1),
          (u.ltc_2.value = r.state.rectAreaLTC2),
          (u.pointLights.value = r.state.point),
          (u.pointLightShadows.value = r.state.pointShadow),
          (u.hemisphereLights.value = r.state.hemi),
          (u.directionalShadowMap.value = r.state.directionalShadowMap),
          (u.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
          (u.spotShadowMap.value = r.state.spotShadowMap),
          (u.spotShadowMatrix.value = r.state.spotShadowMatrix),
          (u.pointShadowMap.value = r.state.pointShadowMap),
          (u.pointShadowMatrix.value = r.state.pointShadowMatrix));
      const d = i.program.getUniforms(),
        p = Bi.seqWithValue(d.seq, u);
      i.uniformsList = p;
    }
    function Ot(t, e, n, i) {
      !0 !== e.isScene && (e = X), tt.resetTextureUnits();
      const r = e.fog,
        o = n.isMeshStandardMaterial ? e.environment : null,
        s = null === M ? v.outputEncoding : M.texture.encoding,
        a = et.get(n.envMap || o),
        c = $.get(n),
        h = m.state.lights;
      if (!0 === V && (!0 === j || t !== T)) {
        const e = t === T && n.id === E;
        lt.setState(n, t, e);
      }
      n.version === c.__version
        ? (n.fog && c.fog !== r) ||
          c.environment !== o ||
          (c.needsLights && c.lightsStateVersion !== h.state.version)
          ? Pt(n, e, i)
          : void 0 === c.numClippingPlanes ||
            (c.numClippingPlanes === lt.numPlanes &&
              c.numIntersection === lt.numIntersection)
          ? (c.outputEncoding !== s || c.envMap !== a) && Pt(n, e, i)
          : Pt(n, e, i)
        : (Pt(n, e, i), (c.__version = n.version));
      let u = !1,
        d = !1,
        f = !1;
      const g = c.program,
        y = g.getUniforms(),
        _ = c.uniforms;
      if (
        (Q.useProgram(g.program) && ((u = !0), (d = !0), (f = !0)),
        n.id !== E && ((E = n.id), (d = !0)),
        u || T !== t)
      ) {
        if (
          (y.setValue(vt, "projectionMatrix", t.projectionMatrix),
          J.logarithmicDepthBuffer &&
            y.setValue(
              vt,
              "logDepthBufFC",
              2 / (Math.log(t.far + 1) / Math.LN2)
            ),
          T !== t && ((T = t), (d = !0), (f = !0)),
          n.isShaderMaterial ||
            n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshStandardMaterial ||
            n.envMap)
        ) {
          const e = y.map.cameraPosition;
          void 0 !== e &&
            e.setValue(vt, q.setFromMatrixPosition(t.matrixWorld));
        }
        (n.isMeshPhongMaterial ||
          n.isMeshToonMaterial ||
          n.isMeshLambertMaterial ||
          n.isMeshBasicMaterial ||
          n.isMeshStandardMaterial ||
          n.isShaderMaterial) &&
          y.setValue(vt, "isOrthographic", !0 === t.isOrthographicCamera),
          (n.isMeshPhongMaterial ||
            n.isMeshToonMaterial ||
            n.isMeshLambertMaterial ||
            n.isMeshBasicMaterial ||
            n.isMeshStandardMaterial ||
            n.isShaderMaterial ||
            n.isShadowMaterial ||
            n.skinning) &&
            y.setValue(vt, "viewMatrix", t.matrixWorldInverse);
      }
      if (n.skinning) {
        y.setOptional(vt, i, "bindMatrix"),
          y.setOptional(vt, i, "bindMatrixInverse");
        const t = i.skeleton;
        if (t) {
          const e = t.bones;
          if (J.floatVertexTextures) {
            if (null === t.boneTexture) {
              let n = Math.sqrt(4 * e.length);
              (n = R.ceilPowerOfTwo(n)), (n = Math.max(n, 4));
              const i = new Float32Array(n * n * 4);
              i.set(t.boneMatrices);
              const r = new vn(i, n, n, p, l);
              (t.boneMatrices = i),
                (t.boneTexture = r),
                (t.boneTextureSize = n);
            }
            y.setValue(vt, "boneTexture", t.boneTexture, tt),
              y.setValue(vt, "boneTextureSize", t.boneTextureSize);
          } else y.setOptional(vt, t, "boneMatrices");
        }
      }
      var x, b;
      return (
        (d || c.receiveShadow !== i.receiveShadow) &&
          ((c.receiveShadow = i.receiveShadow),
          y.setValue(vt, "receiveShadow", i.receiveShadow)),
        d &&
          (y.setValue(vt, "toneMappingExposure", v.toneMappingExposure),
          c.needsLights &&
            ((b = f),
            ((x = _).ambientLightColor.needsUpdate = b),
            (x.lightProbe.needsUpdate = b),
            (x.directionalLights.needsUpdate = b),
            (x.directionalLightShadows.needsUpdate = b),
            (x.pointLights.needsUpdate = b),
            (x.pointLightShadows.needsUpdate = b),
            (x.spotLights.needsUpdate = b),
            (x.spotLightShadows.needsUpdate = b),
            (x.rectAreaLights.needsUpdate = b),
            (x.hemisphereLights.needsUpdate = b)),
          r && n.fog && st.refreshFogUniforms(_, r),
          st.refreshMaterialUniforms(_, n, I, N),
          Bi.upload(vt, c.uniformsList, _, tt)),
        n.isShaderMaterial &&
          !0 === n.uniformsNeedUpdate &&
          (Bi.upload(vt, c.uniformsList, _, tt), (n.uniformsNeedUpdate = !1)),
        n.isSpriteMaterial && y.setValue(vt, "center", i.center),
        y.setValue(vt, "modelViewMatrix", i.modelViewMatrix),
        y.setValue(vt, "normalMatrix", i.normalMatrix),
        y.setValue(vt, "modelMatrix", i.matrixWorld),
        g
      );
    }
    At.setAnimationLoop(function (t) {
      xt.isPresenting || (Tt && Tt(t));
    }),
      "undefined" != typeof window && At.setContext(window),
      (this.setAnimationLoop = function (t) {
        (Tt = t), xt.setAnimationLoop(t), null === t ? At.stop() : At.start();
      }),
      (this.render = function (t, e) {
        let n, i;
        if (
          (void 0 !== arguments[2] &&
            (console.warn(
              "THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."
            ),
            (n = arguments[2])),
          void 0 !== arguments[3] &&
            (console.warn(
              "THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."
            ),
            (i = arguments[3])),
          void 0 !== e && !0 !== e.isCamera)
        )
          return void console.error(
            "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
          );
        if (!0 === y) return;
        mt.resetDefaultState(),
          (E = -1),
          (T = null),
          !0 === t.autoUpdate && t.updateMatrixWorld(),
          null === e.parent && e.updateMatrixWorld(),
          !0 === xt.enabled && !0 === xt.isPresenting && (e = xt.getCamera(e)),
          !0 === t.isScene && t.onBeforeRender(v, t, e, n || M),
          (m = ct.get(t, g.length)),
          m.init(),
          g.push(m),
          W.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
          k.setFromProjectionMatrix(W),
          (j = this.localClippingEnabled),
          (V = lt.init(this.clippingPlanes, j, e)),
          (f = at.get(t, e)),
          f.init(),
          Lt(t, e, 0, v.sortObjects),
          f.finish(),
          !0 === v.sortObjects && f.sort(D, z),
          !0 === V && lt.beginShadows();
        const r = m.state.shadowsArray;
        bt.render(r, t, e),
          m.setupLights(),
          m.setupLightsView(e),
          !0 === V && lt.endShadows(),
          !0 === this.info.autoReset && this.info.reset(),
          void 0 !== n && this.setRenderTarget(n),
          ht.render(f, t, e, i);
        const o = f.opaque,
          s = f.transparent;
        o.length > 0 && Ct(o, t, e),
          s.length > 0 && Ct(s, t, e),
          !0 === t.isScene && t.onAfterRender(v, t, e),
          null !== M &&
            (tt.updateRenderTargetMipmap(M),
            tt.updateMultisampleRenderTarget(M)),
          Q.buffers.depth.setTest(!0),
          Q.buffers.depth.setMask(!0),
          Q.buffers.color.setMask(!0),
          Q.setPolygonOffset(!1),
          g.pop(),
          (m = g.length > 0 ? g[g.length - 1] : null),
          (f = null);
      }),
      (this.setFramebuffer = function (t) {
        _ !== t && null === M && vt.bindFramebuffer(36160, t), (_ = t);
      }),
      (this.getActiveCubeFace = function () {
        return x;
      }),
      (this.getActiveMipmapLevel = function () {
        return b;
      }),
      (this.getRenderList = function () {
        return f;
      }),
      (this.setRenderList = function (t) {
        f = t;
      }),
      (this.getRenderTarget = function () {
        return M;
      }),
      (this.setRenderTarget = function (t, e = 0, n = 0) {
        (M = t),
          (x = e),
          (b = n),
          t &&
            void 0 === $.get(t).__webglFramebuffer &&
            tt.setupRenderTarget(t);
        let i = _,
          r = !1;
        if (t) {
          const n = $.get(t).__webglFramebuffer;
          t.isWebGLCubeRenderTarget
            ? ((i = n[e]), (r = !0))
            : (i = t.isWebGLMultisampleRenderTarget
                ? $.get(t).__webglMultisampledFramebuffer
                : n),
            A.copy(t.viewport),
            L.copy(t.scissor),
            (C = t.scissorTest);
        } else
          A.copy(B).multiplyScalar(I).floor(),
            L.copy(H).multiplyScalar(I).floor(),
            (C = F);
        if (
          (S !== i && (vt.bindFramebuffer(36160, i), (S = i)),
          Q.viewport(A),
          Q.scissor(L),
          Q.setScissorTest(C),
          r)
        ) {
          const i = $.get(t.texture);
          vt.framebufferTexture2D(36160, 36064, 34069 + e, i.__webglTexture, n);
        }
      }),
      (this.readRenderTargetPixels = function (t, e, n, i, r, o, s) {
        if (!t || !t.isWebGLRenderTarget)
          return void console.error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."
          );
        let a = $.get(t).__webglFramebuffer;
        if ((t.isWebGLCubeRenderTarget && void 0 !== s && (a = a[s]), a)) {
          let s = !1;
          a !== S && (vt.bindFramebuffer(36160, a), (s = !0));
          try {
            const a = t.texture,
              c = a.format,
              u = a.type;
            if (c !== p && ft.convert(c) !== vt.getParameter(35739))
              return void console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."
              );
            if (
              !(
                1009 === u ||
                ft.convert(u) === vt.getParameter(35738) ||
                (u === l &&
                  (J.isWebGL2 ||
                    Z.get("OES_texture_float") ||
                    Z.get("WEBGL_color_buffer_float"))) ||
                (u === h &&
                  (J.isWebGL2
                    ? Z.get("EXT_color_buffer_float")
                    : Z.get("EXT_color_buffer_half_float")))
              )
            )
              return void console.error(
                "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."
              );
            36053 === vt.checkFramebufferStatus(36160)
              ? e >= 0 &&
                e <= t.width - i &&
                n >= 0 &&
                n <= t.height - r &&
                vt.readPixels(e, n, i, r, ft.convert(c), ft.convert(u), o)
              : console.error(
                  "THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."
                );
          } finally {
            s && vt.bindFramebuffer(36160, S);
          }
        }
      }),
      (this.copyFramebufferToTexture = function (t, e, n = 0) {
        const i = Math.pow(2, -n),
          r = Math.floor(e.image.width * i),
          o = Math.floor(e.image.height * i),
          s = ft.convert(e.format);
        tt.setTexture2D(e, 0),
          vt.copyTexImage2D(3553, n, s, t.x, t.y, r, o, 0),
          Q.unbindTexture();
      }),
      (this.copyTextureToTexture = function (t, e, n, i = 0) {
        const r = e.image.width,
          o = e.image.height,
          s = ft.convert(n.format),
          a = ft.convert(n.type);
        tt.setTexture2D(n, 0),
          vt.pixelStorei(37440, n.flipY),
          vt.pixelStorei(37441, n.premultiplyAlpha),
          vt.pixelStorei(3317, n.unpackAlignment),
          e.isDataTexture
            ? vt.texSubImage2D(3553, i, t.x, t.y, r, o, s, a, e.image.data)
            : e.isCompressedTexture
            ? vt.compressedTexSubImage2D(
                3553,
                i,
                t.x,
                t.y,
                e.mipmaps[0].width,
                e.mipmaps[0].height,
                s,
                e.mipmaps[0].data
              )
            : vt.texSubImage2D(3553, i, t.x, t.y, s, a, e.image),
          0 === i && n.generateMipmaps && vt.generateMipmap(3553),
          Q.unbindTexture();
      }),
      (this.initTexture = function (t) {
        tt.setTexture2D(t, 0), Q.unbindTexture();
      }),
      (this.resetState = function () {
        Q.reset(), mt.reset();
      }),
      "undefined" != typeof __THREE_DEVTOOLS__ &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this })
        );
  }
  function Lr(t) {
    Ar.call(this, t);
  }
  (gr.prototype = Object.create(de.prototype)),
    (gr.prototype.constructor = gr),
    (gr.prototype.isMeshDepthMaterial = !0),
    (gr.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        (this.depthPacking = t.depthPacking),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        this
      );
    }),
    (vr.prototype = Object.create(de.prototype)),
    (vr.prototype.constructor = vr),
    (vr.prototype.isMeshDistanceMaterial = !0),
    (vr.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.referencePosition.copy(t.referencePosition),
        (this.nearDistance = t.nearDistance),
        (this.farDistance = t.farDistance),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        this
      );
    }),
    (wr.prototype = Object.assign(Object.create(dn.prototype), {
      constructor: wr,
      isArrayCamera: !0,
    })),
    (Mr.prototype = Object.assign(Object.create(kt.prototype), {
      constructor: Mr,
      isGroup: !0,
    })),
    Object.assign(Sr.prototype, {
      constructor: Sr,
      getHandSpace: function () {
        if (
          null === this._hand &&
          ((this._hand = new Mr()),
          (this._hand.matrixAutoUpdate = !1),
          (this._hand.visible = !1),
          (this._hand.joints = []),
          (this._hand.inputState = { pinching: !1 }),
          window.XRHand)
        )
          for (let t = 0; t <= window.XRHand.LITTLE_PHALANX_TIP; t++) {
            const t = new Mr();
            (t.matrixAutoUpdate = !1),
              (t.visible = !1),
              this._hand.joints.push(t),
              this._hand.add(t);
          }
        return this._hand;
      },
      getTargetRaySpace: function () {
        return (
          null === this._targetRay &&
            ((this._targetRay = new Mr()),
            (this._targetRay.matrixAutoUpdate = !1),
            (this._targetRay.visible = !1)),
          this._targetRay
        );
      },
      getGripSpace: function () {
        return (
          null === this._grip &&
            ((this._grip = new Mr()),
            (this._grip.matrixAutoUpdate = !1),
            (this._grip.visible = !1)),
          this._grip
        );
      },
      dispatchEvent: function (t) {
        return (
          null !== this._targetRay && this._targetRay.dispatchEvent(t),
          null !== this._grip && this._grip.dispatchEvent(t),
          null !== this._hand && this._hand.dispatchEvent(t),
          this
        );
      },
      disconnect: function (t) {
        return (
          this.dispatchEvent({ type: "disconnected", data: t }),
          null !== this._targetRay && (this._targetRay.visible = !1),
          null !== this._grip && (this._grip.visible = !1),
          null !== this._hand && (this._hand.visible = !1),
          this
        );
      },
      update: function (t, e, n) {
        let i = null,
          r = null,
          o = null;
        const s = this._targetRay,
          a = this._grip,
          c = this._hand;
        if (t && "visible-blurred" !== e.session.visibilityState)
          if (c && t.hand) {
            o = !0;
            for (let i = 0; i <= window.XRHand.LITTLE_PHALANX_TIP; i++)
              if (t.hand[i]) {
                const r = e.getJointPose(t.hand[i], n),
                  o = c.joints[i];
                null !== r &&
                  (o.matrix.fromArray(r.transform.matrix),
                  o.matrix.decompose(o.position, o.rotation, o.scale),
                  (o.jointRadius = r.radius)),
                  (o.visible = null !== r);
                const s = c.joints[window.XRHand.INDEX_PHALANX_TIP],
                  a = c.joints[window.XRHand.THUMB_PHALANX_TIP],
                  l = s.position.distanceTo(a.position),
                  h = 0.02,
                  u = 0.005;
                c.inputState.pinching && l > h + u
                  ? ((c.inputState.pinching = !1),
                    this.dispatchEvent({
                      type: "pinchend",
                      handedness: t.handedness,
                      target: this,
                    }))
                  : !c.inputState.pinching &&
                    l <= h - u &&
                    ((c.inputState.pinching = !0),
                    this.dispatchEvent({
                      type: "pinchstart",
                      handedness: t.handedness,
                      target: this,
                    }));
              }
          } else
            null !== s &&
              ((i = e.getPose(t.targetRaySpace, n)),
              null !== i &&
                (s.matrix.fromArray(i.transform.matrix),
                s.matrix.decompose(s.position, s.rotation, s.scale))),
              null !== a &&
                t.gripSpace &&
                ((r = e.getPose(t.gripSpace, n)),
                null !== r &&
                  (a.matrix.fromArray(r.transform.matrix),
                  a.matrix.decompose(a.position, a.rotation, a.scale)));
        return (
          null !== s && (s.visible = null !== i),
          null !== a && (a.visible = null !== r),
          null !== c && (c.visible = null !== o),
          this
        );
      },
    }),
    Object.assign(Er.prototype, A.prototype),
    (Lr.prototype = Object.assign(Object.create(Ar.prototype), {
      constructor: Lr,
      isWebGL1Renderer: !0,
    }));
  class Cr extends kt {
    constructor() {
      super(),
        Object.defineProperty(this, "isScene", { value: !0 }),
        (this.type = "Scene"),
        (this.background = null),
        (this.environment = null),
        (this.fog = null),
        (this.overrideMaterial = null),
        (this.autoUpdate = !0),
        "undefined" != typeof __THREE_DEVTOOLS__ &&
          __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent("observe", { detail: this })
          );
    }
    copy(t, e) {
      return (
        super.copy(t, e),
        null !== t.background && (this.background = t.background.clone()),
        null !== t.environment && (this.environment = t.environment.clone()),
        null !== t.fog && (this.fog = t.fog.clone()),
        null !== t.overrideMaterial &&
          (this.overrideMaterial = t.overrideMaterial.clone()),
        (this.autoUpdate = t.autoUpdate),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this
      );
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return (
        null !== this.background &&
          (e.object.background = this.background.toJSON(t)),
        null !== this.environment &&
          (e.object.environment = this.environment.toJSON(t)),
        null !== this.fog && (e.object.fog = this.fog.toJSON()),
        e
      );
    }
  }
  function Rr(t, e) {
    (this.array = t),
      (this.stride = e),
      (this.count = void 0 !== t ? t.length / e : 0),
      (this.usage = S),
      (this.updateRange = { offset: 0, count: -1 }),
      (this.version = 0),
      (this.uuid = R.generateUUID());
  }
  Object.defineProperty(Rr.prototype, "needsUpdate", {
    set: function (t) {
      !0 === t && this.version++;
    },
  }),
    Object.assign(Rr.prototype, {
      isInterleavedBuffer: !0,
      onUploadCallback: function () {},
      setUsage: function (t) {
        return (this.usage = t), this;
      },
      copy: function (t) {
        return (
          (this.array = new t.array.constructor(t.array)),
          (this.count = t.count),
          (this.stride = t.stride),
          (this.usage = t.usage),
          this
        );
      },
      copyAt: function (t, e, n) {
        (t *= this.stride), (n *= e.stride);
        for (let i = 0, r = this.stride; i < r; i++)
          this.array[t + i] = e.array[n + i];
        return this;
      },
      set: function (t, e = 0) {
        return this.array.set(t, e), this;
      },
      clone: function (t) {
        void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid &&
            (this.array.buffer._uuid = R.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] =
              this.array.slice(0).buffer);
        const e = new Rr(
          new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
          this.stride
        );
        return e.setUsage(this.usage), e;
      },
      onUpload: function (t) {
        return (this.onUploadCallback = t), this;
      },
      toJSON: function (t) {
        return (
          void 0 === t.arrayBuffers && (t.arrayBuffers = {}),
          void 0 === this.array.buffer._uuid &&
            (this.array.buffer._uuid = R.generateUUID()),
          void 0 === t.arrayBuffers[this.array.buffer._uuid] &&
            (t.arrayBuffers[this.array.buffer._uuid] =
              Array.prototype.slice.call(new Uint32Array(this.array.buffer))),
          {
            uuid: this.uuid,
            buffer: this.array.buffer._uuid,
            type: this.array.constructor.name,
            stride: this.stride,
          }
        );
      },
    });
  const Pr = new G();
  function Or(t, e, n, i) {
    (this.name = ""),
      (this.data = t),
      (this.itemSize = e),
      (this.offset = n),
      (this.normalized = !0 === i);
  }
  function Nr(t) {
    de.call(this),
      (this.type = "SpriteMaterial"),
      (this.color = new le(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.rotation = 0),
      (this.sizeAttenuation = !0),
      (this.transparent = !0),
      this.setValues(t);
  }
  let Ir;
  Object.defineProperties(Or.prototype, {
    count: {
      get: function () {
        return this.data.count;
      },
    },
    array: {
      get: function () {
        return this.data.array;
      },
    },
    needsUpdate: {
      set: function (t) {
        this.data.needsUpdate = t;
      },
    },
  }),
    Object.assign(Or.prototype, {
      isInterleavedBufferAttribute: !0,
      applyMatrix4: function (t) {
        for (let e = 0, n = this.data.count; e < n; e++)
          (Pr.x = this.getX(e)),
            (Pr.y = this.getY(e)),
            (Pr.z = this.getZ(e)),
            Pr.applyMatrix4(t),
            this.setXYZ(e, Pr.x, Pr.y, Pr.z);
        return this;
      },
      setX: function (t, e) {
        return (this.data.array[t * this.data.stride + this.offset] = e), this;
      },
      setY: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 1] = e), this
        );
      },
      setZ: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 2] = e), this
        );
      },
      setW: function (t, e) {
        return (
          (this.data.array[t * this.data.stride + this.offset + 3] = e), this
        );
      },
      getX: function (t) {
        return this.data.array[t * this.data.stride + this.offset];
      },
      getY: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 1];
      },
      getZ: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 2];
      },
      getW: function (t) {
        return this.data.array[t * this.data.stride + this.offset + 3];
      },
      setXY: function (t, e, n) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          this
        );
      },
      setXYZ: function (t, e, n, i) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          this
        );
      },
      setXYZW: function (t, e, n, i, r) {
        return (
          (t = t * this.data.stride + this.offset),
          (this.data.array[t + 0] = e),
          (this.data.array[t + 1] = n),
          (this.data.array[t + 2] = i),
          (this.data.array[t + 3] = r),
          this
        );
      },
      clone: function (t) {
        if (void 0 === t) {
          console.log(
            "THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data."
          );
          const t = [];
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset;
            for (let e = 0; e < this.itemSize; e++)
              t.push(this.data.array[n + e]);
          }
          return new ge(
            new this.array.constructor(t),
            this.itemSize,
            this.normalized
          );
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)),
          new Or(
            t.interleavedBuffers[this.data.uuid],
            this.itemSize,
            this.offset,
            this.normalized
          )
        );
      },
      toJSON: function (t) {
        if (void 0 === t) {
          console.log(
            "THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data."
          );
          const t = [];
          for (let e = 0; e < this.count; e++) {
            const n = e * this.data.stride + this.offset;
            for (let e = 0; e < this.itemSize; e++)
              t.push(this.data.array[n + e]);
          }
          return {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: t,
            normalized: this.normalized,
          };
        }
        return (
          void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}),
          void 0 === t.interleavedBuffers[this.data.uuid] &&
            (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)),
          {
            isInterleavedBufferAttribute: !0,
            itemSize: this.itemSize,
            data: this.data.uuid,
            offset: this.offset,
            normalized: this.normalized,
          }
        );
      },
    }),
    (Nr.prototype = Object.create(de.prototype)),
    (Nr.prototype.constructor = Nr),
    (Nr.prototype.isSpriteMaterial = !0),
    (Nr.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.rotation = t.rotation),
        (this.sizeAttenuation = t.sizeAttenuation),
        this
      );
    });
  const Dr = new G(),
    zr = new G(),
    Br = new G(),
    Ur = new P(),
    Hr = new P(),
    Fr = new gt(),
    kr = new G(),
    Gr = new G(),
    Vr = new G(),
    jr = new P(),
    Wr = new P(),
    qr = new P();
  function Xr(t) {
    if ((kt.call(this), (this.type = "Sprite"), void 0 === Ir)) {
      Ir = new Ue();
      const t = new Rr(
        new Float32Array([
          -0.5, -0.5, 0, 0, 0, 0.5, -0.5, 0, 1, 0, 0.5, 0.5, 0, 1, 1, -0.5, 0.5,
          0, 0, 1,
        ]),
        5
      );
      Ir.setIndex([0, 1, 2, 0, 2, 3]),
        Ir.setAttribute("position", new Or(t, 3, 0, !1)),
        Ir.setAttribute("uv", new Or(t, 2, 3, !1));
    }
    (this.geometry = Ir),
      (this.material = void 0 !== t ? t : new Nr()),
      (this.center = new P(0.5, 0.5));
  }
  function Yr(t, e, n, i, r, o) {
    Ur.subVectors(t, n).addScalar(0.5).multiply(i),
      void 0 !== r
        ? ((Hr.x = o * Ur.x - r * Ur.y), (Hr.y = r * Ur.x + o * Ur.y))
        : Hr.copy(Ur),
      t.copy(e),
      (t.x += Hr.x),
      (t.y += Hr.y),
      t.applyMatrix4(Fr);
  }
  Xr.prototype = Object.assign(Object.create(kt.prototype), {
    constructor: Xr,
    isSprite: !0,
    raycast: function (t, e) {
      null === t.camera &&
        console.error(
          'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'
        ),
        zr.setFromMatrixScale(this.matrixWorld),
        Fr.copy(t.camera.matrixWorld),
        this.modelViewMatrix.multiplyMatrices(
          t.camera.matrixWorldInverse,
          this.matrixWorld
        ),
        Br.setFromMatrixPosition(this.modelViewMatrix),
        t.camera.isPerspectiveCamera &&
          !1 === this.material.sizeAttenuation &&
          zr.multiplyScalar(-Br.z);
      const n = this.material.rotation;
      let i, r;
      0 !== n && ((r = Math.cos(n)), (i = Math.sin(n)));
      const o = this.center;
      Yr(kr.set(-0.5, -0.5, 0), Br, o, zr, i, r),
        Yr(Gr.set(0.5, -0.5, 0), Br, o, zr, i, r),
        Yr(Vr.set(0.5, 0.5, 0), Br, o, zr, i, r),
        jr.set(0, 0),
        Wr.set(1, 0),
        qr.set(1, 1);
      let s = t.ray.intersectTriangle(kr, Gr, Vr, !1, Dr);
      if (
        null === s &&
        (Yr(Gr.set(-0.5, 0.5, 0), Br, o, zr, i, r),
        Wr.set(0, 1),
        (s = t.ray.intersectTriangle(kr, Vr, Gr, !1, Dr)),
        null === s)
      )
        return;
      const a = t.ray.origin.distanceTo(Dr);
      a < t.near ||
        a > t.far ||
        e.push({
          distance: a,
          point: Dr.clone(),
          uv: ne.getUV(Dr, kr, Gr, Vr, jr, Wr, qr, new P()),
          face: null,
          object: this,
        });
    },
    copy: function (t) {
      return (
        kt.prototype.copy.call(this, t),
        void 0 !== t.center && this.center.copy(t.center),
        (this.material = t.material),
        this
      );
    },
  });
  const Zr = new G(),
    Jr = new G();
  function Qr() {
    kt.call(this),
      (this._currentLevel = 0),
      (this.type = "LOD"),
      Object.defineProperties(this, { levels: { enumerable: !0, value: [] } }),
      (this.autoUpdate = !0);
  }
  Qr.prototype = Object.assign(Object.create(kt.prototype), {
    constructor: Qr,
    isLOD: !0,
    copy: function (t) {
      kt.prototype.copy.call(this, t, !1);
      const e = t.levels;
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t];
        this.addLevel(n.object.clone(), n.distance);
      }
      return (this.autoUpdate = t.autoUpdate), this;
    },
    addLevel: function (t, e = 0) {
      e = Math.abs(e);
      const n = this.levels;
      let i;
      for (i = 0; i < n.length && !(e < n[i].distance); i++);
      return n.splice(i, 0, { distance: e, object: t }), this.add(t), this;
    },
    getCurrentLevel: function () {
      return this._currentLevel;
    },
    getObjectForDistance: function (t) {
      const e = this.levels;
      if (e.length > 0) {
        let n, i;
        for (n = 1, i = e.length; n < i && !(t < e[n].distance); n++);
        return e[n - 1].object;
      }
      return null;
    },
    raycast: function (t, e) {
      if (this.levels.length > 0) {
        Zr.setFromMatrixPosition(this.matrixWorld);
        const n = t.ray.origin.distanceTo(Zr);
        this.getObjectForDistance(n).raycast(t, e);
      }
    },
    update: function (t) {
      const e = this.levels;
      if (e.length > 1) {
        Zr.setFromMatrixPosition(t.matrixWorld),
          Jr.setFromMatrixPosition(this.matrixWorld);
        const n = Zr.distanceTo(Jr) / t.zoom;
        let i, r;
        for (
          e[0].object.visible = !0, i = 1, r = e.length;
          i < r && n >= e[i].distance;
          i++
        )
          (e[i - 1].object.visible = !1), (e[i].object.visible = !0);
        for (this._currentLevel = i - 1; i < r; i++) e[i].object.visible = !1;
      }
    },
    toJSON: function (t) {
      const e = kt.prototype.toJSON.call(this, t);
      !1 === this.autoUpdate && (e.object.autoUpdate = !1),
        (e.object.levels = []);
      const n = this.levels;
      for (let t = 0, i = n.length; t < i; t++) {
        const i = n[t];
        e.object.levels.push({ object: i.object.uuid, distance: i.distance });
      }
      return e;
    },
  });
  const Kr = new G(),
    $r = new U(),
    to = new U(),
    eo = new G(),
    no = new gt();
  function io(t, e) {
    t &&
      t.isGeometry &&
      console.error(
        "THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."
      ),
      nn.call(this, t, e),
      (this.type = "SkinnedMesh"),
      (this.bindMode = "attached"),
      (this.bindMatrix = new gt()),
      (this.bindMatrixInverse = new gt());
  }
  function ro() {
    kt.call(this), (this.type = "Bone");
  }
  (io.prototype = Object.assign(Object.create(nn.prototype), {
    constructor: io,
    isSkinnedMesh: !0,
    copy: function (t) {
      return (
        nn.prototype.copy.call(this, t),
        (this.bindMode = t.bindMode),
        this.bindMatrix.copy(t.bindMatrix),
        this.bindMatrixInverse.copy(t.bindMatrixInverse),
        (this.skeleton = t.skeleton),
        this
      );
    },
    bind: function (t, e) {
      (this.skeleton = t),
        void 0 === e &&
          (this.updateMatrixWorld(!0),
          this.skeleton.calculateInverses(),
          (e = this.matrixWorld)),
        this.bindMatrix.copy(e),
        this.bindMatrixInverse.copy(e).invert();
    },
    pose: function () {
      this.skeleton.pose();
    },
    normalizeSkinWeights: function () {
      const t = new U(),
        e = this.geometry.attributes.skinWeight;
      for (let n = 0, i = e.count; n < i; n++) {
        (t.x = e.getX(n)),
          (t.y = e.getY(n)),
          (t.z = e.getZ(n)),
          (t.w = e.getW(n));
        const i = 1 / t.manhattanLength();
        i !== 1 / 0 ? t.multiplyScalar(i) : t.set(1, 0, 0, 0),
          e.setXYZW(n, t.x, t.y, t.z, t.w);
      }
    },
    updateMatrixWorld: function (t) {
      nn.prototype.updateMatrixWorld.call(this, t),
        "attached" === this.bindMode
          ? this.bindMatrixInverse.copy(this.matrixWorld).invert()
          : "detached" === this.bindMode
          ? this.bindMatrixInverse.copy(this.bindMatrix).invert()
          : console.warn(
              "THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode
            );
    },
    boneTransform: function (t, e) {
      const n = this.skeleton,
        i = this.geometry;
      $r.fromBufferAttribute(i.attributes.skinIndex, t),
        to.fromBufferAttribute(i.attributes.skinWeight, t),
        Kr.fromBufferAttribute(i.attributes.position, t).applyMatrix4(
          this.bindMatrix
        ),
        e.set(0, 0, 0);
      for (let t = 0; t < 4; t++) {
        const i = to.getComponent(t);
        if (0 !== i) {
          const r = $r.getComponent(t);
          no.multiplyMatrices(n.bones[r].matrixWorld, n.boneInverses[r]),
            e.addScaledVector(eo.copy(Kr).applyMatrix4(no), i);
        }
      }
      return e.applyMatrix4(this.bindMatrixInverse);
    },
  })),
    (ro.prototype = Object.assign(Object.create(kt.prototype), {
      constructor: ro,
      isBone: !0,
    }));
  const oo = new gt(),
    so = new gt();
  function ao(t = [], e = []) {
    (this.uuid = R.generateUUID()),
      (this.bones = t.slice(0)),
      (this.boneInverses = e),
      (this.boneMatrices = null),
      (this.boneTexture = null),
      (this.boneTextureSize = 0),
      (this.frame = -1),
      this.init();
  }
  Object.assign(ao.prototype, {
    init: function () {
      const t = this.bones,
        e = this.boneInverses;
      if (
        ((this.boneMatrices = new Float32Array(16 * t.length)), 0 === e.length)
      )
        this.calculateInverses();
      else if (t.length !== e.length) {
        console.warn(
          "THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."
        ),
          (this.boneInverses = []);
        for (let t = 0, e = this.bones.length; t < e; t++)
          this.boneInverses.push(new gt());
      }
    },
    calculateInverses: function () {
      this.boneInverses.length = 0;
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = new gt();
        this.bones[t] && e.copy(this.bones[t].matrixWorld).invert(),
          this.boneInverses.push(e);
      }
    },
    pose: function () {
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t];
        e && e.matrixWorld.copy(this.boneInverses[t]).invert();
      }
      for (let t = 0, e = this.bones.length; t < e; t++) {
        const e = this.bones[t];
        e &&
          (e.parent && e.parent.isBone
            ? (e.matrix.copy(e.parent.matrixWorld).invert(),
              e.matrix.multiply(e.matrixWorld))
            : e.matrix.copy(e.matrixWorld),
          e.matrix.decompose(e.position, e.quaternion, e.scale));
      }
    },
    update: function () {
      const t = this.bones,
        e = this.boneInverses,
        n = this.boneMatrices,
        i = this.boneTexture;
      for (let i = 0, r = t.length; i < r; i++) {
        const r = t[i] ? t[i].matrixWorld : so;
        oo.multiplyMatrices(r, e[i]), oo.toArray(n, 16 * i);
      }
      null !== i && (i.needsUpdate = !0);
    },
    clone: function () {
      return new ao(this.bones, this.boneInverses);
    },
    getBoneByName: function (t) {
      for (let e = 0, n = this.bones.length; e < n; e++) {
        const n = this.bones[e];
        if (n.name === t) return n;
      }
    },
    dispose: function () {
      null !== this.boneTexture &&
        (this.boneTexture.dispose(), (this.boneTexture = null));
    },
    fromJSON: function (t, e) {
      this.uuid = t.uuid;
      for (let n = 0, i = t.bones.length; n < i; n++) {
        const i = t.bones[n];
        let r = e[i];
        void 0 === r &&
          (console.warn("THREE.Skeleton: No bone found with UUID:", i),
          (r = new ro())),
          this.bones.push(r),
          this.boneInverses.push(new gt().fromArray(t.boneInverses[n]));
      }
      return this.init(), this;
    },
    toJSON: function () {
      const t = {
        metadata: {
          version: 4.5,
          type: "Skeleton",
          generator: "Skeleton.toJSON",
        },
        bones: [],
        boneInverses: [],
      };
      t.uuid = this.uuid;
      const e = this.bones,
        n = this.boneInverses;
      for (let i = 0, r = e.length; i < r; i++) {
        const r = e[i];
        t.bones.push(r.uuid);
        const o = n[i];
        t.boneInverses.push(o.toArray());
      }
      return t;
    },
  });
  const co = new gt(),
    lo = new gt(),
    ho = [],
    uo = new nn();
  function po(t, e, n) {
    nn.call(this, t, e),
      (this.instanceMatrix = new ge(new Float32Array(16 * n), 16)),
      (this.instanceColor = null),
      (this.count = n),
      (this.frustumCulled = !1);
  }
  function fo(t) {
    de.call(this),
      (this.type = "LineBasicMaterial"),
      (this.color = new le(16777215)),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.morphTargets = !1),
      this.setValues(t);
  }
  (po.prototype = Object.assign(Object.create(nn.prototype), {
    constructor: po,
    isInstancedMesh: !0,
    copy: function (t) {
      return (
        nn.prototype.copy.call(this, t),
        this.instanceMatrix.copy(t.instanceMatrix),
        (this.count = t.count),
        this
      );
    },
    getColorAt: function (t, e) {
      e.fromArray(this.instanceColor.array, 3 * t);
    },
    getMatrixAt: function (t, e) {
      e.fromArray(this.instanceMatrix.array, 16 * t);
    },
    raycast: function (t, e) {
      const n = this.matrixWorld,
        i = this.count;
      if (
        ((uo.geometry = this.geometry),
        (uo.material = this.material),
        void 0 !== uo.material)
      )
        for (let r = 0; r < i; r++) {
          this.getMatrixAt(r, co),
            lo.multiplyMatrices(n, co),
            (uo.matrixWorld = lo),
            uo.raycast(t, ho);
          for (let t = 0, n = ho.length; t < n; t++) {
            const n = ho[t];
            (n.instanceId = r), (n.object = this), e.push(n);
          }
          ho.length = 0;
        }
    },
    setColorAt: function (t, e) {
      null === this.instanceColor &&
        (this.instanceColor = new ge(new Float32Array(3 * this.count), 3)),
        e.toArray(this.instanceColor.array, 3 * t);
    },
    setMatrixAt: function (t, e) {
      e.toArray(this.instanceMatrix.array, 16 * t);
    },
    updateMorphTargets: function () {},
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  })),
    (fo.prototype = Object.create(de.prototype)),
    (fo.prototype.constructor = fo),
    (fo.prototype.isLineBasicMaterial = !0),
    (fo.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.linewidth = t.linewidth),
        (this.linecap = t.linecap),
        (this.linejoin = t.linejoin),
        (this.morphTargets = t.morphTargets),
        this
      );
    });
  const mo = new G(),
    go = new G(),
    vo = new gt(),
    yo = new mt(),
    _o = new at();
  function xo(t = new Ue(), e = new fo()) {
    kt.call(this),
      (this.type = "Line"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  xo.prototype = Object.assign(Object.create(kt.prototype), {
    constructor: xo,
    isLine: !0,
    copy: function (t) {
      return (
        kt.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    computeLineDistances: function () {
      const t = this.geometry;
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = [0];
          for (let t = 1, i = e.count; t < i; t++)
            mo.fromBufferAttribute(e, t - 1),
              go.fromBufferAttribute(e, t),
              (n[t] = n[t - 1]),
              (n[t] += mo.distanceTo(go));
          t.setAttribute("lineDistance", new Ee(n, 1));
        } else
          console.warn(
            "THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
          );
      else if (t.isGeometry) {
        const e = t.vertices,
          n = t.lineDistances;
        n[0] = 0;
        for (let t = 1, i = e.length; t < i; t++)
          (n[t] = n[t - 1]), (n[t] += e[t - 1].distanceTo(e[t]));
      }
      return this;
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Line.threshold;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        _o.copy(n.boundingSphere),
        _o.applyMatrix4(i),
        (_o.radius += r),
        !1 === t.ray.intersectsSphere(_o))
      )
        return;
      vo.copy(i).invert(), yo.copy(t.ray).applyMatrix4(vo);
      const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        s = o * o,
        a = new G(),
        c = new G(),
        l = new G(),
        h = new G(),
        u = this.isLineSegments ? 2 : 1;
      if (n.isBufferGeometry) {
        const i = n.index,
          r = n.attributes.position;
        if (null !== i) {
          const n = i.array;
          for (let i = 0, o = n.length - 1; i < o; i += u) {
            const o = n[i],
              u = n[i + 1];
            if (
              (a.fromBufferAttribute(r, o),
              c.fromBufferAttribute(r, u),
              yo.distanceSqToSegment(a, c, h, l) > s)
            )
              continue;
            h.applyMatrix4(this.matrixWorld);
            const d = t.ray.origin.distanceTo(h);
            d < t.near ||
              d > t.far ||
              e.push({
                distance: d,
                point: l.clone().applyMatrix4(this.matrixWorld),
                index: i,
                face: null,
                faceIndex: null,
                object: this,
              });
          }
        } else
          for (let n = 0, i = r.count - 1; n < i; n += u) {
            if (
              (a.fromBufferAttribute(r, n),
              c.fromBufferAttribute(r, n + 1),
              yo.distanceSqToSegment(a, c, h, l) > s)
            )
              continue;
            h.applyMatrix4(this.matrixWorld);
            const i = t.ray.origin.distanceTo(h);
            i < t.near ||
              i > t.far ||
              e.push({
                distance: i,
                point: l.clone().applyMatrix4(this.matrixWorld),
                index: n,
                face: null,
                faceIndex: null,
                object: this,
              });
          }
      } else if (n.isGeometry) {
        const i = n.vertices,
          r = i.length;
        for (let n = 0; n < r - 1; n += u) {
          if (yo.distanceSqToSegment(i[n], i[n + 1], h, l) > s) continue;
          h.applyMatrix4(this.matrixWorld);
          const r = t.ray.origin.distanceTo(h);
          r < t.near ||
            r > t.far ||
            e.push({
              distance: r,
              point: l.clone().applyMatrix4(this.matrixWorld),
              index: n,
              face: null,
              faceIndex: null,
              object: this,
            });
        }
      }
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
  });
  const bo = new G(),
    wo = new G();
  function Mo(t, e) {
    xo.call(this, t, e), (this.type = "LineSegments");
  }
  function So(t, e) {
    xo.call(this, t, e), (this.type = "LineLoop");
  }
  function Eo(t) {
    de.call(this),
      (this.type = "PointsMaterial"),
      (this.color = new le(16777215)),
      (this.map = null),
      (this.alphaMap = null),
      (this.size = 1),
      (this.sizeAttenuation = !0),
      (this.morphTargets = !1),
      this.setValues(t);
  }
  (Mo.prototype = Object.assign(Object.create(xo.prototype), {
    constructor: Mo,
    isLineSegments: !0,
    computeLineDistances: function () {
      const t = this.geometry;
      if (t.isBufferGeometry)
        if (null === t.index) {
          const e = t.attributes.position,
            n = [];
          for (let t = 0, i = e.count; t < i; t += 2)
            bo.fromBufferAttribute(e, t),
              wo.fromBufferAttribute(e, t + 1),
              (n[t] = 0 === t ? 0 : n[t - 1]),
              (n[t + 1] = n[t] + bo.distanceTo(wo));
          t.setAttribute("lineDistance", new Ee(n, 1));
        } else
          console.warn(
            "THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."
          );
      else if (t.isGeometry) {
        const e = t.vertices,
          n = t.lineDistances;
        for (let t = 0, i = e.length; t < i; t += 2)
          bo.copy(e[t]),
            wo.copy(e[t + 1]),
            (n[t] = 0 === t ? 0 : n[t - 1]),
            (n[t + 1] = n[t] + bo.distanceTo(wo));
      }
      return this;
    },
  })),
    (So.prototype = Object.assign(Object.create(xo.prototype), {
      constructor: So,
      isLineLoop: !0,
    })),
    (Eo.prototype = Object.create(de.prototype)),
    (Eo.prototype.constructor = Eo),
    (Eo.prototype.isPointsMaterial = !0),
    (Eo.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.alphaMap = t.alphaMap),
        (this.size = t.size),
        (this.sizeAttenuation = t.sizeAttenuation),
        (this.morphTargets = t.morphTargets),
        this
      );
    });
  const To = new gt(),
    Ao = new mt(),
    Lo = new at(),
    Co = new G();
  function Ro(t = new Ue(), e = new Eo()) {
    kt.call(this),
      (this.type = "Points"),
      (this.geometry = t),
      (this.material = e),
      this.updateMorphTargets();
  }
  function Po(t, e, n, i, r, o, s) {
    const a = Ao.distanceSqToPoint(t);
    if (a < n) {
      const n = new G();
      Ao.closestPointToPoint(t, n), n.applyMatrix4(i);
      const c = r.ray.origin.distanceTo(n);
      if (c < r.near || c > r.far) return;
      o.push({
        distance: c,
        distanceToRay: Math.sqrt(a),
        point: n,
        index: e,
        face: null,
        object: s,
      });
    }
  }
  function Oo(t, e, n, i, r, s, a, c, l) {
    z.call(this, t, e, n, i, r, s, a, c, l),
      (this.format = void 0 !== a ? a : d),
      (this.minFilter = void 0 !== s ? s : o),
      (this.magFilter = void 0 !== r ? r : o),
      (this.generateMipmaps = !1);
    const h = this;
    "requestVideoFrameCallback" in t &&
      t.requestVideoFrameCallback(function e() {
        (h.needsUpdate = !0), t.requestVideoFrameCallback(e);
      });
  }
  function No(t, e, n, i, r, o, s, a, c, l, h, u) {
    z.call(this, null, o, s, a, c, l, i, r, h, u),
      (this.image = { width: e, height: n }),
      (this.mipmaps = t),
      (this.flipY = !1),
      (this.generateMipmaps = !1);
  }
  function Io(t, e, n, i, r, o, s, a, c) {
    z.call(this, t, e, n, i, r, o, s, a, c), (this.needsUpdate = !0);
  }
  function Do(t, e, n, i, o, s, c, l, h, d) {
    if ((d = void 0 !== d ? d : f) !== f && d !== m)
      throw new Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"
      );
    void 0 === n && d === f && (n = a),
      void 0 === n && d === m && (n = u),
      z.call(this, null, i, o, s, c, l, d, n, h),
      (this.image = { width: t, height: e }),
      (this.magFilter = void 0 !== c ? c : r),
      (this.minFilter = void 0 !== l ? l : r),
      (this.flipY = !1),
      (this.generateMipmaps = !1);
  }
  (Ro.prototype = Object.assign(Object.create(kt.prototype), {
    constructor: Ro,
    isPoints: !0,
    copy: function (t) {
      return (
        kt.prototype.copy.call(this, t),
        (this.material = t.material),
        (this.geometry = t.geometry),
        this
      );
    },
    raycast: function (t, e) {
      const n = this.geometry,
        i = this.matrixWorld,
        r = t.params.Points.threshold;
      if (
        (null === n.boundingSphere && n.computeBoundingSphere(),
        Lo.copy(n.boundingSphere),
        Lo.applyMatrix4(i),
        (Lo.radius += r),
        !1 === t.ray.intersectsSphere(Lo))
      )
        return;
      To.copy(i).invert(), Ao.copy(t.ray).applyMatrix4(To);
      const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
        s = o * o;
      if (n.isBufferGeometry) {
        const r = n.index,
          o = n.attributes.position;
        if (null !== r) {
          const n = r.array;
          for (let r = 0, a = n.length; r < a; r++) {
            const a = n[r];
            Co.fromBufferAttribute(o, a), Po(Co, a, s, i, t, e, this);
          }
        } else
          for (let n = 0, r = o.count; n < r; n++)
            Co.fromBufferAttribute(o, n), Po(Co, n, s, i, t, e, this);
      } else {
        const r = n.vertices;
        for (let n = 0, o = r.length; n < o; n++) Po(r[n], n, s, i, t, e, this);
      }
    },
    updateMorphTargets: function () {
      const t = this.geometry;
      if (t.isBufferGeometry) {
        const e = t.morphAttributes,
          n = Object.keys(e);
        if (n.length > 0) {
          const t = e[n[0]];
          if (void 0 !== t) {
            (this.morphTargetInfluences = []),
              (this.morphTargetDictionary = {});
            for (let e = 0, n = t.length; e < n; e++) {
              const n = t[e].name || String(e);
              this.morphTargetInfluences.push(0),
                (this.morphTargetDictionary[n] = e);
            }
          }
        }
      } else {
        const e = t.morphTargets;
        void 0 !== e &&
          e.length > 0 &&
          console.error(
            "THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead."
          );
      }
    },
  })),
    (Oo.prototype = Object.assign(Object.create(z.prototype), {
      constructor: Oo,
      clone: function () {
        return new this.constructor(this.image).copy(this);
      },
      isVideoTexture: !0,
      update: function () {
        const t = this.image;
        !1 == "requestVideoFrameCallback" in t &&
          t.readyState >= t.HAVE_CURRENT_DATA &&
          (this.needsUpdate = !0);
      },
    })),
    (No.prototype = Object.create(z.prototype)),
    (No.prototype.constructor = No),
    (No.prototype.isCompressedTexture = !0),
    (Io.prototype = Object.create(z.prototype)),
    (Io.prototype.constructor = Io),
    (Io.prototype.isCanvasTexture = !0),
    (Do.prototype = Object.create(z.prototype)),
    (Do.prototype.constructor = Do),
    (Do.prototype.isDepthTexture = !0);
  let zo = 0;
  const Bo = new gt(),
    Uo = new kt(),
    Ho = new G();
  function Fo() {
    Object.defineProperty(this, "id", { value: (zo += 2) }),
      (this.uuid = R.generateUUID()),
      (this.name = ""),
      (this.type = "Geometry"),
      (this.vertices = []),
      (this.colors = []),
      (this.faces = []),
      (this.faceVertexUvs = [[]]),
      (this.morphTargets = []),
      (this.morphNormals = []),
      (this.skinWeights = []),
      (this.skinIndices = []),
      (this.lineDistances = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.elementsNeedUpdate = !1),
      (this.verticesNeedUpdate = !1),
      (this.uvsNeedUpdate = !1),
      (this.normalsNeedUpdate = !1),
      (this.colorsNeedUpdate = !1),
      (this.lineDistancesNeedUpdate = !1),
      (this.groupsNeedUpdate = !1);
  }
  (Fo.prototype = Object.assign(Object.create(A.prototype), {
    constructor: Fo,
    isGeometry: !0,
    applyMatrix4: function (t) {
      const e = new O().getNormalMatrix(t);
      for (let e = 0, n = this.vertices.length; e < n; e++)
        this.vertices[e].applyMatrix4(t);
      for (let t = 0, n = this.faces.length; t < n; t++) {
        const n = this.faces[t];
        n.normal.applyMatrix3(e).normalize();
        for (let t = 0, i = n.vertexNormals.length; t < i; t++)
          n.vertexNormals[t].applyMatrix3(e).normalize();
      }
      return (
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        (this.verticesNeedUpdate = !0),
        (this.normalsNeedUpdate = !0),
        this
      );
    },
    rotateX: function (t) {
      return Bo.makeRotationX(t), this.applyMatrix4(Bo), this;
    },
    rotateY: function (t) {
      return Bo.makeRotationY(t), this.applyMatrix4(Bo), this;
    },
    rotateZ: function (t) {
      return Bo.makeRotationZ(t), this.applyMatrix4(Bo), this;
    },
    translate: function (t, e, n) {
      return Bo.makeTranslation(t, e, n), this.applyMatrix4(Bo), this;
    },
    scale: function (t, e, n) {
      return Bo.makeScale(t, e, n), this.applyMatrix4(Bo), this;
    },
    lookAt: function (t) {
      return (
        Uo.lookAt(t), Uo.updateMatrix(), this.applyMatrix4(Uo.matrix), this
      );
    },
    fromBufferGeometry: function (t) {
      const e = this,
        n = null !== t.index ? t.index : void 0,
        i = t.attributes;
      if (void 0 === i.position)
        return (
          console.error(
            "THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."
          ),
          this
        );
      const r = i.position,
        o = i.normal,
        s = i.color,
        a = i.uv,
        c = i.uv2;
      void 0 !== c && (this.faceVertexUvs[1] = []);
      for (let t = 0; t < r.count; t++)
        e.vertices.push(new G().fromBufferAttribute(r, t)),
          void 0 !== s && e.colors.push(new le().fromBufferAttribute(s, t));
      function l(t, n, i, r) {
        const l =
            void 0 === s
              ? []
              : [e.colors[t].clone(), e.colors[n].clone(), e.colors[i].clone()],
          h =
            void 0 === o
              ? []
              : [
                  new G().fromBufferAttribute(o, t),
                  new G().fromBufferAttribute(o, n),
                  new G().fromBufferAttribute(o, i),
                ],
          u = new he(t, n, i, h, l, r);
        e.faces.push(u),
          void 0 !== a &&
            e.faceVertexUvs[0].push([
              new P().fromBufferAttribute(a, t),
              new P().fromBufferAttribute(a, n),
              new P().fromBufferAttribute(a, i),
            ]),
          void 0 !== c &&
            e.faceVertexUvs[1].push([
              new P().fromBufferAttribute(c, t),
              new P().fromBufferAttribute(c, n),
              new P().fromBufferAttribute(c, i),
            ]);
      }
      const h = t.groups;
      if (h.length > 0)
        for (let t = 0; t < h.length; t++) {
          const e = h[t],
            i = e.start;
          for (let t = i, r = i + e.count; t < r; t += 3)
            void 0 !== n
              ? l(n.getX(t), n.getX(t + 1), n.getX(t + 2), e.materialIndex)
              : l(t, t + 1, t + 2, e.materialIndex);
        }
      else if (void 0 !== n)
        for (let t = 0; t < n.count; t += 3)
          l(n.getX(t), n.getX(t + 1), n.getX(t + 2));
      else for (let t = 0; t < r.count; t += 3) l(t, t + 1, t + 2);
      return (
        this.computeFaceNormals(),
        null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()),
        null !== t.boundingSphere &&
          (this.boundingSphere = t.boundingSphere.clone()),
        this
      );
    },
    center: function () {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(Ho).negate(),
        this.translate(Ho.x, Ho.y, Ho.z),
        this
      );
    },
    normalize: function () {
      this.computeBoundingSphere();
      const t = this.boundingSphere.center,
        e = this.boundingSphere.radius,
        n = 0 === e ? 1 : 1 / e,
        i = new gt();
      return (
        i.set(
          n,
          0,
          0,
          -n * t.x,
          0,
          n,
          0,
          -n * t.y,
          0,
          0,
          n,
          -n * t.z,
          0,
          0,
          0,
          1
        ),
        this.applyMatrix4(i),
        this
      );
    },
    computeFaceNormals: function () {
      const t = new G(),
        e = new G();
      for (let n = 0, i = this.faces.length; n < i; n++) {
        const i = this.faces[n],
          r = this.vertices[i.a],
          o = this.vertices[i.b],
          s = this.vertices[i.c];
        t.subVectors(s, o),
          e.subVectors(r, o),
          t.cross(e),
          t.normalize(),
          i.normal.copy(t);
      }
    },
    computeVertexNormals: function (t = !0) {
      const e = new Array(this.vertices.length);
      for (let t = 0, n = this.vertices.length; t < n; t++) e[t] = new G();
      if (t) {
        const t = new G(),
          n = new G();
        for (let i = 0, r = this.faces.length; i < r; i++) {
          const r = this.faces[i],
            o = this.vertices[r.a],
            s = this.vertices[r.b],
            a = this.vertices[r.c];
          t.subVectors(a, s),
            n.subVectors(o, s),
            t.cross(n),
            e[r.a].add(t),
            e[r.b].add(t),
            e[r.c].add(t);
        }
      } else {
        this.computeFaceNormals();
        for (let t = 0, n = this.faces.length; t < n; t++) {
          const n = this.faces[t];
          e[n.a].add(n.normal), e[n.b].add(n.normal), e[n.c].add(n.normal);
        }
      }
      for (let t = 0, n = this.vertices.length; t < n; t++) e[t].normalize();
      for (let t = 0, n = this.faces.length; t < n; t++) {
        const n = this.faces[t],
          i = n.vertexNormals;
        3 === i.length
          ? (i[0].copy(e[n.a]), i[1].copy(e[n.b]), i[2].copy(e[n.c]))
          : ((i[0] = e[n.a].clone()),
            (i[1] = e[n.b].clone()),
            (i[2] = e[n.c].clone()));
      }
      this.faces.length > 0 && (this.normalsNeedUpdate = !0);
    },
    computeFlatVertexNormals: function () {
      this.computeFaceNormals();
      for (let t = 0, e = this.faces.length; t < e; t++) {
        const e = this.faces[t],
          n = e.vertexNormals;
        3 === n.length
          ? (n[0].copy(e.normal), n[1].copy(e.normal), n[2].copy(e.normal))
          : ((n[0] = e.normal.clone()),
            (n[1] = e.normal.clone()),
            (n[2] = e.normal.clone()));
      }
      this.faces.length > 0 && (this.normalsNeedUpdate = !0);
    },
    computeMorphNormals: function () {
      for (let t = 0, e = this.faces.length; t < e; t++) {
        const e = this.faces[t];
        e.__originalFaceNormal
          ? e.__originalFaceNormal.copy(e.normal)
          : (e.__originalFaceNormal = e.normal.clone()),
          e.__originalVertexNormals || (e.__originalVertexNormals = []);
        for (let t = 0, n = e.vertexNormals.length; t < n; t++)
          e.__originalVertexNormals[t]
            ? e.__originalVertexNormals[t].copy(e.vertexNormals[t])
            : (e.__originalVertexNormals[t] = e.vertexNormals[t].clone());
      }
      const t = new Fo();
      t.faces = this.faces;
      for (let e = 0, n = this.morphTargets.length; e < n; e++) {
        if (!this.morphNormals[e]) {
          (this.morphNormals[e] = {}),
            (this.morphNormals[e].faceNormals = []),
            (this.morphNormals[e].vertexNormals = []);
          const t = this.morphNormals[e].faceNormals,
            n = this.morphNormals[e].vertexNormals;
          for (let e = 0, i = this.faces.length; e < i; e++) {
            const e = new G(),
              i = { a: new G(), b: new G(), c: new G() };
            t.push(e), n.push(i);
          }
        }
        const n = this.morphNormals[e];
        (t.vertices = this.morphTargets[e].vertices),
          t.computeFaceNormals(),
          t.computeVertexNormals();
        for (let t = 0, e = this.faces.length; t < e; t++) {
          const e = this.faces[t],
            i = n.faceNormals[t],
            r = n.vertexNormals[t];
          i.copy(e.normal),
            r.a.copy(e.vertexNormals[0]),
            r.b.copy(e.vertexNormals[1]),
            r.c.copy(e.vertexNormals[2]);
        }
      }
      for (let t = 0, e = this.faces.length; t < e; t++) {
        const e = this.faces[t];
        (e.normal = e.__originalFaceNormal),
          (e.vertexNormals = e.__originalVertexNormals);
      }
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new W()),
        this.boundingBox.setFromPoints(this.vertices);
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new at()),
        this.boundingSphere.setFromPoints(this.vertices);
    },
    merge: function (t, e, n = 0) {
      if (!t || !t.isGeometry)
        return void console.error(
          "THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",
          t
        );
      let i;
      const r = this.vertices.length,
        o = this.vertices,
        s = t.vertices,
        a = this.faces,
        c = t.faces,
        l = this.colors,
        h = t.colors;
      void 0 !== e && (i = new O().getNormalMatrix(e));
      for (let t = 0, n = s.length; t < n; t++) {
        const n = s[t].clone();
        void 0 !== e && n.applyMatrix4(e), o.push(n);
      }
      for (let t = 0, e = h.length; t < e; t++) l.push(h[t].clone());
      for (let t = 0, e = c.length; t < e; t++) {
        const e = c[t];
        let o, s;
        const l = e.vertexNormals,
          h = e.vertexColors,
          u = new he(e.a + r, e.b + r, e.c + r);
        u.normal.copy(e.normal),
          void 0 !== i && u.normal.applyMatrix3(i).normalize();
        for (let t = 0, e = l.length; t < e; t++)
          (o = l[t].clone()),
            void 0 !== i && o.applyMatrix3(i).normalize(),
            u.vertexNormals.push(o);
        u.color.copy(e.color);
        for (let t = 0, e = h.length; t < e; t++)
          (s = h[t]), u.vertexColors.push(s.clone());
        (u.materialIndex = e.materialIndex + n), a.push(u);
      }
      for (let e = 0, n = t.faceVertexUvs.length; e < n; e++) {
        const n = t.faceVertexUvs[e];
        void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []);
        for (let t = 0, i = n.length; t < i; t++) {
          const i = n[t],
            r = [];
          for (let t = 0, e = i.length; t < e; t++) r.push(i[t].clone());
          this.faceVertexUvs[e].push(r);
        }
      }
    },
    mergeMesh: function (t) {
      t && t.isMesh
        ? (t.matrixAutoUpdate && t.updateMatrix(),
          this.merge(t.geometry, t.matrix))
        : console.error(
            "THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",
            t
          );
    },
    mergeVertices: function (t = 4) {
      const e = {},
        n = [],
        i = [],
        r = Math.pow(10, t);
      for (let t = 0, o = this.vertices.length; t < o; t++) {
        const o = this.vertices[t],
          s =
            Math.round(o.x * r) +
            "_" +
            Math.round(o.y * r) +
            "_" +
            Math.round(o.z * r);
        void 0 === e[s]
          ? ((e[s] = t), n.push(this.vertices[t]), (i[t] = n.length - 1))
          : (i[t] = i[e[s]]);
      }
      const o = [];
      for (let t = 0, e = this.faces.length; t < e; t++) {
        const e = this.faces[t];
        (e.a = i[e.a]), (e.b = i[e.b]), (e.c = i[e.c]);
        const n = [e.a, e.b, e.c];
        for (let e = 0; e < 3; e++)
          if (n[e] === n[(e + 1) % 3]) {
            o.push(t);
            break;
          }
      }
      for (let t = o.length - 1; t >= 0; t--) {
        const e = o[t];
        this.faces.splice(e, 1);
        for (let t = 0, n = this.faceVertexUvs.length; t < n; t++)
          this.faceVertexUvs[t].splice(e, 1);
      }
      const s = this.vertices.length - n.length;
      return (this.vertices = n), s;
    },
    setFromPoints: function (t) {
      this.vertices = [];
      for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e];
        this.vertices.push(new G(n.x, n.y, n.z || 0));
      }
      return this;
    },
    sortFacesByMaterialIndex: function () {
      const t = this.faces,
        e = t.length;
      for (let n = 0; n < e; n++) t[n]._id = n;
      t.sort(function (t, e) {
        return t.materialIndex - e.materialIndex;
      });
      const n = this.faceVertexUvs[0],
        i = this.faceVertexUvs[1];
      let r, o;
      n && n.length === e && (r = []), i && i.length === e && (o = []);
      for (let s = 0; s < e; s++) {
        const e = t[s]._id;
        r && r.push(n[e]), o && o.push(i[e]);
      }
      r && (this.faceVertexUvs[0] = r), o && (this.faceVertexUvs[1] = o);
    },
    toJSON: function () {
      const t = {
        metadata: {
          version: 4.5,
          type: "Geometry",
          generator: "Geometry.toJSON",
        },
      };
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        "" !== this.name && (t.name = this.name),
        void 0 !== this.parameters)
      ) {
        const e = this.parameters;
        for (const n in e) void 0 !== e[n] && (t[n] = e[n]);
        return t;
      }
      const e = [];
      for (let t = 0; t < this.vertices.length; t++) {
        const n = this.vertices[t];
        e.push(n.x, n.y, n.z);
      }
      const n = [],
        i = [],
        r = {},
        o = [],
        s = {},
        a = [],
        c = {};
      for (let t = 0; t < this.faces.length; t++) {
        const e = this.faces[t],
          i = !0,
          r = !1,
          o = void 0 !== this.faceVertexUvs[0][t],
          s = e.normal.length() > 0,
          a = e.vertexNormals.length > 0,
          c = 1 !== e.color.r || 1 !== e.color.g || 1 !== e.color.b,
          p = e.vertexColors.length > 0;
        let f = 0;
        if (
          ((f = l(f, 0, 0)),
          (f = l(f, 1, i)),
          (f = l(f, 2, r)),
          (f = l(f, 3, o)),
          (f = l(f, 4, s)),
          (f = l(f, 5, a)),
          (f = l(f, 6, c)),
          (f = l(f, 7, p)),
          n.push(f),
          n.push(e.a, e.b, e.c),
          n.push(e.materialIndex),
          o)
        ) {
          const e = this.faceVertexUvs[0][t];
          n.push(d(e[0]), d(e[1]), d(e[2]));
        }
        if ((s && n.push(h(e.normal)), a)) {
          const t = e.vertexNormals;
          n.push(h(t[0]), h(t[1]), h(t[2]));
        }
        if ((c && n.push(u(e.color)), p)) {
          const t = e.vertexColors;
          n.push(u(t[0]), u(t[1]), u(t[2]));
        }
      }
      function l(t, e, n) {
        return n ? t | (1 << e) : t & ~(1 << e);
      }
      function h(t) {
        const e = t.x.toString() + t.y.toString() + t.z.toString();
        return (
          void 0 !== r[e] || ((r[e] = i.length / 3), i.push(t.x, t.y, t.z)),
          r[e]
        );
      }
      function u(t) {
        const e = t.r.toString() + t.g.toString() + t.b.toString();
        return void 0 !== s[e] || ((s[e] = o.length), o.push(t.getHex())), s[e];
      }
      function d(t) {
        const e = t.x.toString() + t.y.toString();
        return (
          void 0 !== c[e] || ((c[e] = a.length / 2), a.push(t.x, t.y)), c[e]
        );
      }
      return (
        (t.data = {}),
        (t.data.vertices = e),
        (t.data.normals = i),
        o.length > 0 && (t.data.colors = o),
        a.length > 0 && (t.data.uvs = [a]),
        (t.data.faces = n),
        t
      );
    },
    clone: function () {
      return new Fo().copy(this);
    },
    copy: function (t) {
      (this.vertices = []),
        (this.colors = []),
        (this.faces = []),
        (this.faceVertexUvs = [[]]),
        (this.morphTargets = []),
        (this.morphNormals = []),
        (this.skinWeights = []),
        (this.skinIndices = []),
        (this.lineDistances = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.name = t.name);
      const e = t.vertices;
      for (let t = 0, n = e.length; t < n; t++)
        this.vertices.push(e[t].clone());
      const n = t.colors;
      for (let t = 0, e = n.length; t < e; t++) this.colors.push(n[t].clone());
      const i = t.faces;
      for (let t = 0, e = i.length; t < e; t++) this.faces.push(i[t].clone());
      for (let e = 0, n = t.faceVertexUvs.length; e < n; e++) {
        const n = t.faceVertexUvs[e];
        void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []);
        for (let t = 0, i = n.length; t < i; t++) {
          const i = n[t],
            r = [];
          for (let t = 0, e = i.length; t < e; t++) {
            const e = i[t];
            r.push(e.clone());
          }
          this.faceVertexUvs[e].push(r);
        }
      }
      const r = t.morphTargets;
      for (let t = 0, e = r.length; t < e; t++) {
        const e = {};
        if (((e.name = r[t].name), void 0 !== r[t].vertices)) {
          e.vertices = [];
          for (let n = 0, i = r[t].vertices.length; n < i; n++)
            e.vertices.push(r[t].vertices[n].clone());
        }
        if (void 0 !== r[t].normals) {
          e.normals = [];
          for (let n = 0, i = r[t].normals.length; n < i; n++)
            e.normals.push(r[t].normals[n].clone());
        }
        this.morphTargets.push(e);
      }
      const o = t.morphNormals;
      for (let t = 0, e = o.length; t < e; t++) {
        const e = {};
        if (void 0 !== o[t].vertexNormals) {
          e.vertexNormals = [];
          for (let n = 0, i = o[t].vertexNormals.length; n < i; n++) {
            const i = o[t].vertexNormals[n],
              r = {};
            (r.a = i.a.clone()),
              (r.b = i.b.clone()),
              (r.c = i.c.clone()),
              e.vertexNormals.push(r);
          }
        }
        if (void 0 !== o[t].faceNormals) {
          e.faceNormals = [];
          for (let n = 0, i = o[t].faceNormals.length; n < i; n++)
            e.faceNormals.push(o[t].faceNormals[n].clone());
        }
        this.morphNormals.push(e);
      }
      const s = t.skinWeights;
      for (let t = 0, e = s.length; t < e; t++)
        this.skinWeights.push(s[t].clone());
      const a = t.skinIndices;
      for (let t = 0, e = a.length; t < e; t++)
        this.skinIndices.push(a[t].clone());
      const c = t.lineDistances;
      for (let t = 0, e = c.length; t < e; t++) this.lineDistances.push(c[t]);
      const l = t.boundingBox;
      null !== l && (this.boundingBox = l.clone());
      const h = t.boundingSphere;
      return (
        null !== h && (this.boundingSphere = h.clone()),
        (this.elementsNeedUpdate = t.elementsNeedUpdate),
        (this.verticesNeedUpdate = t.verticesNeedUpdate),
        (this.uvsNeedUpdate = t.uvsNeedUpdate),
        (this.normalsNeedUpdate = t.normalsNeedUpdate),
        (this.colorsNeedUpdate = t.colorsNeedUpdate),
        (this.lineDistancesNeedUpdate = t.lineDistancesNeedUpdate),
        (this.groupsNeedUpdate = t.groupsNeedUpdate),
        this
      );
    },
    dispose: function () {
      this.dispatchEvent({ type: "dispose" });
    },
  })),
    new G(),
    new G(),
    new G(),
    new ne();
  function ko(t, e, n, i, r) {
    let o, s;
    if (
      r ===
      (function (t, e, n, i) {
        let r = 0;
        for (let o = e, s = n - i; o < n; o += i)
          (r += (t[s] - t[o]) * (t[o + 1] + t[s + 1])), (s = o);
        return r;
      })(t, e, n, i) >
        0
    )
      for (o = e; o < n; o += i) s = cs(o, t[o], t[o + 1], s);
    else for (o = n - i; o >= e; o -= i) s = cs(o, t[o], t[o + 1], s);
    return s && ns(s, s.next) && (ls(s), (s = s.next)), s;
  }
  function Go(t, e) {
    if (!t) return t;
    e || (e = t);
    let n,
      i = t;
    do {
      if (
        ((n = !1), i.steiner || (!ns(i, i.next) && 0 !== es(i.prev, i, i.next)))
      )
        i = i.next;
      else {
        if ((ls(i), (i = e = i.prev), i === i.next)) break;
        n = !0;
      }
    } while (n || i !== e);
    return e;
  }
  function Vo(t, e, n, i, r, o, s) {
    if (!t) return;
    !s &&
      o &&
      (function (t, e, n, i) {
        let r = t;
        do {
          null === r.z && (r.z = Qo(r.x, r.y, e, n, i)),
            (r.prevZ = r.prev),
            (r.nextZ = r.next),
            (r = r.next);
        } while (r !== t);
        (r.prevZ.nextZ = null),
          (r.prevZ = null),
          (function (t) {
            let e,
              n,
              i,
              r,
              o,
              s,
              a,
              c,
              l = 1;
            do {
              for (n = t, t = null, o = null, s = 0; n; ) {
                for (
                  s++, i = n, a = 0, e = 0;
                  e < l && (a++, (i = i.nextZ), i);
                  e++
                );
                for (c = l; a > 0 || (c > 0 && i); )
                  0 !== a && (0 === c || !i || n.z <= i.z)
                    ? ((r = n), (n = n.nextZ), a--)
                    : ((r = i), (i = i.nextZ), c--),
                    o ? (o.nextZ = r) : (t = r),
                    (r.prevZ = o),
                    (o = r);
                n = i;
              }
              (o.nextZ = null), (l *= 2);
            } while (s > 1);
          })(r);
      })(t, i, r, o);
    let a,
      c,
      l = t;
    for (; t.prev !== t.next; )
      if (((a = t.prev), (c = t.next), o ? Wo(t, i, r, o) : jo(t)))
        e.push(a.i / n),
          e.push(t.i / n),
          e.push(c.i / n),
          ls(t),
          (t = c.next),
          (l = c.next);
      else if ((t = c) === l) {
        s
          ? 1 === s
            ? Vo((t = qo(Go(t), e, n)), e, n, i, r, o, 2)
            : 2 === s && Xo(t, e, n, i, r, o)
          : Vo(Go(t), e, n, i, r, o, 1);
        break;
      }
  }
  function jo(t) {
    const e = t.prev,
      n = t,
      i = t.next;
    if (es(e, n, i) >= 0) return !1;
    let r = t.next.next;
    for (; r !== t.prev; ) {
      if (
        $o(e.x, e.y, n.x, n.y, i.x, i.y, r.x, r.y) &&
        es(r.prev, r, r.next) >= 0
      )
        return !1;
      r = r.next;
    }
    return !0;
  }
  function Wo(t, e, n, i) {
    const r = t.prev,
      o = t,
      s = t.next;
    if (es(r, o, s) >= 0) return !1;
    const a = r.x < o.x ? (r.x < s.x ? r.x : s.x) : o.x < s.x ? o.x : s.x,
      c = r.y < o.y ? (r.y < s.y ? r.y : s.y) : o.y < s.y ? o.y : s.y,
      l = r.x > o.x ? (r.x > s.x ? r.x : s.x) : o.x > s.x ? o.x : s.x,
      h = r.y > o.y ? (r.y > s.y ? r.y : s.y) : o.y > s.y ? o.y : s.y,
      u = Qo(a, c, e, n, i),
      d = Qo(l, h, e, n, i);
    let p = t.prevZ,
      f = t.nextZ;
    for (; p && p.z >= u && f && f.z <= d; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        $o(r.x, r.y, o.x, o.y, s.x, s.y, p.x, p.y) &&
        es(p.prev, p, p.next) >= 0
      )
        return !1;
      if (
        ((p = p.prevZ),
        f !== t.prev &&
          f !== t.next &&
          $o(r.x, r.y, o.x, o.y, s.x, s.y, f.x, f.y) &&
          es(f.prev, f, f.next) >= 0)
      )
        return !1;
      f = f.nextZ;
    }
    for (; p && p.z >= u; ) {
      if (
        p !== t.prev &&
        p !== t.next &&
        $o(r.x, r.y, o.x, o.y, s.x, s.y, p.x, p.y) &&
        es(p.prev, p, p.next) >= 0
      )
        return !1;
      p = p.prevZ;
    }
    for (; f && f.z <= d; ) {
      if (
        f !== t.prev &&
        f !== t.next &&
        $o(r.x, r.y, o.x, o.y, s.x, s.y, f.x, f.y) &&
        es(f.prev, f, f.next) >= 0
      )
        return !1;
      f = f.nextZ;
    }
    return !0;
  }
  function qo(t, e, n) {
    let i = t;
    do {
      const r = i.prev,
        o = i.next.next;
      !ns(r, o) &&
        is(r, i, i.next, o) &&
        ss(r, o) &&
        ss(o, r) &&
        (e.push(r.i / n),
        e.push(i.i / n),
        e.push(o.i / n),
        ls(i),
        ls(i.next),
        (i = t = o)),
        (i = i.next);
    } while (i !== t);
    return Go(i);
  }
  function Xo(t, e, n, i, r, o) {
    let s = t;
    do {
      let t = s.next.next;
      for (; t !== s.prev; ) {
        if (s.i !== t.i && ts(s, t)) {
          let a = as(s, t);
          return (
            (s = Go(s, s.next)),
            (a = Go(a, a.next)),
            Vo(s, e, n, i, r, o),
            void Vo(a, e, n, i, r, o)
          );
        }
        t = t.next;
      }
      s = s.next;
    } while (s !== t);
  }
  function Yo(t, e) {
    return t.x - e.x;
  }
  function Zo(t, e) {
    if (
      (e = (function (t, e) {
        let n = e;
        const i = t.x,
          r = t.y;
        let o,
          s = -1 / 0;
        do {
          if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
            const t = n.x + ((r - n.y) * (n.next.x - n.x)) / (n.next.y - n.y);
            if (t <= i && t > s) {
              if (((s = t), t === i)) {
                if (r === n.y) return n;
                if (r === n.next.y) return n.next;
              }
              o = n.x < n.next.x ? n : n.next;
            }
          }
          n = n.next;
        } while (n !== e);
        if (!o) return null;
        if (i === s) return o;
        const a = o,
          c = o.x,
          l = o.y;
        let h,
          u = 1 / 0;
        n = o;
        do {
          i >= n.x &&
            n.x >= c &&
            i !== n.x &&
            $o(r < l ? i : s, r, c, l, r < l ? s : i, r, n.x, n.y) &&
            ((h = Math.abs(r - n.y) / (i - n.x)),
            ss(n, t) &&
              (h < u ||
                (h === u && (n.x > o.x || (n.x === o.x && Jo(o, n))))) &&
              ((o = n), (u = h))),
            (n = n.next);
        } while (n !== a);
        return o;
      })(t, e))
    ) {
      const n = as(e, t);
      Go(e, e.next), Go(n, n.next);
    }
  }
  function Jo(t, e) {
    return es(t.prev, t, e.prev) < 0 && es(e.next, t, t.next) < 0;
  }
  function Qo(t, e, n, i, r) {
    return (
      (t =
        1431655765 &
        ((t =
          858993459 &
          ((t =
            252645135 &
            ((t = 16711935 & ((t = 32767 * (t - n) * r) | (t << 8))) |
              (t << 4))) |
            (t << 2))) |
          (t << 1))) |
      ((e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = 32767 * (e - i) * r) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) <<
        1)
    );
  }
  function Ko(t) {
    let e = t,
      n = t;
    do {
      (e.x < n.x || (e.x === n.x && e.y < n.y)) && (n = e), (e = e.next);
    } while (e !== t);
    return n;
  }
  function $o(t, e, n, i, r, o, s, a) {
    return (
      (r - s) * (e - a) - (t - s) * (o - a) >= 0 &&
      (t - s) * (i - a) - (n - s) * (e - a) >= 0 &&
      (n - s) * (o - a) - (r - s) * (i - a) >= 0
    );
  }
  function ts(t, e) {
    return (
      t.next.i !== e.i &&
      t.prev.i !== e.i &&
      !(function (t, e) {
        let n = t;
        do {
          if (
            n.i !== t.i &&
            n.next.i !== t.i &&
            n.i !== e.i &&
            n.next.i !== e.i &&
            is(n, n.next, t, e)
          )
            return !0;
          n = n.next;
        } while (n !== t);
        return !1;
      })(t, e) &&
      ((ss(t, e) &&
        ss(e, t) &&
        (function (t, e) {
          let n = t,
            i = !1;
          const r = (t.x + e.x) / 2,
            o = (t.y + e.y) / 2;
          do {
            n.y > o != n.next.y > o &&
              n.next.y !== n.y &&
              r < ((n.next.x - n.x) * (o - n.y)) / (n.next.y - n.y) + n.x &&
              (i = !i),
              (n = n.next);
          } while (n !== t);
          return i;
        })(t, e) &&
        (es(t.prev, t, e.prev) || es(t, e.prev, e))) ||
        (ns(t, e) && es(t.prev, t, t.next) > 0 && es(e.prev, e, e.next) > 0))
    );
  }
  function es(t, e, n) {
    return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y);
  }
  function ns(t, e) {
    return t.x === e.x && t.y === e.y;
  }
  function is(t, e, n, i) {
    const r = os(es(t, e, n)),
      o = os(es(t, e, i)),
      s = os(es(n, i, t)),
      a = os(es(n, i, e));
    return (
      (r !== o && s !== a) ||
      !(0 !== r || !rs(t, n, e)) ||
      !(0 !== o || !rs(t, i, e)) ||
      !(0 !== s || !rs(n, t, i)) ||
      !(0 !== a || !rs(n, e, i))
    );
  }
  function rs(t, e, n) {
    return (
      e.x <= Math.max(t.x, n.x) &&
      e.x >= Math.min(t.x, n.x) &&
      e.y <= Math.max(t.y, n.y) &&
      e.y >= Math.min(t.y, n.y)
    );
  }
  function os(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }
  function ss(t, e) {
    return es(t.prev, t, t.next) < 0
      ? es(t, e, t.next) >= 0 && es(t, t.prev, e) >= 0
      : es(t, e, t.prev) < 0 || es(t, t.next, e) < 0;
  }
  function as(t, e) {
    const n = new hs(t.i, t.x, t.y),
      i = new hs(e.i, e.x, e.y),
      r = t.next,
      o = e.prev;
    return (
      (t.next = e),
      (e.prev = t),
      (n.next = r),
      (r.prev = n),
      (i.next = n),
      (n.prev = i),
      (o.next = i),
      (i.prev = o),
      i
    );
  }
  function cs(t, e, n, i) {
    const r = new hs(t, e, n);
    return (
      i
        ? ((r.next = i.next), (r.prev = i), (i.next.prev = r), (i.next = r))
        : ((r.prev = r), (r.next = r)),
      r
    );
  }
  function ls(t) {
    (t.next.prev = t.prev),
      (t.prev.next = t.next),
      t.prevZ && (t.prevZ.nextZ = t.nextZ),
      t.nextZ && (t.nextZ.prevZ = t.prevZ);
  }
  function hs(t, e, n) {
    (this.i = t),
      (this.x = e),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  const us = {
    area: function (t) {
      const e = t.length;
      let n = 0;
      for (let i = e - 1, r = 0; r < e; i = r++)
        n += t[i].x * t[r].y - t[r].x * t[i].y;
      return 0.5 * n;
    },
    isClockWise: function (t) {
      return us.area(t) < 0;
    },
    triangulateShape: function (t, e) {
      const n = [],
        i = [],
        r = [];
      ds(t), ps(n, t);
      let o = t.length;
      e.forEach(ds);
      for (let t = 0; t < e.length; t++)
        i.push(o), (o += e[t].length), ps(n, e[t]);
      const s = (function (t, e, n) {
        n = n || 2;
        const i = e && e.length,
          r = i ? e[0] * n : t.length;
        let o = ko(t, 0, r, n, !0);
        const s = [];
        if (!o || o.next === o.prev) return s;
        let a, c, l, h, u, d, p;
        if (
          (i &&
            (o = (function (t, e, n, i) {
              const r = [];
              let o, s, a, c, l;
              for (o = 0, s = e.length; o < s; o++)
                (a = e[o] * i),
                  (c = o < s - 1 ? e[o + 1] * i : t.length),
                  (l = ko(t, a, c, i, !1)),
                  l === l.next && (l.steiner = !0),
                  r.push(Ko(l));
              for (r.sort(Yo), o = 0; o < r.length; o++)
                Zo(r[o], n), (n = Go(n, n.next));
              return n;
            })(t, e, o, n)),
          t.length > 80 * n)
        ) {
          (a = l = t[0]), (c = h = t[1]);
          for (let e = n; e < r; e += n)
            (u = t[e]),
              (d = t[e + 1]),
              u < a && (a = u),
              d < c && (c = d),
              u > l && (l = u),
              d > h && (h = d);
          (p = Math.max(l - a, h - c)), (p = 0 !== p ? 1 / p : 0);
        }
        return Vo(o, s, n, a, c, p), s;
      })(n, i);
      for (let t = 0; t < s.length; t += 3) r.push(s.slice(t, t + 3));
      return r;
    },
  };
  function ds(t) {
    const e = t.length;
    e > 2 && t[e - 1].equals(t[0]) && t.pop();
  }
  function ps(t, e) {
    for (let n = 0; n < e.length; n++) t.push(e[n].x), t.push(e[n].y);
  }
  class fs extends Ue {
    constructor(t, e) {
      super(),
        (this.type = "ExtrudeBufferGeometry"),
        (this.parameters = { shapes: t, options: e }),
        (t = Array.isArray(t) ? t : [t]);
      const n = this,
        i = [],
        r = [];
      for (let e = 0, n = t.length; e < n; e++) o(t[e]);
      function o(t) {
        const o = [],
          s = void 0 !== e.curveSegments ? e.curveSegments : 12,
          a = void 0 !== e.steps ? e.steps : 1;
        let c = void 0 !== e.depth ? e.depth : 100,
          l = void 0 === e.bevelEnabled || e.bevelEnabled,
          h = void 0 !== e.bevelThickness ? e.bevelThickness : 6,
          u = void 0 !== e.bevelSize ? e.bevelSize : h - 2,
          d = void 0 !== e.bevelOffset ? e.bevelOffset : 0,
          p = void 0 !== e.bevelSegments ? e.bevelSegments : 3;
        const f = e.extrudePath,
          m = void 0 !== e.UVGenerator ? e.UVGenerator : ms;
        void 0 !== e.amount &&
          (console.warn(
            "THREE.ExtrudeBufferGeometry: amount has been renamed to depth."
          ),
          (c = e.amount));
        let g,
          v,
          y,
          _,
          x,
          b = !1;
        f &&
          ((g = f.getSpacedPoints(a)),
          (b = !0),
          (l = !1),
          (v = f.computeFrenetFrames(a, !1)),
          (y = new G()),
          (_ = new G()),
          (x = new G())),
          l || ((p = 0), (h = 0), (u = 0), (d = 0));
        const w = t.extractPoints(s);
        let M = w.shape;
        const S = w.holes;
        if (!us.isClockWise(M)) {
          M = M.reverse();
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            us.isClockWise(e) && (S[t] = e.reverse());
          }
        }
        const E = us.triangulateShape(M, S),
          T = M;
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t];
          M = M.concat(e);
        }
        function A(t, e, n) {
          return (
            e || console.error("THREE.ExtrudeGeometry: vec does not exist"),
            e.clone().multiplyScalar(n).add(t)
          );
        }
        const L = M.length,
          C = E.length;
        function R(t, e, n) {
          let i, r, o;
          const s = t.x - e.x,
            a = t.y - e.y,
            c = n.x - t.x,
            l = n.y - t.y,
            h = s * s + a * a,
            u = s * l - a * c;
          if (Math.abs(u) > Number.EPSILON) {
            const u = Math.sqrt(h),
              d = Math.sqrt(c * c + l * l),
              p = e.x - a / u,
              f = e.y + s / u,
              m =
                ((n.x - l / d - p) * l - (n.y + c / d - f) * c) /
                (s * l - a * c);
            (i = p + s * m - t.x), (r = f + a * m - t.y);
            const g = i * i + r * r;
            if (g <= 2) return new P(i, r);
            o = Math.sqrt(g / 2);
          } else {
            let t = !1;
            s > Number.EPSILON
              ? c > Number.EPSILON && (t = !0)
              : s < -Number.EPSILON
              ? c < -Number.EPSILON && (t = !0)
              : Math.sign(a) === Math.sign(l) && (t = !0),
              t
                ? ((i = -a), (r = s), (o = Math.sqrt(h)))
                : ((i = s), (r = a), (o = Math.sqrt(h / 2)));
          }
          return new P(i / o, r / o);
        }
        const O = [];
        for (
          let t = 0, e = T.length, n = e - 1, i = t + 1;
          t < e;
          t++, n++, i++
        )
          n === e && (n = 0), i === e && (i = 0), (O[t] = R(T[t], T[n], T[i]));
        const N = [];
        let I,
          D = O.concat();
        for (let t = 0, e = S.length; t < e; t++) {
          const e = S[t];
          I = [];
          for (
            let t = 0, n = e.length, i = n - 1, r = t + 1;
            t < n;
            t++, i++, r++
          )
            i === n && (i = 0),
              r === n && (r = 0),
              (I[t] = R(e[t], e[i], e[r]));
          N.push(I), (D = D.concat(I));
        }
        for (let t = 0; t < p; t++) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d;
          for (let t = 0, e = T.length; t < e; t++) {
            const e = A(T[t], O[t], i);
            U(e.x, e.y, -n);
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            I = N[t];
            for (let t = 0, r = e.length; t < r; t++) {
              const r = A(e[t], I[t], i);
              U(r.x, r.y, -n);
            }
          }
        }
        const z = u + d;
        for (let t = 0; t < L; t++) {
          const e = l ? A(M[t], D[t], z) : M[t];
          b
            ? (_.copy(v.normals[0]).multiplyScalar(e.x),
              y.copy(v.binormals[0]).multiplyScalar(e.y),
              x.copy(g[0]).add(_).add(y),
              U(x.x, x.y, x.z))
            : U(e.x, e.y, 0);
        }
        for (let t = 1; t <= a; t++)
          for (let e = 0; e < L; e++) {
            const n = l ? A(M[e], D[e], z) : M[e];
            b
              ? (_.copy(v.normals[t]).multiplyScalar(n.x),
                y.copy(v.binormals[t]).multiplyScalar(n.y),
                x.copy(g[t]).add(_).add(y),
                U(x.x, x.y, x.z))
              : U(n.x, n.y, (c / a) * t);
          }
        for (let t = p - 1; t >= 0; t--) {
          const e = t / p,
            n = h * Math.cos((e * Math.PI) / 2),
            i = u * Math.sin((e * Math.PI) / 2) + d;
          for (let t = 0, e = T.length; t < e; t++) {
            const e = A(T[t], O[t], i);
            U(e.x, e.y, c + n);
          }
          for (let t = 0, e = S.length; t < e; t++) {
            const e = S[t];
            I = N[t];
            for (let t = 0, r = e.length; t < r; t++) {
              const r = A(e[t], I[t], i);
              b ? U(r.x, r.y + g[a - 1].y, g[a - 1].x + n) : U(r.x, r.y, c + n);
            }
          }
        }
        function B(t, e) {
          let n = t.length;
          for (; --n >= 0; ) {
            const i = n;
            let r = n - 1;
            r < 0 && (r = t.length - 1);
            for (let t = 0, n = a + 2 * p; t < n; t++) {
              const n = L * t,
                o = L * (t + 1);
              F(e + i + n, e + r + n, e + r + o, e + i + o);
            }
          }
        }
        function U(t, e, n) {
          o.push(t), o.push(e), o.push(n);
        }
        function H(t, e, r) {
          k(t), k(e), k(r);
          const o = i.length / 3,
            s = m.generateTopUV(n, i, o - 3, o - 2, o - 1);
          V(s[0]), V(s[1]), V(s[2]);
        }
        function F(t, e, r, o) {
          k(t), k(e), k(o), k(e), k(r), k(o);
          const s = i.length / 3,
            a = m.generateSideWallUV(n, i, s - 6, s - 3, s - 2, s - 1);
          V(a[0]), V(a[1]), V(a[3]), V(a[1]), V(a[2]), V(a[3]);
        }
        function k(t) {
          i.push(o[3 * t + 0]), i.push(o[3 * t + 1]), i.push(o[3 * t + 2]);
        }
        function V(t) {
          r.push(t.x), r.push(t.y);
        }
        !(function () {
          const t = i.length / 3;
          if (l) {
            let t = 0,
              e = L * t;
            for (let t = 0; t < C; t++) {
              const n = E[t];
              H(n[2] + e, n[1] + e, n[0] + e);
            }
            (t = a + 2 * p), (e = L * t);
            for (let t = 0; t < C; t++) {
              const n = E[t];
              H(n[0] + e, n[1] + e, n[2] + e);
            }
          } else {
            for (let t = 0; t < C; t++) {
              const e = E[t];
              H(e[2], e[1], e[0]);
            }
            for (let t = 0; t < C; t++) {
              const e = E[t];
              H(e[0] + L * a, e[1] + L * a, e[2] + L * a);
            }
          }
          n.addGroup(t, i.length / 3 - t, 0);
        })(),
          (function () {
            const t = i.length / 3;
            let e = 0;
            B(T, e), (e += T.length);
            for (let t = 0, n = S.length; t < n; t++) {
              const n = S[t];
              B(n, e), (e += n.length);
            }
            n.addGroup(t, i.length / 3 - t, 1);
          })();
      }
      this.setAttribute("position", new Ee(i, 3)),
        this.setAttribute("uv", new Ee(r, 2)),
        this.computeVertexNormals();
    }
    toJSON() {
      const t = Ue.prototype.toJSON.call(this);
      return (function (t, e, n) {
        if (((n.shapes = []), Array.isArray(t)))
          for (let e = 0, i = t.length; e < i; e++) {
            const i = t[e];
            n.shapes.push(i.uuid);
          }
        else n.shapes.push(t.uuid);
        return (
          void 0 !== e.extrudePath &&
            (n.options.extrudePath = e.extrudePath.toJSON()),
          n
        );
      })(this.parameters.shapes, this.parameters.options, t);
    }
  }
  const ms = {
    generateTopUV: function (t, e, n, i, r) {
      const o = e[3 * n],
        s = e[3 * n + 1],
        a = e[3 * i],
        c = e[3 * i + 1],
        l = e[3 * r],
        h = e[3 * r + 1];
      return [new P(o, s), new P(a, c), new P(l, h)];
    },
    generateSideWallUV: function (t, e, n, i, r, o) {
      const s = e[3 * n],
        a = e[3 * n + 1],
        c = e[3 * n + 2],
        l = e[3 * i],
        h = e[3 * i + 1],
        u = e[3 * i + 2],
        d = e[3 * r],
        p = e[3 * r + 1],
        f = e[3 * r + 2],
        m = e[3 * o],
        g = e[3 * o + 1],
        v = e[3 * o + 2];
      return Math.abs(a - h) < 0.01
        ? [new P(s, 1 - c), new P(l, 1 - u), new P(d, 1 - f), new P(m, 1 - v)]
        : [new P(a, 1 - c), new P(h, 1 - u), new P(p, 1 - f), new P(g, 1 - v)];
    },
  };
  class gs extends Fo {
    constructor(t, e) {
      super(),
        (this.type = "ExtrudeGeometry"),
        (this.parameters = { shapes: t, options: e }),
        this.fromBufferGeometry(new fs(t, e)),
        this.mergeVertices();
    }
    toJSON() {
      const t = super.toJSON();
      return (function (t, e, n) {
        if (((n.shapes = []), Array.isArray(t)))
          for (let e = 0, i = t.length; e < i; e++) {
            const i = t[e];
            n.shapes.push(i.uuid);
          }
        else n.shapes.push(t.uuid);
        return (
          void 0 !== e.extrudePath &&
            (n.options.extrudePath = e.extrudePath.toJSON()),
          n
        );
      })(this.parameters.shapes, this.parameters.options, t);
    }
  }
  function vs(t, e, n) {
    Ue.call(this),
      (this.type = "ParametricBufferGeometry"),
      (this.parameters = { func: t, slices: e, stacks: n });
    const i = [],
      r = [],
      o = [],
      s = [],
      a = 1e-5,
      c = new G(),
      l = new G(),
      h = new G(),
      u = new G(),
      d = new G();
    t.length < 3 &&
      console.error(
        "THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter."
      );
    const p = e + 1;
    for (let i = 0; i <= n; i++) {
      const p = i / n;
      for (let n = 0; n <= e; n++) {
        const i = n / e;
        t(i, p, l),
          r.push(l.x, l.y, l.z),
          i - a >= 0
            ? (t(i - a, p, h), u.subVectors(l, h))
            : (t(i + a, p, h), u.subVectors(h, l)),
          p - a >= 0
            ? (t(i, p - a, h), d.subVectors(l, h))
            : (t(i, p + a, h), d.subVectors(h, l)),
          c.crossVectors(u, d).normalize(),
          o.push(c.x, c.y, c.z),
          s.push(i, p);
      }
    }
    for (let t = 0; t < n; t++)
      for (let n = 0; n < e; n++) {
        const e = t * p + n,
          r = t * p + n + 1,
          o = (t + 1) * p + n + 1,
          s = (t + 1) * p + n;
        i.push(e, r, s), i.push(r, o, s);
      }
    this.setIndex(i),
      this.setAttribute("position", new Ee(r, 3)),
      this.setAttribute("normal", new Ee(o, 3)),
      this.setAttribute("uv", new Ee(s, 2));
  }
  function ys(t, e, n) {
    Fo.call(this),
      (this.type = "ParametricGeometry"),
      (this.parameters = { func: t, slices: e, stacks: n }),
      this.fromBufferGeometry(new vs(t, e, n)),
      this.mergeVertices();
  }
  (vs.prototype = Object.create(Ue.prototype)),
    (vs.prototype.constructor = vs),
    (ys.prototype = Object.create(Fo.prototype)),
    (ys.prototype.constructor = ys);
  class _s extends Ue {
    constructor(t, e = 12) {
      super(),
        (this.type = "ShapeBufferGeometry"),
        (this.parameters = { shapes: t, curveSegments: e });
      const n = [],
        i = [],
        r = [],
        o = [];
      let s = 0,
        a = 0;
      if (!1 === Array.isArray(t)) c(t);
      else
        for (let e = 0; e < t.length; e++)
          c(t[e]), this.addGroup(s, a, e), (s += a), (a = 0);
      function c(t) {
        const s = i.length / 3,
          c = t.extractPoints(e);
        let l = c.shape;
        const h = c.holes;
        !1 === us.isClockWise(l) && (l = l.reverse());
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t];
          !0 === us.isClockWise(e) && (h[t] = e.reverse());
        }
        const u = us.triangulateShape(l, h);
        for (let t = 0, e = h.length; t < e; t++) {
          const e = h[t];
          l = l.concat(e);
        }
        for (let t = 0, e = l.length; t < e; t++) {
          const e = l[t];
          i.push(e.x, e.y, 0), r.push(0, 0, 1), o.push(e.x, e.y);
        }
        for (let t = 0, e = u.length; t < e; t++) {
          const e = u[t],
            i = e[0] + s,
            r = e[1] + s,
            o = e[2] + s;
          n.push(i, r, o), (a += 3);
        }
      }
      this.setIndex(n),
        this.setAttribute("position", new Ee(i, 3)),
        this.setAttribute("normal", new Ee(r, 3)),
        this.setAttribute("uv", new Ee(o, 2));
    }
    toJSON() {
      const t = Ue.prototype.toJSON.call(this);
      return (function (t, e) {
        if (((e.shapes = []), Array.isArray(t)))
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            e.shapes.push(i.uuid);
          }
        else e.shapes.push(t.uuid);
        return e;
      })(this.parameters.shapes, t);
    }
  }
  class xs extends Fo {
    constructor(t, e) {
      super(),
        (this.type = "ShapeGeometry"),
        "object" == typeof e &&
          (console.warn(
            "THREE.ShapeGeometry: Options parameter has been removed."
          ),
          (e = e.curveSegments)),
        (this.parameters = { shapes: t, curveSegments: e }),
        this.fromBufferGeometry(new _s(t, e)),
        this.mergeVertices();
    }
    toJSON() {
      const t = Fo.prototype.toJSON.call(this);
      return (function (t, e) {
        if (((e.shapes = []), Array.isArray(t)))
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            e.shapes.push(i.uuid);
          }
        else e.shapes.push(t.uuid);
        return e;
      })(this.parameters.shapes, t);
    }
  }
  class bs extends fs {
    constructor(t, e = {}) {
      const n = e.font;
      if (!n || !n.isFont)
        return (
          console.error(
            "THREE.TextGeometry: font parameter is not an instance of THREE.Font."
          ),
          new Ue()
        );
      const i = n.generateShapes(t, e.size);
      (e.depth = void 0 !== e.height ? e.height : 50),
        void 0 === e.bevelThickness && (e.bevelThickness = 10),
        void 0 === e.bevelSize && (e.bevelSize = 8),
        void 0 === e.bevelEnabled && (e.bevelEnabled = !1),
        super(i, e),
        (this.type = "TextBufferGeometry");
    }
  }
  class ws extends Ue {
    constructor(t = 1, e = 0.4, n = 8, i = 6, r = 2 * Math.PI) {
      super(),
        (this.type = "TorusBufferGeometry"),
        (this.parameters = {
          radius: t,
          tube: e,
          radialSegments: n,
          tubularSegments: i,
          arc: r,
        }),
        (n = Math.floor(n)),
        (i = Math.floor(i));
      const o = [],
        s = [],
        a = [],
        c = [],
        l = new G(),
        h = new G(),
        u = new G();
      for (let o = 0; o <= n; o++)
        for (let d = 0; d <= i; d++) {
          const p = (d / i) * r,
            f = (o / n) * Math.PI * 2;
          (h.x = (t + e * Math.cos(f)) * Math.cos(p)),
            (h.y = (t + e * Math.cos(f)) * Math.sin(p)),
            (h.z = e * Math.sin(f)),
            s.push(h.x, h.y, h.z),
            (l.x = t * Math.cos(p)),
            (l.y = t * Math.sin(p)),
            u.subVectors(h, l).normalize(),
            a.push(u.x, u.y, u.z),
            c.push(d / i),
            c.push(o / n);
        }
      for (let t = 1; t <= n; t++)
        for (let e = 1; e <= i; e++) {
          const n = (i + 1) * t + e - 1,
            r = (i + 1) * (t - 1) + e - 1,
            s = (i + 1) * (t - 1) + e,
            a = (i + 1) * t + e;
          o.push(n, r, a), o.push(r, s, a);
        }
      this.setIndex(o),
        this.setAttribute("position", new Ee(s, 3)),
        this.setAttribute("normal", new Ee(a, 3)),
        this.setAttribute("uv", new Ee(c, 2));
    }
  }
  function Ms(t) {
    de.call(this),
      (this.type = "ShadowMaterial"),
      (this.color = new le(0)),
      (this.transparent = !0),
      this.setValues(t);
  }
  function Ss(t) {
    hn.call(this, t), (this.type = "RawShaderMaterial");
  }
  function Es(t) {
    de.call(this),
      (this.defines = { STANDARD: "" }),
      (this.type = "MeshStandardMaterial"),
      (this.color = new le(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new le(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapIntensity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      (this.vertexTangents = !1),
      this.setValues(t);
  }
  function Ts(t) {
    Es.call(this),
      (this.defines = { STANDARD: "", PHYSICAL: "" }),
      (this.type = "MeshPhysicalMaterial"),
      (this.clearcoat = 0),
      (this.clearcoatMap = null),
      (this.clearcoatRoughness = 0),
      (this.clearcoatRoughnessMap = null),
      (this.clearcoatNormalScale = new P(1, 1)),
      (this.clearcoatNormalMap = null),
      (this.reflectivity = 0.5),
      Object.defineProperty(this, "ior", {
        get: function () {
          return (1 + 0.4 * this.reflectivity) / (1 - 0.4 * this.reflectivity);
        },
        set: function (t) {
          this.reflectivity = R.clamp((2.5 * (t - 1)) / (t + 1), 0, 1);
        },
      }),
      (this.sheen = null),
      (this.transmission = 0),
      (this.transmissionMap = null),
      this.setValues(t);
  }
  function As(t) {
    de.call(this),
      (this.type = "MeshPhongMaterial"),
      (this.color = new le(16777215)),
      (this.specular = new le(1118481)),
      (this.shininess = 30),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new le(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      this.setValues(t);
  }
  function Ls(t) {
    de.call(this),
      (this.defines = { TOON: "" }),
      (this.type = "MeshToonMaterial"),
      (this.color = new le(16777215)),
      (this.map = null),
      (this.gradientMap = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new le(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.alphaMap = null),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      this.setValues(t);
  }
  function Cs(t) {
    de.call(this),
      (this.type = "MeshNormalMaterial"),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      this.setValues(t);
  }
  function Rs(t) {
    de.call(this),
      (this.type = "MeshLambertMaterial"),
      (this.color = new le(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new le(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.combine = 0),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      this.setValues(t);
  }
  function Ps(t) {
    de.call(this),
      (this.defines = { MATCAP: "" }),
      (this.type = "MeshMatcapMaterial"),
      (this.color = new le(16777215)),
      (this.matcap = null),
      (this.map = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = 0),
      (this.normalScale = new P(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.alphaMap = null),
      (this.skinning = !1),
      (this.morphTargets = !1),
      (this.morphNormals = !1),
      this.setValues(t);
  }
  function Os(t) {
    fo.call(this),
      (this.type = "LineDashedMaterial"),
      (this.scale = 1),
      (this.dashSize = 3),
      (this.gapSize = 1),
      this.setValues(t);
  }
  (Ms.prototype = Object.create(de.prototype)),
    (Ms.prototype.constructor = Ms),
    (Ms.prototype.isShadowMaterial = !0),
    (Ms.prototype.copy = function (t) {
      return de.prototype.copy.call(this, t), this.color.copy(t.color), this;
    }),
    (Ss.prototype = Object.create(hn.prototype)),
    (Ss.prototype.constructor = Ss),
    (Ss.prototype.isRawShaderMaterial = !0),
    (Es.prototype = Object.create(de.prototype)),
    (Es.prototype.constructor = Es),
    (Es.prototype.isMeshStandardMaterial = !0),
    (Es.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        (this.defines = { STANDARD: "" }),
        this.color.copy(t.color),
        (this.roughness = t.roughness),
        (this.metalness = t.metalness),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.roughnessMap = t.roughnessMap),
        (this.metalnessMap = t.metalnessMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.envMapIntensity = t.envMapIntensity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        (this.vertexTangents = t.vertexTangents),
        this
      );
    }),
    (Ts.prototype = Object.create(Es.prototype)),
    (Ts.prototype.constructor = Ts),
    (Ts.prototype.isMeshPhysicalMaterial = !0),
    (Ts.prototype.copy = function (t) {
      return (
        Es.prototype.copy.call(this, t),
        (this.defines = { STANDARD: "", PHYSICAL: "" }),
        (this.clearcoat = t.clearcoat),
        (this.clearcoatMap = t.clearcoatMap),
        (this.clearcoatRoughness = t.clearcoatRoughness),
        (this.clearcoatRoughnessMap = t.clearcoatRoughnessMap),
        (this.clearcoatNormalMap = t.clearcoatNormalMap),
        this.clearcoatNormalScale.copy(t.clearcoatNormalScale),
        (this.reflectivity = t.reflectivity),
        t.sheen
          ? (this.sheen = (this.sheen || new le()).copy(t.sheen))
          : (this.sheen = null),
        (this.transmission = t.transmission),
        (this.transmissionMap = t.transmissionMap),
        this
      );
    }),
    (As.prototype = Object.create(de.prototype)),
    (As.prototype.constructor = As),
    (As.prototype.isMeshPhongMaterial = !0),
    (As.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        this.specular.copy(t.specular),
        (this.shininess = t.shininess),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }),
    (Ls.prototype = Object.create(de.prototype)),
    (Ls.prototype.constructor = Ls),
    (Ls.prototype.isMeshToonMaterial = !0),
    (Ls.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.gradientMap = t.gradientMap),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }),
    (Cs.prototype = Object.create(de.prototype)),
    (Cs.prototype.constructor = Cs),
    (Cs.prototype.isMeshNormalMaterial = !0),
    (Cs.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }),
    (Rs.prototype = Object.create(de.prototype)),
    (Rs.prototype.constructor = Rs),
    (Rs.prototype.isMeshLambertMaterial = !0),
    (Rs.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        this.color.copy(t.color),
        (this.map = t.map),
        (this.lightMap = t.lightMap),
        (this.lightMapIntensity = t.lightMapIntensity),
        (this.aoMap = t.aoMap),
        (this.aoMapIntensity = t.aoMapIntensity),
        this.emissive.copy(t.emissive),
        (this.emissiveMap = t.emissiveMap),
        (this.emissiveIntensity = t.emissiveIntensity),
        (this.specularMap = t.specularMap),
        (this.alphaMap = t.alphaMap),
        (this.envMap = t.envMap),
        (this.combine = t.combine),
        (this.reflectivity = t.reflectivity),
        (this.refractionRatio = t.refractionRatio),
        (this.wireframe = t.wireframe),
        (this.wireframeLinewidth = t.wireframeLinewidth),
        (this.wireframeLinecap = t.wireframeLinecap),
        (this.wireframeLinejoin = t.wireframeLinejoin),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }),
    (Ps.prototype = Object.create(de.prototype)),
    (Ps.prototype.constructor = Ps),
    (Ps.prototype.isMeshMatcapMaterial = !0),
    (Ps.prototype.copy = function (t) {
      return (
        de.prototype.copy.call(this, t),
        (this.defines = { MATCAP: "" }),
        this.color.copy(t.color),
        (this.matcap = t.matcap),
        (this.map = t.map),
        (this.bumpMap = t.bumpMap),
        (this.bumpScale = t.bumpScale),
        (this.normalMap = t.normalMap),
        (this.normalMapType = t.normalMapType),
        this.normalScale.copy(t.normalScale),
        (this.displacementMap = t.displacementMap),
        (this.displacementScale = t.displacementScale),
        (this.displacementBias = t.displacementBias),
        (this.alphaMap = t.alphaMap),
        (this.skinning = t.skinning),
        (this.morphTargets = t.morphTargets),
        (this.morphNormals = t.morphNormals),
        this
      );
    }),
    (Os.prototype = Object.create(fo.prototype)),
    (Os.prototype.constructor = Os),
    (Os.prototype.isLineDashedMaterial = !0),
    (Os.prototype.copy = function (t) {
      return (
        fo.prototype.copy.call(this, t),
        (this.scale = t.scale),
        (this.dashSize = t.dashSize),
        (this.gapSize = t.gapSize),
        this
      );
    });
  var Ns = Object.freeze({
    __proto__: null,
    ShadowMaterial: Ms,
    SpriteMaterial: Nr,
    RawShaderMaterial: Ss,
    ShaderMaterial: hn,
    PointsMaterial: Eo,
    MeshPhysicalMaterial: Ts,
    MeshStandardMaterial: Es,
    MeshPhongMaterial: As,
    MeshToonMaterial: Ls,
    MeshNormalMaterial: Cs,
    MeshLambertMaterial: Rs,
    MeshDepthMaterial: gr,
    MeshDistanceMaterial: vr,
    MeshBasicMaterial: pe,
    MeshMatcapMaterial: Ps,
    LineDashedMaterial: Os,
    LineBasicMaterial: fo,
    Material: de,
  });
  const Is = {
    arraySlice: function (t, e, n) {
      return Is.isTypedArray(t)
        ? new t.constructor(t.subarray(e, void 0 !== n ? n : t.length))
        : t.slice(e, n);
    },
    convertArray: function (t, e, n) {
      return !t || (!n && t.constructor === e)
        ? t
        : "number" == typeof e.BYTES_PER_ELEMENT
        ? new e(t)
        : Array.prototype.slice.call(t);
    },
    isTypedArray: function (t) {
      return ArrayBuffer.isView(t) && !(t instanceof DataView);
    },
    getKeyframeOrder: function (t) {
      const e = t.length,
        n = new Array(e);
      for (let t = 0; t !== e; ++t) n[t] = t;
      return (
        n.sort(function (e, n) {
          return t[e] - t[n];
        }),
        n
      );
    },
    sortedArray: function (t, e, n) {
      const i = t.length,
        r = new t.constructor(i);
      for (let o = 0, s = 0; s !== i; ++o) {
        const i = n[o] * e;
        for (let n = 0; n !== e; ++n) r[s++] = t[i + n];
      }
      return r;
    },
    flattenJSON: function (t, e, n, i) {
      let r = 1,
        o = t[0];
      for (; void 0 !== o && void 0 === o[i]; ) o = t[r++];
      if (void 0 === o) return;
      let s = o[i];
      if (void 0 !== s)
        if (Array.isArray(s))
          do {
            (s = o[i]),
              void 0 !== s && (e.push(o.time), n.push.apply(n, s)),
              (o = t[r++]);
          } while (void 0 !== o);
        else if (void 0 !== s.toArray)
          do {
            (s = o[i]),
              void 0 !== s && (e.push(o.time), s.toArray(n, n.length)),
              (o = t[r++]);
          } while (void 0 !== o);
        else
          do {
            (s = o[i]),
              void 0 !== s && (e.push(o.time), n.push(s)),
              (o = t[r++]);
          } while (void 0 !== o);
    },
    subclip: function (t, e, n, i, r = 30) {
      const o = t.clone();
      o.name = e;
      const s = [];
      for (let t = 0; t < o.tracks.length; ++t) {
        const e = o.tracks[t],
          a = e.getValueSize(),
          c = [],
          l = [];
        for (let t = 0; t < e.times.length; ++t) {
          const o = e.times[t] * r;
          if (!(o < n || o >= i)) {
            c.push(e.times[t]);
            for (let n = 0; n < a; ++n) l.push(e.values[t * a + n]);
          }
        }
        0 !== c.length &&
          ((e.times = Is.convertArray(c, e.times.constructor)),
          (e.values = Is.convertArray(l, e.values.constructor)),
          s.push(e));
      }
      o.tracks = s;
      let a = 1 / 0;
      for (let t = 0; t < o.tracks.length; ++t)
        a > o.tracks[t].times[0] && (a = o.tracks[t].times[0]);
      for (let t = 0; t < o.tracks.length; ++t) o.tracks[t].shift(-1 * a);
      return o.resetDuration(), o;
    },
    makeClipAdditive: function (t, e = 0, n = t, i = 30) {
      i <= 0 && (i = 30);
      const r = n.tracks.length,
        o = e / i;
      for (let e = 0; e < r; ++e) {
        const i = n.tracks[e],
          r = i.ValueTypeName;
        if ("bool" === r || "string" === r) continue;
        const s = t.tracks.find(function (t) {
          return t.name === i.name && t.ValueTypeName === r;
        });
        if (void 0 === s) continue;
        let a = 0;
        const c = i.getValueSize();
        i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
          (a = c / 3);
        let l = 0;
        const h = s.getValueSize();
        s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline &&
          (l = h / 3);
        const u = i.times.length - 1;
        let d;
        if (o <= i.times[0]) {
          const t = a,
            e = c - a;
          d = Is.arraySlice(i.values, t, e);
        } else if (o >= i.times[u]) {
          const t = u * c + a,
            e = t + c - a;
          d = Is.arraySlice(i.values, t, e);
        } else {
          const t = i.createInterpolant(),
            e = a,
            n = c - a;
          t.evaluate(o), (d = Is.arraySlice(t.resultBuffer, e, n));
        }
        "quaternion" === r &&
          new k().fromArray(d).normalize().conjugate().toArray(d);
        const p = s.times.length;
        for (let t = 0; t < p; ++t) {
          const e = t * h + l;
          if ("quaternion" === r)
            k.multiplyQuaternionsFlat(s.values, e, d, 0, s.values, e);
          else {
            const t = h - 2 * l;
            for (let n = 0; n < t; ++n) s.values[e + n] -= d[n];
          }
        }
      }
      return (t.blendMode = 2501), t;
    },
  };
  function Ds(t, e, n, i) {
    (this.parameterPositions = t),
      (this._cachedIndex = 0),
      (this.resultBuffer = void 0 !== i ? i : new e.constructor(n)),
      (this.sampleValues = e),
      (this.valueSize = n);
  }
  function zs(t, e, n, i) {
    Ds.call(this, t, e, n, i),
      (this._weightPrev = -0),
      (this._offsetPrev = -0),
      (this._weightNext = -0),
      (this._offsetNext = -0);
  }
  function Bs(t, e, n, i) {
    Ds.call(this, t, e, n, i);
  }
  function Us(t, e, n, i) {
    Ds.call(this, t, e, n, i);
  }
  function Hs(t, e, n, i) {
    if (void 0 === t)
      throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === e || 0 === e.length)
      throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
    (this.name = t),
      (this.times = Is.convertArray(e, this.TimeBufferType)),
      (this.values = Is.convertArray(n, this.ValueBufferType)),
      this.setInterpolation(i || this.DefaultInterpolation);
  }
  function Fs(t, e, n) {
    Hs.call(this, t, e, n);
  }
  function ks(t, e, n, i) {
    Hs.call(this, t, e, n, i);
  }
  function Gs(t, e, n, i) {
    Hs.call(this, t, e, n, i);
  }
  function Vs(t, e, n, i) {
    Ds.call(this, t, e, n, i);
  }
  function js(t, e, n, i) {
    Hs.call(this, t, e, n, i);
  }
  function Ws(t, e, n, i) {
    Hs.call(this, t, e, n, i);
  }
  function qs(t, e, n, i) {
    Hs.call(this, t, e, n, i);
  }
  function Xs(t, e = -1, n, i = 2500) {
    (this.name = t),
      (this.tracks = n),
      (this.duration = e),
      (this.blendMode = i),
      (this.uuid = R.generateUUID()),
      this.duration < 0 && this.resetDuration();
  }
  function Ys(t) {
    if (void 0 === t.type)
      throw new Error(
        "THREE.KeyframeTrack: track type undefined, can not parse"
      );
    const e = (function (t) {
      switch (t.toLowerCase()) {
        case "scalar":
        case "double":
        case "float":
        case "number":
        case "integer":
          return Gs;
        case "vector":
        case "vector2":
        case "vector3":
        case "vector4":
          return qs;
        case "color":
          return ks;
        case "quaternion":
          return js;
        case "bool":
        case "boolean":
          return Fs;
        case "string":
          return Ws;
      }
      throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + t);
    })(t.type);
    if (void 0 === t.times) {
      const e = [],
        n = [];
      Is.flattenJSON(t.keys, e, n, "value"), (t.times = e), (t.values = n);
    }
    return void 0 !== e.parse
      ? e.parse(t)
      : new e(t.name, t.times, t.values, t.interpolation);
  }
  Object.assign(Ds.prototype, {
    evaluate: function (t) {
      const e = this.parameterPositions;
      let n = this._cachedIndex,
        i = e[n],
        r = e[n - 1];
      t: {
        e: {
          let o;
          n: {
            i: if (!(t < i)) {
              for (let o = n + 2; ; ) {
                if (void 0 === i) {
                  if (t < r) break i;
                  return (
                    (n = e.length),
                    (this._cachedIndex = n),
                    this.afterEnd_(n - 1, t, r)
                  );
                }
                if (n === o) break;
                if (((r = i), (i = e[++n]), t < i)) break e;
              }
              o = e.length;
              break n;
            }
            if (t >= r) break t;
            {
              const s = e[1];
              t < s && ((n = 2), (r = s));
              for (let o = n - 2; ; ) {
                if (void 0 === r)
                  return (this._cachedIndex = 0), this.beforeStart_(0, t, i);
                if (n === o) break;
                if (((i = r), (r = e[--n - 1]), t >= r)) break e;
              }
              (o = n), (n = 0);
            }
          }
          for (; n < o; ) {
            const i = (n + o) >>> 1;
            t < e[i] ? (o = i) : (n = i + 1);
          }
          if (((i = e[n]), (r = e[n - 1]), void 0 === r))
            return (this._cachedIndex = 0), this.beforeStart_(0, t, i);
          if (void 0 === i)
            return (
              (n = e.length),
              (this._cachedIndex = n),
              this.afterEnd_(n - 1, r, t)
            );
        }
        (this._cachedIndex = n), this.intervalChanged_(n, r, i);
      }
      return this.interpolate_(n, r, t, i);
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function () {
      return this.settings || this.DefaultSettings_;
    },
    copySampleValue_: function (t) {
      const e = this.resultBuffer,
        n = this.sampleValues,
        i = this.valueSize,
        r = t * i;
      for (let t = 0; t !== i; ++t) e[t] = n[r + t];
      return e;
    },
    interpolate_: function () {
      throw new Error("call to abstract method");
    },
    intervalChanged_: function () {},
  }),
    Object.assign(Ds.prototype, {
      beforeStart_: Ds.prototype.copySampleValue_,
      afterEnd_: Ds.prototype.copySampleValue_,
    }),
    (zs.prototype = Object.assign(Object.create(Ds.prototype), {
      constructor: zs,
      DefaultSettings_: { endingStart: _, endingEnd: _ },
      intervalChanged_: function (t, e, n) {
        const i = this.parameterPositions;
        let r = t - 2,
          o = t + 1,
          s = i[r],
          a = i[o];
        if (void 0 === s)
          switch (this.getSettings_().endingStart) {
            case x:
              (r = t), (s = 2 * e - n);
              break;
            case b:
              (r = i.length - 2), (s = e + i[r] - i[r + 1]);
              break;
            default:
              (r = t), (s = n);
          }
        if (void 0 === a)
          switch (this.getSettings_().endingEnd) {
            case x:
              (o = t), (a = 2 * n - e);
              break;
            case b:
              (o = 1), (a = n + i[1] - i[0]);
              break;
            default:
              (o = t - 1), (a = e);
          }
        const c = 0.5 * (n - e),
          l = this.valueSize;
        (this._weightPrev = c / (e - s)),
          (this._weightNext = c / (a - n)),
          (this._offsetPrev = r * l),
          (this._offsetNext = o * l);
      },
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          o = this.sampleValues,
          s = this.valueSize,
          a = t * s,
          c = a - s,
          l = this._offsetPrev,
          h = this._offsetNext,
          u = this._weightPrev,
          d = this._weightNext,
          p = (n - e) / (i - e),
          f = p * p,
          m = f * p,
          g = -u * m + 2 * u * f - u * p,
          v = (1 + u) * m + (-1.5 - 2 * u) * f + (-0.5 + u) * p + 1,
          y = (-1 - d) * m + (1.5 + d) * f + 0.5 * p,
          _ = d * m - d * f;
        for (let t = 0; t !== s; ++t)
          r[t] = g * o[l + t] + v * o[c + t] + y * o[a + t] + _ * o[h + t];
        return r;
      },
    })),
    (Bs.prototype = Object.assign(Object.create(Ds.prototype), {
      constructor: Bs,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          o = this.sampleValues,
          s = this.valueSize,
          a = t * s,
          c = a - s,
          l = (n - e) / (i - e),
          h = 1 - l;
        for (let t = 0; t !== s; ++t) r[t] = o[c + t] * h + o[a + t] * l;
        return r;
      },
    })),
    (Us.prototype = Object.assign(Object.create(Ds.prototype), {
      constructor: Us,
      interpolate_: function (t) {
        return this.copySampleValue_(t - 1);
      },
    })),
    Object.assign(Hs, {
      toJSON: function (t) {
        const e = t.constructor;
        let n;
        if (void 0 !== e.toJSON) n = e.toJSON(t);
        else {
          n = {
            name: t.name,
            times: Is.convertArray(t.times, Array),
            values: Is.convertArray(t.values, Array),
          };
          const e = t.getInterpolation();
          e !== t.DefaultInterpolation && (n.interpolation = e);
        }
        return (n.type = t.ValueTypeName), n;
      },
    }),
    Object.assign(Hs.prototype, {
      constructor: Hs,
      TimeBufferType: Float32Array,
      ValueBufferType: Float32Array,
      DefaultInterpolation: v,
      InterpolantFactoryMethodDiscrete: function (t) {
        return new Us(this.times, this.values, this.getValueSize(), t);
      },
      InterpolantFactoryMethodLinear: function (t) {
        return new Bs(this.times, this.values, this.getValueSize(), t);
      },
      InterpolantFactoryMethodSmooth: function (t) {
        return new zs(this.times, this.values, this.getValueSize(), t);
      },
      setInterpolation: function (t) {
        let e;
        switch (t) {
          case g:
            e = this.InterpolantFactoryMethodDiscrete;
            break;
          case v:
            e = this.InterpolantFactoryMethodLinear;
            break;
          case y:
            e = this.InterpolantFactoryMethodSmooth;
        }
        if (void 0 === e) {
          const e =
            "unsupported interpolation for " +
            this.ValueTypeName +
            " keyframe track named " +
            this.name;
          if (void 0 === this.createInterpolant) {
            if (t === this.DefaultInterpolation) throw new Error(e);
            this.setInterpolation(this.DefaultInterpolation);
          }
          return console.warn("THREE.KeyframeTrack:", e), this;
        }
        return (this.createInterpolant = e), this;
      },
      getInterpolation: function () {
        switch (this.createInterpolant) {
          case this.InterpolantFactoryMethodDiscrete:
            return g;
          case this.InterpolantFactoryMethodLinear:
            return v;
          case this.InterpolantFactoryMethodSmooth:
            return y;
        }
      },
      getValueSize: function () {
        return this.values.length / this.times.length;
      },
      shift: function (t) {
        if (0 !== t) {
          const e = this.times;
          for (let n = 0, i = e.length; n !== i; ++n) e[n] += t;
        }
        return this;
      },
      scale: function (t) {
        if (1 !== t) {
          const e = this.times;
          for (let n = 0, i = e.length; n !== i; ++n) e[n] *= t;
        }
        return this;
      },
      trim: function (t, e) {
        const n = this.times,
          i = n.length;
        let r = 0,
          o = i - 1;
        for (; r !== i && n[r] < t; ) ++r;
        for (; -1 !== o && n[o] > e; ) --o;
        if ((++o, 0 !== r || o !== i)) {
          r >= o && ((o = Math.max(o, 1)), (r = o - 1));
          const t = this.getValueSize();
          (this.times = Is.arraySlice(n, r, o)),
            (this.values = Is.arraySlice(this.values, r * t, o * t));
        }
        return this;
      },
      validate: function () {
        let t = !0;
        const e = this.getValueSize();
        e - Math.floor(e) != 0 &&
          (console.error(
            "THREE.KeyframeTrack: Invalid value size in track.",
            this
          ),
          (t = !1));
        const n = this.times,
          i = this.values,
          r = n.length;
        0 === r &&
          (console.error("THREE.KeyframeTrack: Track is empty.", this),
          (t = !1));
        let o = null;
        for (let e = 0; e !== r; e++) {
          const i = n[e];
          if ("number" == typeof i && isNaN(i)) {
            console.error(
              "THREE.KeyframeTrack: Time is not a valid number.",
              this,
              e,
              i
            ),
              (t = !1);
            break;
          }
          if (null !== o && o > i) {
            console.error(
              "THREE.KeyframeTrack: Out of order keys.",
              this,
              e,
              i,
              o
            ),
              (t = !1);
            break;
          }
          o = i;
        }
        if (void 0 !== i && Is.isTypedArray(i))
          for (let e = 0, n = i.length; e !== n; ++e) {
            const n = i[e];
            if (isNaN(n)) {
              console.error(
                "THREE.KeyframeTrack: Value is not a valid number.",
                this,
                e,
                n
              ),
                (t = !1);
              break;
            }
          }
        return t;
      },
      optimize: function () {
        const t = Is.arraySlice(this.times),
          e = Is.arraySlice(this.values),
          n = this.getValueSize(),
          i = this.getInterpolation() === y,
          r = t.length - 1;
        let o = 1;
        for (let s = 1; s < r; ++s) {
          let r = !1;
          const a = t[s];
          if (a !== t[s + 1] && (1 !== s || a !== a[0]))
            if (i) r = !0;
            else {
              const t = s * n,
                i = t - n,
                o = t + n;
              for (let s = 0; s !== n; ++s) {
                const n = e[t + s];
                if (n !== e[i + s] || n !== e[o + s]) {
                  r = !0;
                  break;
                }
              }
            }
          if (r) {
            if (s !== o) {
              t[o] = t[s];
              const i = s * n,
                r = o * n;
              for (let t = 0; t !== n; ++t) e[r + t] = e[i + t];
            }
            ++o;
          }
        }
        if (r > 0) {
          t[o] = t[r];
          for (let t = r * n, i = o * n, s = 0; s !== n; ++s)
            e[i + s] = e[t + s];
          ++o;
        }
        return (
          o !== t.length
            ? ((this.times = Is.arraySlice(t, 0, o)),
              (this.values = Is.arraySlice(e, 0, o * n)))
            : ((this.times = t), (this.values = e)),
          this
        );
      },
      clone: function () {
        const t = Is.arraySlice(this.times, 0),
          e = Is.arraySlice(this.values, 0),
          n = new (0, this.constructor)(this.name, t, e);
        return (n.createInterpolant = this.createInterpolant), n;
      },
    }),
    (Fs.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: Fs,
      ValueTypeName: "bool",
      ValueBufferType: Array,
      DefaultInterpolation: g,
      InterpolantFactoryMethodLinear: void 0,
      InterpolantFactoryMethodSmooth: void 0,
    })),
    (ks.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: ks,
      ValueTypeName: "color",
    })),
    (Gs.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: Gs,
      ValueTypeName: "number",
    })),
    (Vs.prototype = Object.assign(Object.create(Ds.prototype), {
      constructor: Vs,
      interpolate_: function (t, e, n, i) {
        const r = this.resultBuffer,
          o = this.sampleValues,
          s = this.valueSize,
          a = (n - e) / (i - e);
        let c = t * s;
        for (let t = c + s; c !== t; c += 4)
          k.slerpFlat(r, 0, o, c - s, o, c, a);
        return r;
      },
    })),
    (js.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: js,
      ValueTypeName: "quaternion",
      DefaultInterpolation: v,
      InterpolantFactoryMethodLinear: function (t) {
        return new Vs(this.times, this.values, this.getValueSize(), t);
      },
      InterpolantFactoryMethodSmooth: void 0,
    })),
    (Ws.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: Ws,
      ValueTypeName: "string",
      ValueBufferType: Array,
      DefaultInterpolation: g,
      InterpolantFactoryMethodLinear: void 0,
      InterpolantFactoryMethodSmooth: void 0,
    })),
    (qs.prototype = Object.assign(Object.create(Hs.prototype), {
      constructor: qs,
      ValueTypeName: "vector",
    })),
    Object.assign(Xs, {
      parse: function (t) {
        const e = [],
          n = t.tracks,
          i = 1 / (t.fps || 1);
        for (let t = 0, r = n.length; t !== r; ++t) e.push(Ys(n[t]).scale(i));
        const r = new Xs(t.name, t.duration, e, t.blendMode);
        return (r.uuid = t.uuid), r;
      },
      toJSON: function (t) {
        const e = [],
          n = t.tracks,
          i = {
            name: t.name,
            duration: t.duration,
            tracks: e,
            uuid: t.uuid,
            blendMode: t.blendMode,
          };
        for (let t = 0, i = n.length; t !== i; ++t) e.push(Hs.toJSON(n[t]));
        return i;
      },
      CreateFromMorphTargetSequence: function (t, e, n, i) {
        const r = e.length,
          o = [];
        for (let t = 0; t < r; t++) {
          let s = [],
            a = [];
          s.push((t + r - 1) % r, t, (t + 1) % r), a.push(0, 1, 0);
          const c = Is.getKeyframeOrder(s);
          (s = Is.sortedArray(s, 1, c)),
            (a = Is.sortedArray(a, 1, c)),
            i || 0 !== s[0] || (s.push(r), a.push(a[0])),
            o.push(
              new Gs(".morphTargetInfluences[" + e[t].name + "]", s, a).scale(
                1 / n
              )
            );
        }
        return new Xs(t, -1, o);
      },
      findByName: function (t, e) {
        let n = t;
        if (!Array.isArray(t)) {
          const e = t;
          n = (e.geometry && e.geometry.animations) || e.animations;
        }
        for (let t = 0; t < n.length; t++) if (n[t].name === e) return n[t];
        return null;
      },
      CreateClipsFromMorphTargetSequences: function (t, e, n) {
        const i = {},
          r = /^([\w-]*?)([\d]+)$/;
        for (let e = 0, n = t.length; e < n; e++) {
          const n = t[e],
            o = n.name.match(r);
          if (o && o.length > 1) {
            const t = o[1];
            let e = i[t];
            e || (i[t] = e = []), e.push(n);
          }
        }
        const o = [];
        for (const t in i)
          o.push(Xs.CreateFromMorphTargetSequence(t, i[t], e, n));
        return o;
      },
      parseAnimation: function (t, e) {
        if (!t)
          return (
            console.error(
              "THREE.AnimationClip: No animation in JSONLoader data."
            ),
            null
          );
        const n = function (t, e, n, i, r) {
            if (0 !== n.length) {
              const o = [],
                s = [];
              Is.flattenJSON(n, o, s, i),
                0 !== o.length && r.push(new t(e, o, s));
            }
          },
          i = [],
          r = t.name || "default",
          o = t.fps || 30,
          s = t.blendMode;
        let a = t.length || -1;
        const c = t.hierarchy || [];
        for (let t = 0; t < c.length; t++) {
          const r = c[t].keys;
          if (r && 0 !== r.length)
            if (r[0].morphTargets) {
              const t = {};
              let e;
              for (e = 0; e < r.length; e++)
                if (r[e].morphTargets)
                  for (let n = 0; n < r[e].morphTargets.length; n++)
                    t[r[e].morphTargets[n]] = -1;
              for (const n in t) {
                const t = [],
                  o = [];
                for (let i = 0; i !== r[e].morphTargets.length; ++i) {
                  const i = r[e];
                  t.push(i.time), o.push(i.morphTarget === n ? 1 : 0);
                }
                i.push(new Gs(".morphTargetInfluence[" + n + "]", t, o));
              }
              a = t.length * (o || 1);
            } else {
              const o = ".bones[" + e[t].name + "]";
              n(qs, o + ".position", r, "pos", i),
                n(js, o + ".quaternion", r, "rot", i),
                n(qs, o + ".scale", r, "scl", i);
            }
        }
        return 0 === i.length ? null : new Xs(r, a, i, s);
      },
    }),
    Object.assign(Xs.prototype, {
      resetDuration: function () {
        let t = 0;
        for (let e = 0, n = this.tracks.length; e !== n; ++e) {
          const n = this.tracks[e];
          t = Math.max(t, n.times[n.times.length - 1]);
        }
        return (this.duration = t), this;
      },
      trim: function () {
        for (let t = 0; t < this.tracks.length; t++)
          this.tracks[t].trim(0, this.duration);
        return this;
      },
      validate: function () {
        let t = !0;
        for (let e = 0; e < this.tracks.length; e++)
          t = t && this.tracks[e].validate();
        return t;
      },
      optimize: function () {
        for (let t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
        return this;
      },
      clone: function () {
        const t = [];
        for (let e = 0; e < this.tracks.length; e++)
          t.push(this.tracks[e].clone());
        return new Xs(this.name, this.duration, t, this.blendMode);
      },
      toJSON: function () {
        return Xs.toJSON(this);
      },
    });
  const Zs = {
    enabled: !1,
    files: {},
    add: function (t, e) {
      !1 !== this.enabled && (this.files[t] = e);
    },
    get: function (t) {
      if (!1 !== this.enabled) return this.files[t];
    },
    remove: function (t) {
      delete this.files[t];
    },
    clear: function () {
      this.files = {};
    },
  };
  const Js = new (function (t, e, n) {
    const i = this;
    let r,
      o = !1,
      s = 0,
      a = 0;
    const c = [];
    (this.onStart = void 0),
      (this.onLoad = t),
      (this.onProgress = e),
      (this.onError = n),
      (this.itemStart = function (t) {
        a++, !1 === o && void 0 !== i.onStart && i.onStart(t, s, a), (o = !0);
      }),
      (this.itemEnd = function (t) {
        s++,
          void 0 !== i.onProgress && i.onProgress(t, s, a),
          s === a && ((o = !1), void 0 !== i.onLoad && i.onLoad());
      }),
      (this.itemError = function (t) {
        void 0 !== i.onError && i.onError(t);
      }),
      (this.resolveURL = function (t) {
        return r ? r(t) : t;
      }),
      (this.setURLModifier = function (t) {
        return (r = t), this;
      }),
      (this.addHandler = function (t, e) {
        return c.push(t, e), this;
      }),
      (this.removeHandler = function (t) {
        const e = c.indexOf(t);
        return -1 !== e && c.splice(e, 2), this;
      }),
      (this.getHandler = function (t) {
        for (let e = 0, n = c.length; e < n; e += 2) {
          const n = c[e],
            i = c[e + 1];
          if ((n.global && (n.lastIndex = 0), n.test(t))) return i;
        }
        return null;
      });
  })();
  function Qs(t) {
    (this.manager = void 0 !== t ? t : Js),
      (this.crossOrigin = "anonymous"),
      (this.withCredentials = !1),
      (this.path = ""),
      (this.resourcePath = ""),
      (this.requestHeader = {});
  }
  Object.assign(Qs.prototype, {
    load: function () {},
    loadAsync: function (t, e) {
      const n = this;
      return new Promise(function (i, r) {
        n.load(t, i, e, r);
      });
    },
    parse: function () {},
    setCrossOrigin: function (t) {
      return (this.crossOrigin = t), this;
    },
    setWithCredentials: function (t) {
      return (this.withCredentials = t), this;
    },
    setPath: function (t) {
      return (this.path = t), this;
    },
    setResourcePath: function (t) {
      return (this.resourcePath = t), this;
    },
    setRequestHeader: function (t) {
      return (this.requestHeader = t), this;
    },
  });
  const Ks = {};
  function $s(t) {
    Qs.call(this, t);
  }
  function ta(t) {
    Qs.call(this, t);
  }
  function ea(t) {
    Qs.call(this, t);
  }
  function na(t) {
    Qs.call(this, t);
  }
  function ia(t) {
    Qs.call(this, t);
  }
  function ra(t) {
    Qs.call(this, t);
  }
  function oa(t) {
    Qs.call(this, t);
  }
  function sa() {
    (this.type = "Curve"), (this.arcLengthDivisions = 200);
  }
  function aa(t, e, n, i, r, o, s, a) {
    sa.call(this),
      (this.type = "EllipseCurve"),
      (this.aX = t || 0),
      (this.aY = e || 0),
      (this.xRadius = n || 1),
      (this.yRadius = i || 1),
      (this.aStartAngle = r || 0),
      (this.aEndAngle = o || 2 * Math.PI),
      (this.aClockwise = s || !1),
      (this.aRotation = a || 0);
  }
  function ca(t, e, n, i, r, o) {
    aa.call(this, t, e, n, n, i, r, o), (this.type = "ArcCurve");
  }
  function la() {
    let t = 0,
      e = 0,
      n = 0,
      i = 0;
    function r(r, o, s, a) {
      (t = r),
        (e = s),
        (n = -3 * r + 3 * o - 2 * s - a),
        (i = 2 * r - 2 * o + s + a);
    }
    return {
      initCatmullRom: function (t, e, n, i, o) {
        r(e, n, o * (n - t), o * (i - e));
      },
      initNonuniformCatmullRom: function (t, e, n, i, o, s, a) {
        let c = (e - t) / o - (n - t) / (o + s) + (n - e) / s,
          l = (n - e) / s - (i - e) / (s + a) + (i - n) / a;
        (c *= s), (l *= s), r(e, n, c, l);
      },
      calc: function (r) {
        const o = r * r;
        return t + e * r + n * o + i * (o * r);
      },
    };
  }
  ($s.prototype = Object.assign(Object.create(Qs.prototype), {
    constructor: $s,
    load: function (t, e, n, i) {
      void 0 === t && (t = ""),
        void 0 !== this.path && (t = this.path + t),
        (t = this.manager.resolveURL(t));
      const r = this,
        o = Zs.get(t);
      if (void 0 !== o)
        return (
          r.manager.itemStart(t),
          setTimeout(function () {
            e && e(o), r.manager.itemEnd(t);
          }, 0),
          o
        );
      if (void 0 !== Ks[t])
        return void Ks[t].push({ onLoad: e, onProgress: n, onError: i });
      const s = t.match(/^data:(.*?)(;base64)?,(.*)$/);
      let a;
      if (s) {
        const n = s[1],
          o = !!s[2];
        let a = s[3];
        (a = decodeURIComponent(a)), o && (a = atob(a));
        try {
          let i;
          const o = (this.responseType || "").toLowerCase();
          switch (o) {
            case "arraybuffer":
            case "blob":
              const t = new Uint8Array(a.length);
              for (let e = 0; e < a.length; e++) t[e] = a.charCodeAt(e);
              i = "blob" === o ? new Blob([t.buffer], { type: n }) : t.buffer;
              break;
            case "document":
              const e = new DOMParser();
              i = e.parseFromString(a, n);
              break;
            case "json":
              i = JSON.parse(a);
              break;
            default:
              i = a;
          }
          setTimeout(function () {
            e && e(i), r.manager.itemEnd(t);
          }, 0);
        } catch (e) {
          setTimeout(function () {
            i && i(e), r.manager.itemError(t), r.manager.itemEnd(t);
          }, 0);
        }
      } else {
        (Ks[t] = []),
          Ks[t].push({ onLoad: e, onProgress: n, onError: i }),
          (a = new XMLHttpRequest()),
          a.open("GET", t, !0),
          a.addEventListener(
            "load",
            function (e) {
              const n = this.response,
                i = Ks[t];
              if ((delete Ks[t], 200 === this.status || 0 === this.status)) {
                0 === this.status &&
                  console.warn("THREE.FileLoader: HTTP Status 0 received."),
                  Zs.add(t, n);
                for (let t = 0, e = i.length; t < e; t++) {
                  const e = i[t];
                  e.onLoad && e.onLoad(n);
                }
                r.manager.itemEnd(t);
              } else {
                for (let t = 0, n = i.length; t < n; t++) {
                  const n = i[t];
                  n.onError && n.onError(e);
                }
                r.manager.itemError(t), r.manager.itemEnd(t);
              }
            },
            !1
          ),
          a.addEventListener(
            "progress",
            function (e) {
              const n = Ks[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onProgress && i.onProgress(e);
              }
            },
            !1
          ),
          a.addEventListener(
            "error",
            function (e) {
              const n = Ks[t];
              delete Ks[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onError && i.onError(e);
              }
              r.manager.itemError(t), r.manager.itemEnd(t);
            },
            !1
          ),
          a.addEventListener(
            "abort",
            function (e) {
              const n = Ks[t];
              delete Ks[t];
              for (let t = 0, i = n.length; t < i; t++) {
                const i = n[t];
                i.onError && i.onError(e);
              }
              r.manager.itemError(t), r.manager.itemEnd(t);
            },
            !1
          ),
          void 0 !== this.responseType && (a.responseType = this.responseType),
          void 0 !== this.withCredentials &&
            (a.withCredentials = this.withCredentials),
          a.overrideMimeType &&
            a.overrideMimeType(
              void 0 !== this.mimeType ? this.mimeType : "text/plain"
            );
        for (const t in this.requestHeader)
          a.setRequestHeader(t, this.requestHeader[t]);
        a.send(null);
      }
      return r.manager.itemStart(t), a;
    },
    setResponseType: function (t) {
      return (this.responseType = t), this;
    },
    setMimeType: function (t) {
      return (this.mimeType = t), this;
    },
  })),
    (ta.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: ta,
      load: function (t, e, n, i) {
        const r = this,
          o = new $s(r.manager);
        o.setPath(r.path),
          o.setRequestHeader(r.requestHeader),
          o.setWithCredentials(r.withCredentials),
          o.load(
            t,
            function (n) {
              try {
                e(r.parse(JSON.parse(n)));
              } catch (e) {
                i ? i(e) : console.error(e), r.manager.itemError(t);
              }
            },
            n,
            i
          );
      },
      parse: function (t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = Xs.parse(t[n]);
          e.push(i);
        }
        return e;
      },
    })),
    (ea.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: ea,
      load: function (t, e, n, i) {
        const r = this,
          s = [],
          a = new No(),
          c = new $s(this.manager);
        c.setPath(this.path),
          c.setResponseType("arraybuffer"),
          c.setRequestHeader(this.requestHeader),
          c.setWithCredentials(r.withCredentials);
        let l = 0;
        function h(h) {
          c.load(
            t[h],
            function (t) {
              const n = r.parse(t, !0);
              (s[h] = {
                width: n.width,
                height: n.height,
                format: n.format,
                mipmaps: n.mipmaps,
              }),
                (l += 1),
                6 === l &&
                  (1 === n.mipmapCount && (a.minFilter = o),
                  (a.image = s),
                  (a.format = n.format),
                  (a.needsUpdate = !0),
                  e && e(a));
            },
            n,
            i
          );
        }
        if (Array.isArray(t)) for (let e = 0, n = t.length; e < n; ++e) h(e);
        else
          c.load(
            t,
            function (t) {
              const n = r.parse(t, !0);
              if (n.isCubemap) {
                const t = n.mipmaps.length / n.mipmapCount;
                for (let e = 0; e < t; e++) {
                  s[e] = { mipmaps: [] };
                  for (let t = 0; t < n.mipmapCount; t++)
                    s[e].mipmaps.push(n.mipmaps[e * n.mipmapCount + t]),
                      (s[e].format = n.format),
                      (s[e].width = n.width),
                      (s[e].height = n.height);
                }
                a.image = s;
              } else
                (a.image.width = n.width),
                  (a.image.height = n.height),
                  (a.mipmaps = n.mipmaps);
              1 === n.mipmapCount && (a.minFilter = o),
                (a.format = n.format),
                (a.needsUpdate = !0),
                e && e(a);
            },
            n,
            i
          );
        return a;
      },
    })),
    (na.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: na,
      load: function (t, e, n, i) {
        void 0 !== this.path && (t = this.path + t),
          (t = this.manager.resolveURL(t));
        const r = this,
          o = Zs.get(t);
        if (void 0 !== o)
          return (
            r.manager.itemStart(t),
            setTimeout(function () {
              e && e(o), r.manager.itemEnd(t);
            }, 0),
            o
          );
        const s = document.createElementNS(
          "http://www.w3.org/1999/xhtml",
          "img"
        );
        function a() {
          s.removeEventListener("load", a, !1),
            s.removeEventListener("error", c, !1),
            Zs.add(t, this),
            e && e(this),
            r.manager.itemEnd(t);
        }
        function c(e) {
          s.removeEventListener("load", a, !1),
            s.removeEventListener("error", c, !1),
            i && i(e),
            r.manager.itemError(t),
            r.manager.itemEnd(t);
        }
        return (
          s.addEventListener("load", a, !1),
          s.addEventListener("error", c, !1),
          "data:" !== t.substr(0, 5) &&
            void 0 !== this.crossOrigin &&
            (s.crossOrigin = this.crossOrigin),
          r.manager.itemStart(t),
          (s.src = t),
          s
        );
      },
    })),
    (ia.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: ia,
      load: function (t, e, n, i) {
        const r = new mn(),
          o = new na(this.manager);
        o.setCrossOrigin(this.crossOrigin), o.setPath(this.path);
        let s = 0;
        function a(n) {
          o.load(
            t[n],
            function (t) {
              (r.images[n] = t),
                s++,
                6 === s && ((r.needsUpdate = !0), e && e(r));
            },
            void 0,
            i
          );
        }
        for (let e = 0; e < t.length; ++e) a(e);
        return r;
      },
    })),
    (ra.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: ra,
      load: function (t, e, i, r) {
        const a = this,
          c = new vn(),
          l = new $s(this.manager);
        return (
          l.setResponseType("arraybuffer"),
          l.setRequestHeader(this.requestHeader),
          l.setPath(this.path),
          l.setWithCredentials(a.withCredentials),
          l.load(
            t,
            function (t) {
              const i = a.parse(t);
              i &&
                (void 0 !== i.image
                  ? (c.image = i.image)
                  : void 0 !== i.data &&
                    ((c.image.width = i.width),
                    (c.image.height = i.height),
                    (c.image.data = i.data)),
                (c.wrapS = void 0 !== i.wrapS ? i.wrapS : n),
                (c.wrapT = void 0 !== i.wrapT ? i.wrapT : n),
                (c.magFilter = void 0 !== i.magFilter ? i.magFilter : o),
                (c.minFilter = void 0 !== i.minFilter ? i.minFilter : o),
                (c.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1),
                void 0 !== i.format && (c.format = i.format),
                void 0 !== i.type && (c.type = i.type),
                void 0 !== i.mipmaps &&
                  ((c.mipmaps = i.mipmaps), (c.minFilter = s)),
                1 === i.mipmapCount && (c.minFilter = o),
                (c.needsUpdate = !0),
                e && e(c, i));
            },
            i,
            r
          ),
          c
        );
      },
    })),
    (oa.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: oa,
      load: function (t, e, n, i) {
        const r = new z(),
          o = new na(this.manager);
        return (
          o.setCrossOrigin(this.crossOrigin),
          o.setPath(this.path),
          o.load(
            t,
            function (n) {
              r.image = n;
              const i =
                t.search(/\.jpe?g($|\?)/i) > 0 ||
                0 === t.search(/^data\:image\/jpeg/);
              (r.format = i ? d : p),
                (r.needsUpdate = !0),
                void 0 !== e && e(r);
            },
            n,
            i
          ),
          r
        );
      },
    })),
    Object.assign(sa.prototype, {
      getPoint: function () {
        return console.warn("THREE.Curve: .getPoint() not implemented."), null;
      },
      getPointAt: function (t, e) {
        const n = this.getUtoTmapping(t);
        return this.getPoint(n, e);
      },
      getPoints: function (t = 5) {
        const e = [];
        for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
        return e;
      },
      getSpacedPoints: function (t = 5) {
        const e = [];
        for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
        return e;
      },
      getLength: function () {
        const t = this.getLengths();
        return t[t.length - 1];
      },
      getLengths: function (t) {
        if (
          (void 0 === t && (t = this.arcLengthDivisions),
          this.cacheArcLengths &&
            this.cacheArcLengths.length === t + 1 &&
            !this.needsUpdate)
        )
          return this.cacheArcLengths;
        this.needsUpdate = !1;
        const e = [];
        let n,
          i = this.getPoint(0),
          r = 0;
        e.push(0);
        for (let o = 1; o <= t; o++)
          (n = this.getPoint(o / t)),
            (r += n.distanceTo(i)),
            e.push(r),
            (i = n);
        return (this.cacheArcLengths = e), e;
      },
      updateArcLengths: function () {
        (this.needsUpdate = !0), this.getLengths();
      },
      getUtoTmapping: function (t, e) {
        const n = this.getLengths();
        let i = 0;
        const r = n.length;
        let o;
        o = e || t * n[r - 1];
        let s,
          a = 0,
          c = r - 1;
        for (; a <= c; )
          if (((i = Math.floor(a + (c - a) / 2)), (s = n[i] - o), s < 0))
            a = i + 1;
          else {
            if (!(s > 0)) {
              c = i;
              break;
            }
            c = i - 1;
          }
        if (((i = c), n[i] === o)) return i / (r - 1);
        const l = n[i];
        return (i + (o - l) / (n[i + 1] - l)) / (r - 1);
      },
      getTangent: function (t, e) {
        const n = 1e-4;
        let i = t - n,
          r = t + n;
        i < 0 && (i = 0), r > 1 && (r = 1);
        const o = this.getPoint(i),
          s = this.getPoint(r),
          a = e || (o.isVector2 ? new P() : new G());
        return a.copy(s).sub(o).normalize(), a;
      },
      getTangentAt: function (t, e) {
        const n = this.getUtoTmapping(t);
        return this.getTangent(n, e);
      },
      computeFrenetFrames: function (t, e) {
        const n = new G(),
          i = [],
          r = [],
          o = [],
          s = new G(),
          a = new gt();
        for (let e = 0; e <= t; e++) {
          const n = e / t;
          (i[e] = this.getTangentAt(n, new G())), i[e].normalize();
        }
        (r[0] = new G()), (o[0] = new G());
        let c = Number.MAX_VALUE;
        const l = Math.abs(i[0].x),
          h = Math.abs(i[0].y),
          u = Math.abs(i[0].z);
        l <= c && ((c = l), n.set(1, 0, 0)),
          h <= c && ((c = h), n.set(0, 1, 0)),
          u <= c && n.set(0, 0, 1),
          s.crossVectors(i[0], n).normalize(),
          r[0].crossVectors(i[0], s),
          o[0].crossVectors(i[0], r[0]);
        for (let e = 1; e <= t; e++) {
          if (
            ((r[e] = r[e - 1].clone()),
            (o[e] = o[e - 1].clone()),
            s.crossVectors(i[e - 1], i[e]),
            s.length() > Number.EPSILON)
          ) {
            s.normalize();
            const t = Math.acos(R.clamp(i[e - 1].dot(i[e]), -1, 1));
            r[e].applyMatrix4(a.makeRotationAxis(s, t));
          }
          o[e].crossVectors(i[e], r[e]);
        }
        if (!0 === e) {
          let e = Math.acos(R.clamp(r[0].dot(r[t]), -1, 1));
          (e /= t), i[0].dot(s.crossVectors(r[0], r[t])) > 0 && (e = -e);
          for (let n = 1; n <= t; n++)
            r[n].applyMatrix4(a.makeRotationAxis(i[n], e * n)),
              o[n].crossVectors(i[n], r[n]);
        }
        return { tangents: i, normals: r, binormals: o };
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
      copy: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this;
      },
      toJSON: function () {
        const t = {
          metadata: { version: 4.5, type: "Curve", generator: "Curve.toJSON" },
        };
        return (
          (t.arcLengthDivisions = this.arcLengthDivisions),
          (t.type = this.type),
          t
        );
      },
      fromJSON: function (t) {
        return (this.arcLengthDivisions = t.arcLengthDivisions), this;
      },
    }),
    (aa.prototype = Object.create(sa.prototype)),
    (aa.prototype.constructor = aa),
    (aa.prototype.isEllipseCurve = !0),
    (aa.prototype.getPoint = function (t, e) {
      const n = e || new P(),
        i = 2 * Math.PI;
      let r = this.aEndAngle - this.aStartAngle;
      const o = Math.abs(r) < Number.EPSILON;
      for (; r < 0; ) r += i;
      for (; r > i; ) r -= i;
      r < Number.EPSILON && (r = o ? 0 : i),
        !0 !== this.aClockwise || o || (r === i ? (r = -i) : (r -= i));
      const s = this.aStartAngle + t * r;
      let a = this.aX + this.xRadius * Math.cos(s),
        c = this.aY + this.yRadius * Math.sin(s);
      if (0 !== this.aRotation) {
        const t = Math.cos(this.aRotation),
          e = Math.sin(this.aRotation),
          n = a - this.aX,
          i = c - this.aY;
        (a = n * t - i * e + this.aX), (c = n * e + i * t + this.aY);
      }
      return n.set(a, c);
    }),
    (aa.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }),
    (aa.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (
        (t.aX = this.aX),
        (t.aY = this.aY),
        (t.xRadius = this.xRadius),
        (t.yRadius = this.yRadius),
        (t.aStartAngle = this.aStartAngle),
        (t.aEndAngle = this.aEndAngle),
        (t.aClockwise = this.aClockwise),
        (t.aRotation = this.aRotation),
        t
      );
    }),
    (aa.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }),
    (ca.prototype = Object.create(aa.prototype)),
    (ca.prototype.constructor = ca),
    (ca.prototype.isArcCurve = !0);
  const ha = new G(),
    ua = new la(),
    da = new la(),
    pa = new la();
  function fa(t = [], e = !1, n = "centripetal", i = 0.5) {
    sa.call(this),
      (this.type = "CatmullRomCurve3"),
      (this.points = t),
      (this.closed = e),
      (this.curveType = n),
      (this.tension = i);
  }
  function ma(t, e, n, i, r) {
    const o = 0.5 * (i - e),
      s = 0.5 * (r - n),
      a = t * t;
    return (
      (2 * n - 2 * i + o + s) * (t * a) +
      (-3 * n + 3 * i - 2 * o - s) * a +
      o * t +
      n
    );
  }
  function ga(t, e, n, i) {
    return (
      (function (t, e) {
        const n = 1 - t;
        return n * n * e;
      })(t, e) +
      (function (t, e) {
        return 2 * (1 - t) * t * e;
      })(t, n) +
      (function (t, e) {
        return t * t * e;
      })(t, i)
    );
  }
  function va(t, e, n, i, r) {
    return (
      (function (t, e) {
        const n = 1 - t;
        return n * n * n * e;
      })(t, e) +
      (function (t, e) {
        const n = 1 - t;
        return 3 * n * n * t * e;
      })(t, n) +
      (function (t, e) {
        return 3 * (1 - t) * t * t * e;
      })(t, i) +
      (function (t, e) {
        return t * t * t * e;
      })(t, r)
    );
  }
  function ya(t = new P(), e = new P(), n = new P(), i = new P()) {
    sa.call(this),
      (this.type = "CubicBezierCurve"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n),
      (this.v3 = i);
  }
  function _a(t = new G(), e = new G(), n = new G(), i = new G()) {
    sa.call(this),
      (this.type = "CubicBezierCurve3"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n),
      (this.v3 = i);
  }
  function xa(t = new P(), e = new P()) {
    sa.call(this), (this.type = "LineCurve"), (this.v1 = t), (this.v2 = e);
  }
  function ba(t = new G(), e = new G()) {
    sa.call(this), (this.type = "LineCurve3"), (this.v1 = t), (this.v2 = e);
  }
  function wa(t = new P(), e = new P(), n = new P()) {
    sa.call(this),
      (this.type = "QuadraticBezierCurve"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n);
  }
  function Ma(t = new G(), e = new G(), n = new G()) {
    sa.call(this),
      (this.type = "QuadraticBezierCurve3"),
      (this.v0 = t),
      (this.v1 = e),
      (this.v2 = n);
  }
  function Sa(t = []) {
    sa.call(this), (this.type = "SplineCurve"), (this.points = t);
  }
  (fa.prototype = Object.create(sa.prototype)),
    (fa.prototype.constructor = fa),
    (fa.prototype.isCatmullRomCurve3 = !0),
    (fa.prototype.getPoint = function (t, e = new G()) {
      const n = e,
        i = this.points,
        r = i.length,
        o = (r - (this.closed ? 0 : 1)) * t;
      let s,
        a,
        c = Math.floor(o),
        l = o - c;
      this.closed
        ? (c += c > 0 ? 0 : (Math.floor(Math.abs(c) / r) + 1) * r)
        : 0 === l && c === r - 1 && ((c = r - 2), (l = 1)),
        this.closed || c > 0
          ? (s = i[(c - 1) % r])
          : (ha.subVectors(i[0], i[1]).add(i[0]), (s = ha));
      const h = i[c % r],
        u = i[(c + 1) % r];
      if (
        (this.closed || c + 2 < r
          ? (a = i[(c + 2) % r])
          : (ha.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), (a = ha)),
        "centripetal" === this.curveType || "chordal" === this.curveType)
      ) {
        const t = "chordal" === this.curveType ? 0.5 : 0.25;
        let e = Math.pow(s.distanceToSquared(h), t),
          n = Math.pow(h.distanceToSquared(u), t),
          i = Math.pow(u.distanceToSquared(a), t);
        n < 1e-4 && (n = 1),
          e < 1e-4 && (e = n),
          i < 1e-4 && (i = n),
          ua.initNonuniformCatmullRom(s.x, h.x, u.x, a.x, e, n, i),
          da.initNonuniformCatmullRom(s.y, h.y, u.y, a.y, e, n, i),
          pa.initNonuniformCatmullRom(s.z, h.z, u.z, a.z, e, n, i);
      } else
        "catmullrom" === this.curveType &&
          (ua.initCatmullRom(s.x, h.x, u.x, a.x, this.tension),
          da.initCatmullRom(s.y, h.y, u.y, a.y, this.tension),
          pa.initCatmullRom(s.z, h.z, u.z, a.z, this.tension));
      return n.set(ua.calc(l), da.calc(l), pa.calc(l)), n;
    }),
    (fa.prototype.copy = function (t) {
      sa.prototype.copy.call(this, t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }),
    (fa.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return (
        (t.closed = this.closed),
        (t.curveType = this.curveType),
        (t.tension = this.tension),
        t
      );
    }),
    (fa.prototype.fromJSON = function (t) {
      sa.prototype.fromJSON.call(this, t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(new G().fromArray(n));
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }),
    (ya.prototype = Object.create(sa.prototype)),
    (ya.prototype.constructor = ya),
    (ya.prototype.isCubicBezierCurve = !0),
    (ya.prototype.getPoint = function (t, e = new P()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        o = this.v2,
        s = this.v3;
      return n.set(va(t, i.x, r.x, o.x, s.x), va(t, i.y, r.y, o.y, s.y)), n;
    }),
    (ya.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }),
    (ya.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }),
    (ya.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }),
    (_a.prototype = Object.create(sa.prototype)),
    (_a.prototype.constructor = _a),
    (_a.prototype.isCubicBezierCurve3 = !0),
    (_a.prototype.getPoint = function (t, e = new G()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        o = this.v2,
        s = this.v3;
      return (
        n.set(
          va(t, i.x, r.x, o.x, s.x),
          va(t, i.y, r.y, o.y, s.y),
          va(t, i.z, r.z, o.z, s.z)
        ),
        n
      );
    }),
    (_a.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }),
    (_a.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }),
    (_a.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }),
    (xa.prototype = Object.create(sa.prototype)),
    (xa.prototype.constructor = xa),
    (xa.prototype.isLineCurve = !0),
    (xa.prototype.getPoint = function (t, e = new P()) {
      const n = e;
      return (
        1 === t
          ? n.copy(this.v2)
          : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
        n
      );
    }),
    (xa.prototype.getPointAt = function (t, e) {
      return this.getPoint(t, e);
    }),
    (xa.prototype.getTangent = function (t, e) {
      const n = e || new P();
      return n.copy(this.v2).sub(this.v1).normalize(), n;
    }),
    (xa.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }),
    (xa.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
    }),
    (xa.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }),
    (ba.prototype = Object.create(sa.prototype)),
    (ba.prototype.constructor = ba),
    (ba.prototype.isLineCurve3 = !0),
    (ba.prototype.getPoint = function (t, e = new G()) {
      const n = e;
      return (
        1 === t
          ? n.copy(this.v2)
          : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)),
        n
      );
    }),
    (ba.prototype.getPointAt = function (t, e) {
      return this.getPoint(t, e);
    }),
    (ba.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }),
    (ba.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t;
    }),
    (ba.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }),
    (wa.prototype = Object.create(sa.prototype)),
    (wa.prototype.constructor = wa),
    (wa.prototype.isQuadraticBezierCurve = !0),
    (wa.prototype.getPoint = function (t, e = new P()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        o = this.v2;
      return n.set(ga(t, i.x, r.x, o.x), ga(t, i.y, r.y, o.y)), n;
    }),
    (wa.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }),
    (wa.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }),
    (wa.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }),
    (Ma.prototype = Object.create(sa.prototype)),
    (Ma.prototype.constructor = Ma),
    (Ma.prototype.isQuadraticBezierCurve3 = !0),
    (Ma.prototype.getPoint = function (t, e = new G()) {
      const n = e,
        i = this.v0,
        r = this.v1,
        o = this.v2;
      return (
        n.set(ga(t, i.x, r.x, o.x), ga(t, i.y, r.y, o.y), ga(t, i.z, r.z, o.z)),
        n
      );
    }),
    (Ma.prototype.copy = function (t) {
      return (
        sa.prototype.copy.call(this, t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }),
    (Ma.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }),
    (Ma.prototype.fromJSON = function (t) {
      return (
        sa.prototype.fromJSON.call(this, t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }),
    (Sa.prototype = Object.create(sa.prototype)),
    (Sa.prototype.constructor = Sa),
    (Sa.prototype.isSplineCurve = !0),
    (Sa.prototype.getPoint = function (t, e = new P()) {
      const n = e,
        i = this.points,
        r = (i.length - 1) * t,
        o = Math.floor(r),
        s = r - o,
        a = i[0 === o ? o : o - 1],
        c = i[o],
        l = i[o > i.length - 2 ? i.length - 1 : o + 1],
        h = i[o > i.length - 3 ? i.length - 1 : o + 2];
      return n.set(ma(s, a.x, c.x, l.x, h.x), ma(s, a.y, c.y, l.y, h.y)), n;
    }),
    (Sa.prototype.copy = function (t) {
      sa.prototype.copy.call(this, t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return this;
    }),
    (Sa.prototype.toJSON = function () {
      const t = sa.prototype.toJSON.call(this);
      t.points = [];
      for (let e = 0, n = this.points.length; e < n; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return t;
    }),
    (Sa.prototype.fromJSON = function (t) {
      sa.prototype.fromJSON.call(this, t), (this.points = []);
      for (let e = 0, n = t.points.length; e < n; e++) {
        const n = t.points[e];
        this.points.push(new P().fromArray(n));
      }
      return this;
    });
  var Ea = Object.freeze({
    __proto__: null,
    ArcCurve: ca,
    CatmullRomCurve3: fa,
    CubicBezierCurve: ya,
    CubicBezierCurve3: _a,
    EllipseCurve: aa,
    LineCurve: xa,
    LineCurve3: ba,
    QuadraticBezierCurve: wa,
    QuadraticBezierCurve3: Ma,
    SplineCurve: Sa,
  });
  function Ta() {
    sa.call(this),
      (this.type = "CurvePath"),
      (this.curves = []),
      (this.autoClose = !1);
  }
  function Aa(t) {
    Ta.call(this),
      (this.type = "Path"),
      (this.currentPoint = new P()),
      t && this.setFromPoints(t);
  }
  function La(t) {
    Aa.call(this, t),
      (this.uuid = R.generateUUID()),
      (this.type = "Shape"),
      (this.holes = []);
  }
  function Ca(t, e = 1) {
    kt.call(this),
      (this.type = "Light"),
      (this.color = new le(t)),
      (this.intensity = e);
  }
  function Ra(t, e, n) {
    Ca.call(this, t, n),
      (this.type = "HemisphereLight"),
      this.position.copy(kt.DefaultUp),
      this.updateMatrix(),
      (this.groundColor = new le(e));
  }
  function Pa(t) {
    (this.camera = t),
      (this.bias = 0),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.mapSize = new P(512, 512)),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new gt()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new xn()),
      (this._frameExtents = new P(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new U(0, 0, 1, 1)]);
  }
  function Oa() {
    Pa.call(this, new dn(50, 1, 0.5, 500)), (this.focus = 1);
  }
  function Na(t, e, n, i, r, o) {
    Ca.call(this, t, e),
      (this.type = "SpotLight"),
      this.position.copy(kt.DefaultUp),
      this.updateMatrix(),
      (this.target = new kt()),
      Object.defineProperty(this, "power", {
        get: function () {
          return this.intensity * Math.PI;
        },
        set: function (t) {
          this.intensity = t / Math.PI;
        },
      }),
      (this.distance = void 0 !== n ? n : 0),
      (this.angle = void 0 !== i ? i : Math.PI / 3),
      (this.penumbra = void 0 !== r ? r : 0),
      (this.decay = void 0 !== o ? o : 1),
      (this.shadow = new Oa());
  }
  function Ia() {
    Pa.call(this, new dn(90, 1, 0.5, 500)),
      (this._frameExtents = new P(4, 2)),
      (this._viewportCount = 6),
      (this._viewports = [
        new U(2, 1, 1, 1),
        new U(0, 1, 1, 1),
        new U(3, 1, 1, 1),
        new U(1, 1, 1, 1),
        new U(3, 0, 1, 1),
        new U(1, 0, 1, 1),
      ]),
      (this._cubeDirections = [
        new G(1, 0, 0),
        new G(-1, 0, 0),
        new G(0, 0, 1),
        new G(0, 0, -1),
        new G(0, 1, 0),
        new G(0, -1, 0),
      ]),
      (this._cubeUps = [
        new G(0, 1, 0),
        new G(0, 1, 0),
        new G(0, 1, 0),
        new G(0, 1, 0),
        new G(0, 0, 1),
        new G(0, 0, -1),
      ]);
  }
  function Da(t, e, n, i) {
    Ca.call(this, t, e),
      (this.type = "PointLight"),
      Object.defineProperty(this, "power", {
        get: function () {
          return 4 * this.intensity * Math.PI;
        },
        set: function (t) {
          this.intensity = t / (4 * Math.PI);
        },
      }),
      (this.distance = void 0 !== n ? n : 0),
      (this.decay = void 0 !== i ? i : 1),
      (this.shadow = new Ia());
  }
  function za(t = -1, e = 1, n = 1, i = -1, r = 0.1, o = 2e3) {
    un.call(this),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = t),
      (this.right = e),
      (this.top = n),
      (this.bottom = i),
      (this.near = r),
      (this.far = o),
      this.updateProjectionMatrix();
  }
  function Ba() {
    Pa.call(this, new za(-5, 5, 5, -5, 0.5, 500));
  }
  function Ua(t, e) {
    Ca.call(this, t, e),
      (this.type = "DirectionalLight"),
      this.position.copy(kt.DefaultUp),
      this.updateMatrix(),
      (this.target = new kt()),
      (this.shadow = new Ba());
  }
  function Ha(t, e) {
    Ca.call(this, t, e), (this.type = "AmbientLight");
  }
  function Fa(t, e, n, i) {
    Ca.call(this, t, e),
      (this.type = "RectAreaLight"),
      (this.width = void 0 !== n ? n : 10),
      (this.height = void 0 !== i ? i : 10);
  }
  (Ta.prototype = Object.assign(Object.create(sa.prototype), {
    constructor: Ta,
    add: function (t) {
      this.curves.push(t);
    },
    closePath: function () {
      const t = this.curves[0].getPoint(0),
        e = this.curves[this.curves.length - 1].getPoint(1);
      t.equals(e) || this.curves.push(new xa(e, t));
    },
    getPoint: function (t) {
      const e = t * this.getLength(),
        n = this.getCurveLengths();
      let i = 0;
      for (; i < n.length; ) {
        if (n[i] >= e) {
          const t = n[i] - e,
            r = this.curves[i],
            o = r.getLength(),
            s = 0 === o ? 0 : 1 - t / o;
          return r.getPointAt(s);
        }
        i++;
      }
      return null;
    },
    getLength: function () {
      const t = this.getCurveLengths();
      return t[t.length - 1];
    },
    updateArcLengths: function () {
      (this.needsUpdate = !0),
        (this.cacheLengths = null),
        this.getCurveLengths();
    },
    getCurveLengths: function () {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths;
      const t = [];
      let e = 0;
      for (let n = 0, i = this.curves.length; n < i; n++)
        (e += this.curves[n].getLength()), t.push(e);
      return (this.cacheLengths = t), t;
    },
    getSpacedPoints: function (t = 40) {
      const e = [];
      for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
      return this.autoClose && e.push(e[0]), e;
    },
    getPoints: function (t = 12) {
      const e = [];
      let n;
      for (let i = 0, r = this.curves; i < r.length; i++) {
        const o = r[i],
          s =
            o && o.isEllipseCurve
              ? 2 * t
              : o && (o.isLineCurve || o.isLineCurve3)
              ? 1
              : o && o.isSplineCurve
              ? t * o.points.length
              : t,
          a = o.getPoints(s);
        for (let t = 0; t < a.length; t++) {
          const i = a[t];
          (n && n.equals(i)) || (e.push(i), (n = i));
        }
      }
      return (
        this.autoClose &&
          e.length > 1 &&
          !e[e.length - 1].equals(e[0]) &&
          e.push(e[0]),
        e
      );
    },
    copy: function (t) {
      sa.prototype.copy.call(this, t), (this.curves = []);
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e];
        this.curves.push(n.clone());
      }
      return (this.autoClose = t.autoClose), this;
    },
    toJSON: function () {
      const t = sa.prototype.toJSON.call(this);
      (t.autoClose = this.autoClose), (t.curves = []);
      for (let e = 0, n = this.curves.length; e < n; e++) {
        const n = this.curves[e];
        t.curves.push(n.toJSON());
      }
      return t;
    },
    fromJSON: function (t) {
      sa.prototype.fromJSON.call(this, t),
        (this.autoClose = t.autoClose),
        (this.curves = []);
      for (let e = 0, n = t.curves.length; e < n; e++) {
        const n = t.curves[e];
        this.curves.push(new Ea[n.type]().fromJSON(n));
      }
      return this;
    },
  })),
    (Aa.prototype = Object.assign(Object.create(Ta.prototype), {
      constructor: Aa,
      setFromPoints: function (t) {
        this.moveTo(t[0].x, t[0].y);
        for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
        return this;
      },
      moveTo: function (t, e) {
        return this.currentPoint.set(t, e), this;
      },
      lineTo: function (t, e) {
        const n = new xa(this.currentPoint.clone(), new P(t, e));
        return this.curves.push(n), this.currentPoint.set(t, e), this;
      },
      quadraticCurveTo: function (t, e, n, i) {
        const r = new wa(this.currentPoint.clone(), new P(t, e), new P(n, i));
        return this.curves.push(r), this.currentPoint.set(n, i), this;
      },
      bezierCurveTo: function (t, e, n, i, r, o) {
        const s = new ya(
          this.currentPoint.clone(),
          new P(t, e),
          new P(n, i),
          new P(r, o)
        );
        return this.curves.push(s), this.currentPoint.set(r, o), this;
      },
      splineThru: function (t) {
        const e = new Sa([this.currentPoint.clone()].concat(t));
        return (
          this.curves.push(e), this.currentPoint.copy(t[t.length - 1]), this
        );
      },
      arc: function (t, e, n, i, r, o) {
        const s = this.currentPoint.x,
          a = this.currentPoint.y;
        return this.absarc(t + s, e + a, n, i, r, o), this;
      },
      absarc: function (t, e, n, i, r, o) {
        return this.absellipse(t, e, n, n, i, r, o), this;
      },
      ellipse: function (t, e, n, i, r, o, s, a) {
        const c = this.currentPoint.x,
          l = this.currentPoint.y;
        return this.absellipse(t + c, e + l, n, i, r, o, s, a), this;
      },
      absellipse: function (t, e, n, i, r, o, s, a) {
        const c = new aa(t, e, n, i, r, o, s, a);
        if (this.curves.length > 0) {
          const t = c.getPoint(0);
          t.equals(this.currentPoint) || this.lineTo(t.x, t.y);
        }
        this.curves.push(c);
        const l = c.getPoint(1);
        return this.currentPoint.copy(l), this;
      },
      copy: function (t) {
        return (
          Ta.prototype.copy.call(this, t),
          this.currentPoint.copy(t.currentPoint),
          this
        );
      },
      toJSON: function () {
        const t = Ta.prototype.toJSON.call(this);
        return (t.currentPoint = this.currentPoint.toArray()), t;
      },
      fromJSON: function (t) {
        return (
          Ta.prototype.fromJSON.call(this, t),
          this.currentPoint.fromArray(t.currentPoint),
          this
        );
      },
    })),
    (La.prototype = Object.assign(Object.create(Aa.prototype), {
      constructor: La,
      getPointsHoles: function (t) {
        const e = [];
        for (let n = 0, i = this.holes.length; n < i; n++)
          e[n] = this.holes[n].getPoints(t);
        return e;
      },
      extractPoints: function (t) {
        return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
      },
      copy: function (t) {
        Aa.prototype.copy.call(this, t), (this.holes = []);
        for (let e = 0, n = t.holes.length; e < n; e++) {
          const n = t.holes[e];
          this.holes.push(n.clone());
        }
        return this;
      },
      toJSON: function () {
        const t = Aa.prototype.toJSON.call(this);
        (t.uuid = this.uuid), (t.holes = []);
        for (let e = 0, n = this.holes.length; e < n; e++) {
          const n = this.holes[e];
          t.holes.push(n.toJSON());
        }
        return t;
      },
      fromJSON: function (t) {
        Aa.prototype.fromJSON.call(this, t),
          (this.uuid = t.uuid),
          (this.holes = []);
        for (let e = 0, n = t.holes.length; e < n; e++) {
          const n = t.holes[e];
          this.holes.push(new Aa().fromJSON(n));
        }
        return this;
      },
    })),
    (Ca.prototype = Object.assign(Object.create(kt.prototype), {
      constructor: Ca,
      isLight: !0,
      copy: function (t) {
        return (
          kt.prototype.copy.call(this, t),
          this.color.copy(t.color),
          (this.intensity = t.intensity),
          this
        );
      },
      toJSON: function (t) {
        const e = kt.prototype.toJSON.call(this, t);
        return (
          (e.object.color = this.color.getHex()),
          (e.object.intensity = this.intensity),
          void 0 !== this.groundColor &&
            (e.object.groundColor = this.groundColor.getHex()),
          void 0 !== this.distance && (e.object.distance = this.distance),
          void 0 !== this.angle && (e.object.angle = this.angle),
          void 0 !== this.decay && (e.object.decay = this.decay),
          void 0 !== this.penumbra && (e.object.penumbra = this.penumbra),
          void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()),
          e
        );
      },
    })),
    (Ra.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Ra,
      isHemisphereLight: !0,
      copy: function (t) {
        return (
          Ca.prototype.copy.call(this, t),
          this.groundColor.copy(t.groundColor),
          this
        );
      },
    })),
    Object.assign(Pa.prototype, {
      _projScreenMatrix: new gt(),
      _lightPositionWorld: new G(),
      _lookTarget: new G(),
      getViewportCount: function () {
        return this._viewportCount;
      },
      getFrustum: function () {
        return this._frustum;
      },
      updateMatrices: function (t) {
        const e = this.camera,
          n = this.matrix,
          i = this._projScreenMatrix,
          r = this._lookTarget,
          o = this._lightPositionWorld;
        o.setFromMatrixPosition(t.matrixWorld),
          e.position.copy(o),
          r.setFromMatrixPosition(t.target.matrixWorld),
          e.lookAt(r),
          e.updateMatrixWorld(),
          i.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
          this._frustum.setFromProjectionMatrix(i),
          n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
          n.multiply(e.projectionMatrix),
          n.multiply(e.matrixWorldInverse);
      },
      getViewport: function (t) {
        return this._viewports[t];
      },
      getFrameExtents: function () {
        return this._frameExtents;
      },
      copy: function (t) {
        return (
          (this.camera = t.camera.clone()),
          (this.bias = t.bias),
          (this.radius = t.radius),
          this.mapSize.copy(t.mapSize),
          this
        );
      },
      clone: function () {
        return new this.constructor().copy(this);
      },
      toJSON: function () {
        const t = {};
        return (
          0 !== this.bias && (t.bias = this.bias),
          0 !== this.normalBias && (t.normalBias = this.normalBias),
          1 !== this.radius && (t.radius = this.radius),
          (512 === this.mapSize.x && 512 === this.mapSize.y) ||
            (t.mapSize = this.mapSize.toArray()),
          (t.camera = this.camera.toJSON(!1).object),
          delete t.camera.matrix,
          t
        );
      },
    }),
    (Oa.prototype = Object.assign(Object.create(Pa.prototype), {
      constructor: Oa,
      isSpotLightShadow: !0,
      updateMatrices: function (t) {
        const e = this.camera,
          n = 2 * R.RAD2DEG * t.angle * this.focus,
          i = this.mapSize.width / this.mapSize.height,
          r = t.distance || e.far;
        (n === e.fov && i === e.aspect && r === e.far) ||
          ((e.fov = n),
          (e.aspect = i),
          (e.far = r),
          e.updateProjectionMatrix()),
          Pa.prototype.updateMatrices.call(this, t);
      },
    })),
    (Na.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Na,
      isSpotLight: !0,
      copy: function (t) {
        return (
          Ca.prototype.copy.call(this, t),
          (this.distance = t.distance),
          (this.angle = t.angle),
          (this.penumbra = t.penumbra),
          (this.decay = t.decay),
          (this.target = t.target.clone()),
          (this.shadow = t.shadow.clone()),
          this
        );
      },
    })),
    (Ia.prototype = Object.assign(Object.create(Pa.prototype), {
      constructor: Ia,
      isPointLightShadow: !0,
      updateMatrices: function (t, e = 0) {
        const n = this.camera,
          i = this.matrix,
          r = this._lightPositionWorld,
          o = this._lookTarget,
          s = this._projScreenMatrix;
        r.setFromMatrixPosition(t.matrixWorld),
          n.position.copy(r),
          o.copy(n.position),
          o.add(this._cubeDirections[e]),
          n.up.copy(this._cubeUps[e]),
          n.lookAt(o),
          n.updateMatrixWorld(),
          i.makeTranslation(-r.x, -r.y, -r.z),
          s.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse),
          this._frustum.setFromProjectionMatrix(s);
      },
    })),
    (Da.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Da,
      isPointLight: !0,
      copy: function (t) {
        return (
          Ca.prototype.copy.call(this, t),
          (this.distance = t.distance),
          (this.decay = t.decay),
          (this.shadow = t.shadow.clone()),
          this
        );
      },
    })),
    (za.prototype = Object.assign(Object.create(un.prototype), {
      constructor: za,
      isOrthographicCamera: !0,
      copy: function (t, e) {
        return (
          un.prototype.copy.call(this, t, e),
          (this.left = t.left),
          (this.right = t.right),
          (this.top = t.top),
          (this.bottom = t.bottom),
          (this.near = t.near),
          (this.far = t.far),
          (this.zoom = t.zoom),
          (this.view = null === t.view ? null : Object.assign({}, t.view)),
          this
        );
      },
      setViewOffset: function (t, e, n, i, r, o) {
        null === this.view &&
          (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1,
          }),
          (this.view.enabled = !0),
          (this.view.fullWidth = t),
          (this.view.fullHeight = e),
          (this.view.offsetX = n),
          (this.view.offsetY = i),
          (this.view.width = r),
          (this.view.height = o),
          this.updateProjectionMatrix();
      },
      clearViewOffset: function () {
        null !== this.view && (this.view.enabled = !1),
          this.updateProjectionMatrix();
      },
      updateProjectionMatrix: function () {
        const t = (this.right - this.left) / (2 * this.zoom),
          e = (this.top - this.bottom) / (2 * this.zoom),
          n = (this.right + this.left) / 2,
          i = (this.top + this.bottom) / 2;
        let r = n - t,
          o = n + t,
          s = i + e,
          a = i - e;
        if (null !== this.view && this.view.enabled) {
          const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
            e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
          (r += t * this.view.offsetX),
            (o = r + t * this.view.width),
            (s -= e * this.view.offsetY),
            (a = s - e * this.view.height);
        }
        this.projectionMatrix.makeOrthographic(r, o, s, a, this.near, this.far),
          this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
      },
      toJSON: function (t) {
        const e = kt.prototype.toJSON.call(this, t);
        return (
          (e.object.zoom = this.zoom),
          (e.object.left = this.left),
          (e.object.right = this.right),
          (e.object.top = this.top),
          (e.object.bottom = this.bottom),
          (e.object.near = this.near),
          (e.object.far = this.far),
          null !== this.view && (e.object.view = Object.assign({}, this.view)),
          e
        );
      },
    })),
    (Ba.prototype = Object.assign(Object.create(Pa.prototype), {
      constructor: Ba,
      isDirectionalLightShadow: !0,
      updateMatrices: function (t) {
        Pa.prototype.updateMatrices.call(this, t);
      },
    })),
    (Ua.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Ua,
      isDirectionalLight: !0,
      copy: function (t) {
        return (
          Ca.prototype.copy.call(this, t),
          (this.target = t.target.clone()),
          (this.shadow = t.shadow.clone()),
          this
        );
      },
    })),
    (Ha.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Ha,
      isAmbientLight: !0,
    })),
    (Fa.prototype = Object.assign(Object.create(Ca.prototype), {
      constructor: Fa,
      isRectAreaLight: !0,
      copy: function (t) {
        return (
          Ca.prototype.copy.call(this, t),
          (this.width = t.width),
          (this.height = t.height),
          this
        );
      },
      toJSON: function (t) {
        const e = Ca.prototype.toJSON.call(this, t);
        return (
          (e.object.width = this.width), (e.object.height = this.height), e
        );
      },
    }));
  class ka {
    constructor() {
      Object.defineProperty(this, "isSphericalHarmonics3", { value: !0 }),
        (this.coefficients = []);
      for (let t = 0; t < 9; t++) this.coefficients.push(new G());
    }
    set(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].copy(t[e]);
      return this;
    }
    zero() {
      for (let t = 0; t < 9; t++) this.coefficients[t].set(0, 0, 0);
      return this;
    }
    getAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        o = this.coefficients;
      return (
        e.copy(o[0]).multiplyScalar(0.282095),
        e.addScaledVector(o[1], 0.488603 * i),
        e.addScaledVector(o[2], 0.488603 * r),
        e.addScaledVector(o[3], 0.488603 * n),
        e.addScaledVector(o[4], n * i * 1.092548),
        e.addScaledVector(o[5], i * r * 1.092548),
        e.addScaledVector(o[6], 0.315392 * (3 * r * r - 1)),
        e.addScaledVector(o[7], n * r * 1.092548),
        e.addScaledVector(o[8], 0.546274 * (n * n - i * i)),
        e
      );
    }
    getIrradianceAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z,
        o = this.coefficients;
      return (
        e.copy(o[0]).multiplyScalar(0.886227),
        e.addScaledVector(o[1], 1.023328 * i),
        e.addScaledVector(o[2], 1.023328 * r),
        e.addScaledVector(o[3], 1.023328 * n),
        e.addScaledVector(o[4], 0.858086 * n * i),
        e.addScaledVector(o[5], 0.858086 * i * r),
        e.addScaledVector(o[6], 0.743125 * r * r - 0.247708),
        e.addScaledVector(o[7], 0.858086 * n * r),
        e.addScaledVector(o[8], 0.429043 * (n * n - i * i)),
        e
      );
    }
    add(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].add(t.coefficients[e]);
      return this;
    }
    addScaledSH(t, e) {
      for (let n = 0; n < 9; n++)
        this.coefficients[n].addScaledVector(t.coefficients[n], e);
      return this;
    }
    scale(t) {
      for (let e = 0; e < 9; e++) this.coefficients[e].multiplyScalar(t);
      return this;
    }
    lerp(t, e) {
      for (let n = 0; n < 9; n++)
        this.coefficients[n].lerp(t.coefficients[n], e);
      return this;
    }
    equals(t) {
      for (let e = 0; e < 9; e++)
        if (!this.coefficients[e].equals(t.coefficients[e])) return !1;
      return !0;
    }
    copy(t) {
      return this.set(t.coefficients);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    fromArray(t, e = 0) {
      const n = this.coefficients;
      for (let i = 0; i < 9; i++) n[i].fromArray(t, e + 3 * i);
      return this;
    }
    toArray(t = [], e = 0) {
      const n = this.coefficients;
      for (let i = 0; i < 9; i++) n[i].toArray(t, e + 3 * i);
      return t;
    }
    static getBasisAt(t, e) {
      const n = t.x,
        i = t.y,
        r = t.z;
      (e[0] = 0.282095),
        (e[1] = 0.488603 * i),
        (e[2] = 0.488603 * r),
        (e[3] = 0.488603 * n),
        (e[4] = 1.092548 * n * i),
        (e[5] = 1.092548 * i * r),
        (e[6] = 0.315392 * (3 * r * r - 1)),
        (e[7] = 1.092548 * n * r),
        (e[8] = 0.546274 * (n * n - i * i));
    }
  }
  function Ga(t, e) {
    Ca.call(this, void 0, e),
      (this.type = "LightProbe"),
      (this.sh = void 0 !== t ? t : new ka());
  }
  function Va(t) {
    Qs.call(this, t), (this.textures = {});
  }
  (Ga.prototype = Object.assign(Object.create(Ca.prototype), {
    constructor: Ga,
    isLightProbe: !0,
    copy: function (t) {
      return Ca.prototype.copy.call(this, t), this.sh.copy(t.sh), this;
    },
    fromJSON: function (t) {
      return (this.intensity = t.intensity), this.sh.fromArray(t.sh), this;
    },
    toJSON: function (t) {
      const e = Ca.prototype.toJSON.call(this, t);
      return (e.object.sh = this.sh.toArray()), e;
    },
  })),
    (Va.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: Va,
      load: function (t, e, n, i) {
        const r = this,
          o = new $s(r.manager);
        o.setPath(r.path),
          o.setRequestHeader(r.requestHeader),
          o.setWithCredentials(r.withCredentials),
          o.load(
            t,
            function (n) {
              try {
                e(r.parse(JSON.parse(n)));
              } catch (e) {
                i ? i(e) : console.error(e), r.manager.itemError(t);
              }
            },
            n,
            i
          );
      },
      parse: function (t) {
        const e = this.textures;
        function n(t) {
          return (
            void 0 === e[t] &&
              console.warn("THREE.MaterialLoader: Undefined texture", t),
            e[t]
          );
        }
        const i = new Ns[t.type]();
        if (
          (void 0 !== t.uuid && (i.uuid = t.uuid),
          void 0 !== t.name && (i.name = t.name),
          void 0 !== t.color && void 0 !== i.color && i.color.setHex(t.color),
          void 0 !== t.roughness && (i.roughness = t.roughness),
          void 0 !== t.metalness && (i.metalness = t.metalness),
          void 0 !== t.sheen && (i.sheen = new le().setHex(t.sheen)),
          void 0 !== t.emissive &&
            void 0 !== i.emissive &&
            i.emissive.setHex(t.emissive),
          void 0 !== t.specular &&
            void 0 !== i.specular &&
            i.specular.setHex(t.specular),
          void 0 !== t.shininess && (i.shininess = t.shininess),
          void 0 !== t.clearcoat && (i.clearcoat = t.clearcoat),
          void 0 !== t.clearcoatRoughness &&
            (i.clearcoatRoughness = t.clearcoatRoughness),
          void 0 !== t.fog && (i.fog = t.fog),
          void 0 !== t.flatShading && (i.flatShading = t.flatShading),
          void 0 !== t.blending && (i.blending = t.blending),
          void 0 !== t.combine && (i.combine = t.combine),
          void 0 !== t.side && (i.side = t.side),
          void 0 !== t.opacity && (i.opacity = t.opacity),
          void 0 !== t.transparent && (i.transparent = t.transparent),
          void 0 !== t.alphaTest && (i.alphaTest = t.alphaTest),
          void 0 !== t.depthTest && (i.depthTest = t.depthTest),
          void 0 !== t.depthWrite && (i.depthWrite = t.depthWrite),
          void 0 !== t.colorWrite && (i.colorWrite = t.colorWrite),
          void 0 !== t.stencilWrite && (i.stencilWrite = t.stencilWrite),
          void 0 !== t.stencilWriteMask &&
            (i.stencilWriteMask = t.stencilWriteMask),
          void 0 !== t.stencilFunc && (i.stencilFunc = t.stencilFunc),
          void 0 !== t.stencilRef && (i.stencilRef = t.stencilRef),
          void 0 !== t.stencilFuncMask &&
            (i.stencilFuncMask = t.stencilFuncMask),
          void 0 !== t.stencilFail && (i.stencilFail = t.stencilFail),
          void 0 !== t.stencilZFail && (i.stencilZFail = t.stencilZFail),
          void 0 !== t.stencilZPass && (i.stencilZPass = t.stencilZPass),
          void 0 !== t.wireframe && (i.wireframe = t.wireframe),
          void 0 !== t.wireframeLinewidth &&
            (i.wireframeLinewidth = t.wireframeLinewidth),
          void 0 !== t.wireframeLinecap &&
            (i.wireframeLinecap = t.wireframeLinecap),
          void 0 !== t.wireframeLinejoin &&
            (i.wireframeLinejoin = t.wireframeLinejoin),
          void 0 !== t.rotation && (i.rotation = t.rotation),
          1 !== t.linewidth && (i.linewidth = t.linewidth),
          void 0 !== t.dashSize && (i.dashSize = t.dashSize),
          void 0 !== t.gapSize && (i.gapSize = t.gapSize),
          void 0 !== t.scale && (i.scale = t.scale),
          void 0 !== t.polygonOffset && (i.polygonOffset = t.polygonOffset),
          void 0 !== t.polygonOffsetFactor &&
            (i.polygonOffsetFactor = t.polygonOffsetFactor),
          void 0 !== t.polygonOffsetUnits &&
            (i.polygonOffsetUnits = t.polygonOffsetUnits),
          void 0 !== t.skinning && (i.skinning = t.skinning),
          void 0 !== t.morphTargets && (i.morphTargets = t.morphTargets),
          void 0 !== t.morphNormals && (i.morphNormals = t.morphNormals),
          void 0 !== t.dithering && (i.dithering = t.dithering),
          void 0 !== t.vertexTangents && (i.vertexTangents = t.vertexTangents),
          void 0 !== t.visible && (i.visible = t.visible),
          void 0 !== t.toneMapped && (i.toneMapped = t.toneMapped),
          void 0 !== t.userData && (i.userData = t.userData),
          void 0 !== t.vertexColors &&
            ("number" == typeof t.vertexColors
              ? (i.vertexColors = t.vertexColors > 0)
              : (i.vertexColors = t.vertexColors)),
          void 0 !== t.uniforms)
        )
          for (const e in t.uniforms) {
            const r = t.uniforms[e];
            switch (((i.uniforms[e] = {}), r.type)) {
              case "t":
                i.uniforms[e].value = n(r.value);
                break;
              case "c":
                i.uniforms[e].value = new le().setHex(r.value);
                break;
              case "v2":
                i.uniforms[e].value = new P().fromArray(r.value);
                break;
              case "v3":
                i.uniforms[e].value = new G().fromArray(r.value);
                break;
              case "v4":
                i.uniforms[e].value = new U().fromArray(r.value);
                break;
              case "m3":
                i.uniforms[e].value = new O().fromArray(r.value);
                break;
              case "m4":
                i.uniforms[e].value = new gt().fromArray(r.value);
                break;
              default:
                i.uniforms[e].value = r.value;
            }
          }
        if (
          (void 0 !== t.defines && (i.defines = t.defines),
          void 0 !== t.vertexShader && (i.vertexShader = t.vertexShader),
          void 0 !== t.fragmentShader && (i.fragmentShader = t.fragmentShader),
          void 0 !== t.extensions)
        )
          for (const e in t.extensions) i.extensions[e] = t.extensions[e];
        if (
          (void 0 !== t.shading && (i.flatShading = 1 === t.shading),
          void 0 !== t.size && (i.size = t.size),
          void 0 !== t.sizeAttenuation &&
            (i.sizeAttenuation = t.sizeAttenuation),
          void 0 !== t.map && (i.map = n(t.map)),
          void 0 !== t.matcap && (i.matcap = n(t.matcap)),
          void 0 !== t.alphaMap && (i.alphaMap = n(t.alphaMap)),
          void 0 !== t.bumpMap && (i.bumpMap = n(t.bumpMap)),
          void 0 !== t.bumpScale && (i.bumpScale = t.bumpScale),
          void 0 !== t.normalMap && (i.normalMap = n(t.normalMap)),
          void 0 !== t.normalMapType && (i.normalMapType = t.normalMapType),
          void 0 !== t.normalScale)
        ) {
          let e = t.normalScale;
          !1 === Array.isArray(e) && (e = [e, e]),
            (i.normalScale = new P().fromArray(e));
        }
        return (
          void 0 !== t.displacementMap &&
            (i.displacementMap = n(t.displacementMap)),
          void 0 !== t.displacementScale &&
            (i.displacementScale = t.displacementScale),
          void 0 !== t.displacementBias &&
            (i.displacementBias = t.displacementBias),
          void 0 !== t.roughnessMap && (i.roughnessMap = n(t.roughnessMap)),
          void 0 !== t.metalnessMap && (i.metalnessMap = n(t.metalnessMap)),
          void 0 !== t.emissiveMap && (i.emissiveMap = n(t.emissiveMap)),
          void 0 !== t.emissiveIntensity &&
            (i.emissiveIntensity = t.emissiveIntensity),
          void 0 !== t.specularMap && (i.specularMap = n(t.specularMap)),
          void 0 !== t.envMap && (i.envMap = n(t.envMap)),
          void 0 !== t.envMapIntensity &&
            (i.envMapIntensity = t.envMapIntensity),
          void 0 !== t.reflectivity && (i.reflectivity = t.reflectivity),
          void 0 !== t.refractionRatio &&
            (i.refractionRatio = t.refractionRatio),
          void 0 !== t.lightMap && (i.lightMap = n(t.lightMap)),
          void 0 !== t.lightMapIntensity &&
            (i.lightMapIntensity = t.lightMapIntensity),
          void 0 !== t.aoMap && (i.aoMap = n(t.aoMap)),
          void 0 !== t.aoMapIntensity && (i.aoMapIntensity = t.aoMapIntensity),
          void 0 !== t.gradientMap && (i.gradientMap = n(t.gradientMap)),
          void 0 !== t.clearcoatMap && (i.clearcoatMap = n(t.clearcoatMap)),
          void 0 !== t.clearcoatRoughnessMap &&
            (i.clearcoatRoughnessMap = n(t.clearcoatRoughnessMap)),
          void 0 !== t.clearcoatNormalMap &&
            (i.clearcoatNormalMap = n(t.clearcoatNormalMap)),
          void 0 !== t.clearcoatNormalScale &&
            (i.clearcoatNormalScale = new P().fromArray(
              t.clearcoatNormalScale
            )),
          void 0 !== t.transmission && (i.transmission = t.transmission),
          void 0 !== t.transmissionMap &&
            (i.transmissionMap = n(t.transmissionMap)),
          i
        );
      },
      setTextures: function (t) {
        return (this.textures = t), this;
      },
    }));
  function ja() {
    Ue.call(this),
      (this.type = "InstancedBufferGeometry"),
      (this.instanceCount = 1 / 0);
  }
  function Wa(t, e, n, i) {
    "number" == typeof n &&
      ((i = n),
      (n = !1),
      console.error(
        "THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument."
      )),
      ge.call(this, t, e, n),
      (this.meshPerAttribute = i || 1);
  }
  function qa(t) {
    Qs.call(this, t);
  }
  function Xa(t) {
    "undefined" == typeof createImageBitmap &&
      console.warn(
        "THREE.ImageBitmapLoader: createImageBitmap() not supported."
      ),
      "undefined" == typeof fetch &&
        console.warn("THREE.ImageBitmapLoader: fetch() not supported."),
      Qs.call(this, t),
      (this.options = { premultiplyAlpha: "none" });
  }
  function Ya() {
    (this.type = "ShapePath"),
      (this.color = new le()),
      (this.subPaths = []),
      (this.currentPath = null);
  }
  function Za(t) {
    (this.type = "Font"), (this.data = t);
  }
  function Ja(t, e, n, i, r) {
    const o = r.glyphs[t] || r.glyphs["?"];
    if (!o)
      return void console.error(
        'THREE.Font: character "' +
          t +
          '" does not exists in font family ' +
          r.familyName +
          "."
      );
    const s = new Ya();
    let a, c, l, h, u, d, p, f;
    if (o.o) {
      const t = o._cachedOutline || (o._cachedOutline = o.o.split(" "));
      for (let r = 0, o = t.length; r < o; )
        switch (t[r++]) {
          case "m":
            (a = t[r++] * e + n), (c = t[r++] * e + i), s.moveTo(a, c);
            break;
          case "l":
            (a = t[r++] * e + n), (c = t[r++] * e + i), s.lineTo(a, c);
            break;
          case "q":
            (l = t[r++] * e + n),
              (h = t[r++] * e + i),
              (u = t[r++] * e + n),
              (d = t[r++] * e + i),
              s.quadraticCurveTo(u, d, l, h);
            break;
          case "b":
            (l = t[r++] * e + n),
              (h = t[r++] * e + i),
              (u = t[r++] * e + n),
              (d = t[r++] * e + i),
              (p = t[r++] * e + n),
              (f = t[r++] * e + i),
              s.bezierCurveTo(u, d, p, f, l, h);
        }
    }
    return { offsetX: o.ha * e, path: s };
  }
  function Qa(t) {
    Qs.call(this, t);
  }
  let Ka;
  (ja.prototype = Object.assign(Object.create(Ue.prototype), {
    constructor: ja,
    isInstancedBufferGeometry: !0,
    copy: function (t) {
      return (
        Ue.prototype.copy.call(this, t),
        (this.instanceCount = t.instanceCount),
        this
      );
    },
    clone: function () {
      return new this.constructor().copy(this);
    },
    toJSON: function () {
      const t = Ue.prototype.toJSON.call(this);
      return (
        (t.instanceCount = this.instanceCount),
        (t.isInstancedBufferGeometry = !0),
        t
      );
    },
  })),
    (Wa.prototype = Object.assign(Object.create(ge.prototype), {
      constructor: Wa,
      isInstancedBufferAttribute: !0,
      copy: function (t) {
        return (
          ge.prototype.copy.call(this, t),
          (this.meshPerAttribute = t.meshPerAttribute),
          this
        );
      },
      toJSON: function () {
        const t = ge.prototype.toJSON.call(this);
        return (
          (t.meshPerAttribute = this.meshPerAttribute),
          (t.isInstancedBufferAttribute = !0),
          t
        );
      },
    })),
    (qa.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: qa,
      load: function (t, e, n, i) {
        const r = this,
          o = new $s(r.manager);
        o.setPath(r.path),
          o.setRequestHeader(r.requestHeader),
          o.setWithCredentials(r.withCredentials),
          o.load(
            t,
            function (n) {
              try {
                e(r.parse(JSON.parse(n)));
              } catch (e) {
                i ? i(e) : console.error(e), r.manager.itemError(t);
              }
            },
            n,
            i
          );
      },
      parse: function (t) {
        const e = {},
          n = {};
        function i(t, i) {
          if (void 0 !== e[i]) return e[i];
          const r = t.interleavedBuffers[i],
            o = (function (t, e) {
              if (void 0 !== n[e]) return n[e];
              const i = t.arrayBuffers[e],
                r = new Uint32Array(i).buffer;
              return (n[e] = r), r;
            })(t, r.buffer),
            s = new Rr(Re(r.type, o), r.stride);
          return (s.uuid = r.uuid), (e[i] = s), s;
        }
        const r = t.isInstancedBufferGeometry ? new ja() : new Ue(),
          o = t.data.index;
        if (void 0 !== o) {
          const t = Re(o.type, o.array);
          r.setIndex(new ge(t, 1));
        }
        const s = t.data.attributes;
        for (const e in s) {
          const n = s[e];
          let o;
          if (n.isInterleavedBufferAttribute)
            o = new Or(i(t.data, n.data), n.itemSize, n.offset, n.normalized);
          else {
            const t = Re(n.type, n.array);
            o = new (n.isInstancedBufferAttribute ? Wa : ge)(
              t,
              n.itemSize,
              n.normalized
            );
          }
          void 0 !== n.name && (o.name = n.name), r.setAttribute(e, o);
        }
        const a = t.data.morphAttributes;
        if (a)
          for (const e in a) {
            const n = a[e],
              o = [];
            for (let e = 0, r = n.length; e < r; e++) {
              const r = n[e];
              let s;
              (s = r.isInterleavedBufferAttribute
                ? new Or(i(t.data, r.data), r.itemSize, r.offset, r.normalized)
                : new ge(Re(r.type, r.array), r.itemSize, r.normalized)),
                void 0 !== r.name && (s.name = r.name),
                o.push(s);
            }
            r.morphAttributes[e] = o;
          }
        t.data.morphTargetsRelative && (r.morphTargetsRelative = !0);
        const c = t.data.groups || t.data.drawcalls || t.data.offsets;
        if (void 0 !== c)
          for (let t = 0, e = c.length; t !== e; ++t) {
            const e = c[t];
            r.addGroup(e.start, e.count, e.materialIndex);
          }
        const l = t.data.boundingSphere;
        if (void 0 !== l) {
          const t = new G();
          void 0 !== l.center && t.fromArray(l.center),
            (r.boundingSphere = new at(t, l.radius));
        }
        return (
          t.name && (r.name = t.name),
          t.userData && (r.userData = t.userData),
          r
        );
      },
    })),
    (Xa.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: Xa,
      isImageBitmapLoader: !0,
      setOptions: function (t) {
        return (this.options = t), this;
      },
      load: function (t, e, n, i) {
        void 0 === t && (t = ""),
          void 0 !== this.path && (t = this.path + t),
          (t = this.manager.resolveURL(t));
        const r = this,
          o = Zs.get(t);
        if (void 0 !== o)
          return (
            r.manager.itemStart(t),
            setTimeout(function () {
              e && e(o), r.manager.itemEnd(t);
            }, 0),
            o
          );
        const s = {};
        (s.credentials =
          "anonymous" === this.crossOrigin ? "same-origin" : "include"),
          fetch(t, s)
            .then(function (t) {
              return t.blob();
            })
            .then(function (t) {
              return createImageBitmap(t, r.options);
            })
            .then(function (n) {
              Zs.add(t, n), e && e(n), r.manager.itemEnd(t);
            })
            .catch(function (e) {
              i && i(e), r.manager.itemError(t), r.manager.itemEnd(t);
            }),
          r.manager.itemStart(t);
      },
    })),
    Object.assign(Ya.prototype, {
      moveTo: function (t, e) {
        return (
          (this.currentPath = new Aa()),
          this.subPaths.push(this.currentPath),
          this.currentPath.moveTo(t, e),
          this
        );
      },
      lineTo: function (t, e) {
        return this.currentPath.lineTo(t, e), this;
      },
      quadraticCurveTo: function (t, e, n, i) {
        return this.currentPath.quadraticCurveTo(t, e, n, i), this;
      },
      bezierCurveTo: function (t, e, n, i, r, o) {
        return this.currentPath.bezierCurveTo(t, e, n, i, r, o), this;
      },
      splineThru: function (t) {
        return this.currentPath.splineThru(t), this;
      },
      toShapes: function (t, e) {
        function n(t) {
          const e = [];
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n],
              r = new La();
            (r.curves = i.curves), e.push(r);
          }
          return e;
        }
        function i(t, e) {
          const n = e.length;
          let i = !1;
          for (let r = n - 1, o = 0; o < n; r = o++) {
            let n = e[r],
              s = e[o],
              a = s.x - n.x,
              c = s.y - n.y;
            if (Math.abs(c) > Number.EPSILON) {
              if (
                (c < 0 && ((n = e[o]), (a = -a), (s = e[r]), (c = -c)),
                t.y < n.y || t.y > s.y)
              )
                continue;
              if (t.y === n.y) {
                if (t.x === n.x) return !0;
              } else {
                const e = c * (t.x - n.x) - a * (t.y - n.y);
                if (0 === e) return !0;
                if (e < 0) continue;
                i = !i;
              }
            } else {
              if (t.y !== n.y) continue;
              if ((s.x <= t.x && t.x <= n.x) || (n.x <= t.x && t.x <= s.x))
                return !0;
            }
          }
          return i;
        }
        const r = us.isClockWise,
          o = this.subPaths;
        if (0 === o.length) return [];
        if (!0 === e) return n(o);
        let s, a, c;
        const l = [];
        if (1 === o.length)
          return (
            (a = o[0]), (c = new La()), (c.curves = a.curves), l.push(c), l
          );
        let h = !r(o[0].getPoints());
        h = t ? !h : h;
        const u = [],
          d = [];
        let p,
          f,
          m = [],
          g = 0;
        (d[g] = void 0), (m[g] = []);
        for (let e = 0, n = o.length; e < n; e++)
          (a = o[e]),
            (p = a.getPoints()),
            (s = r(p)),
            (s = t ? !s : s),
            s
              ? (!h && d[g] && g++,
                (d[g] = { s: new La(), p }),
                (d[g].s.curves = a.curves),
                h && g++,
                (m[g] = []))
              : m[g].push({ h: a, p: p[0] });
        if (!d[0]) return n(o);
        if (d.length > 1) {
          let t = !1;
          const e = [];
          for (let t = 0, e = d.length; t < e; t++) u[t] = [];
          for (let n = 0, r = d.length; n < r; n++) {
            const r = m[n];
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              let a = !0;
              for (let r = 0; r < d.length; r++)
                i(s.p, d[r].p) &&
                  (n !== r && e.push({ froms: n, tos: r, hole: o }),
                  a ? ((a = !1), u[r].push(s)) : (t = !0));
              a && u[n].push(s);
            }
          }
          e.length > 0 && (t || (m = u));
        }
        for (let t = 0, e = d.length; t < e; t++) {
          (c = d[t].s), l.push(c), (f = m[t]);
          for (let t = 0, e = f.length; t < e; t++) c.holes.push(f[t].h);
        }
        return l;
      },
    }),
    Object.assign(Za.prototype, {
      isFont: !0,
      generateShapes: function (t, e = 100) {
        const n = [],
          i = (function (t, e, n) {
            const i = Array.from ? Array.from(t) : String(t).split(""),
              r = e / n.resolution,
              o =
                (n.boundingBox.yMax -
                  n.boundingBox.yMin +
                  n.underlineThickness) *
                r,
              s = [];
            let a = 0,
              c = 0;
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              if ("\n" === e) (a = 0), (c -= o);
              else {
                const t = Ja(e, r, a, c, n);
                (a += t.offsetX), s.push(t.path);
              }
            }
            return s;
          })(t, e, this.data);
        for (let t = 0, e = i.length; t < e; t++)
          Array.prototype.push.apply(n, i[t].toShapes());
        return n;
      },
    }),
    (Qa.prototype = Object.assign(Object.create(Qs.prototype), {
      constructor: Qa,
      load: function (t, e, n, i) {
        const r = this,
          o = new $s(this.manager);
        o.setPath(this.path),
          o.setRequestHeader(this.requestHeader),
          o.setWithCredentials(r.withCredentials),
          o.load(
            t,
            function (t) {
              let n;
              try {
                n = JSON.parse(t);
              } catch (e) {
                console.warn(
                  "THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."
                ),
                  (n = JSON.parse(t.substring(65, t.length - 2)));
              }
              const i = r.parse(n);
              e && e(i);
            },
            n,
            i
          );
      },
      parse: function (t) {
        return new Za(t);
      },
    }));
  function $a(t) {
    Qs.call(this, t);
  }
  function tc(t, e, n) {
    Ga.call(this, void 0, n);
    const i = new le().set(t),
      r = new le().set(e),
      o = new G(i.r, i.g, i.b),
      s = new G(r.r, r.g, r.b),
      a = Math.sqrt(Math.PI),
      c = a * Math.sqrt(0.75);
    this.sh.coefficients[0].copy(o).add(s).multiplyScalar(a),
      this.sh.coefficients[1].copy(o).sub(s).multiplyScalar(c);
  }
  function ec(t, e) {
    Ga.call(this, void 0, e);
    const n = new le().set(t);
    this.sh.coefficients[0]
      .set(n.r, n.g, n.b)
      .multiplyScalar(2 * Math.sqrt(Math.PI));
  }
  ($a.prototype = Object.assign(Object.create(Qs.prototype), {
    constructor: $a,
    load: function (t, e, n, i) {
      const r = this,
        o = new $s(r.manager);
      o.setResponseType("arraybuffer"),
        o.setPath(r.path),
        o.setRequestHeader(r.requestHeader),
        o.setWithCredentials(r.withCredentials),
        o.load(
          t,
          function (n) {
            try {
              const t = n.slice(0);
              (void 0 === Ka &&
                (Ka = new (window.AudioContext || window.webkitAudioContext)()),
              Ka).decodeAudioData(t, function (t) {
                e(t);
              });
            } catch (e) {
              i ? i(e) : console.error(e), r.manager.itemError(t);
            }
          },
          n,
          i
        );
    },
  })),
    (tc.prototype = Object.assign(Object.create(Ga.prototype), {
      constructor: tc,
      isHemisphereLightProbe: !0,
      copy: function (t) {
        return Ga.prototype.copy.call(this, t), this;
      },
      toJSON: function (t) {
        return Ga.prototype.toJSON.call(this, t);
      },
    })),
    (ec.prototype = Object.assign(Object.create(Ga.prototype), {
      constructor: ec,
      isAmbientLightProbe: !0,
      copy: function (t) {
        return Ga.prototype.copy.call(this, t), this;
      },
      toJSON: function (t) {
        return Ga.prototype.toJSON.call(this, t);
      },
    }));
  const nc = new gt(),
    ic = new gt();
  Object.assign(
    function () {
      (this.type = "StereoCamera"),
        (this.aspect = 1),
        (this.eyeSep = 0.064),
        (this.cameraL = new dn()),
        this.cameraL.layers.enable(1),
        (this.cameraL.matrixAutoUpdate = !1),
        (this.cameraR = new dn()),
        this.cameraR.layers.enable(2),
        (this.cameraR.matrixAutoUpdate = !1),
        (this._cache = {
          focus: null,
          fov: null,
          aspect: null,
          near: null,
          far: null,
          zoom: null,
          eyeSep: null,
        });
    }.prototype,
    {
      update: function (t) {
        const e = this._cache;
        if (
          e.focus !== t.focus ||
          e.fov !== t.fov ||
          e.aspect !== t.aspect * this.aspect ||
          e.near !== t.near ||
          e.far !== t.far ||
          e.zoom !== t.zoom ||
          e.eyeSep !== this.eyeSep
        ) {
          (e.focus = t.focus),
            (e.fov = t.fov),
            (e.aspect = t.aspect * this.aspect),
            (e.near = t.near),
            (e.far = t.far),
            (e.zoom = t.zoom),
            (e.eyeSep = this.eyeSep);
          const n = t.projectionMatrix.clone(),
            i = e.eyeSep / 2,
            r = (i * e.near) / e.focus,
            o = (e.near * Math.tan(R.DEG2RAD * e.fov * 0.5)) / e.zoom;
          let s, a;
          (ic.elements[12] = -i),
            (nc.elements[12] = i),
            (s = -o * e.aspect + r),
            (a = o * e.aspect + r),
            (n.elements[0] = (2 * e.near) / (a - s)),
            (n.elements[8] = (a + s) / (a - s)),
            this.cameraL.projectionMatrix.copy(n),
            (s = -o * e.aspect - r),
            (a = o * e.aspect - r),
            (n.elements[0] = (2 * e.near) / (a - s)),
            (n.elements[8] = (a + s) / (a - s)),
            this.cameraR.projectionMatrix.copy(n);
        }
        this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(ic),
          this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(nc);
      },
    }
  );
  function rc() {
    return ("undefined" == typeof performance ? Date : performance).now();
  }
  function oc(t, e, n) {
    let i, r, o;
    switch (((this.binding = t), (this.valueSize = n), e)) {
      case "quaternion":
        (i = this._slerp),
          (r = this._slerpAdditive),
          (o = this._setAdditiveIdentityQuaternion),
          (this.buffer = new Float64Array(6 * n)),
          (this._workIndex = 5);
        break;
      case "string":
      case "bool":
        (i = this._select),
          (r = this._select),
          (o = this._setAdditiveIdentityOther),
          (this.buffer = new Array(5 * n));
        break;
      default:
        (i = this._lerp),
          (r = this._lerpAdditive),
          (o = this._setAdditiveIdentityNumeric),
          (this.buffer = new Float64Array(5 * n));
    }
    (this._mixBufferRegion = i),
      (this._mixBufferRegionAdditive = r),
      (this._setIdentity = o),
      (this._origIndex = 3),
      (this._addIndex = 4),
      (this.cumulativeWeight = 0),
      (this.cumulativeWeightAdditive = 0),
      (this.useCount = 0),
      (this.referenceCount = 0);
  }
  Object.assign(oc.prototype, {
    accumulate: function (t, e) {
      const n = this.buffer,
        i = this.valueSize,
        r = t * i + i;
      let o = this.cumulativeWeight;
      if (0 === o) {
        for (let t = 0; t !== i; ++t) n[r + t] = n[t];
        o = e;
      } else {
        o += e;
        const t = e / o;
        this._mixBufferRegion(n, r, 0, t, i);
      }
      this.cumulativeWeight = o;
    },
    accumulateAdditive: function (t) {
      const e = this.buffer,
        n = this.valueSize,
        i = n * this._addIndex;
      0 === this.cumulativeWeightAdditive && this._setIdentity(),
        this._mixBufferRegionAdditive(e, i, 0, t, n),
        (this.cumulativeWeightAdditive += t);
    },
    apply: function (t) {
      const e = this.valueSize,
        n = this.buffer,
        i = t * e + e,
        r = this.cumulativeWeight,
        o = this.cumulativeWeightAdditive,
        s = this.binding;
      if (
        ((this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0),
        r < 1)
      ) {
        const t = e * this._origIndex;
        this._mixBufferRegion(n, i, t, 1 - r, e);
      }
      o > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * e, 1, e);
      for (let t = e, r = e + e; t !== r; ++t)
        if (n[t] !== n[t + e]) {
          s.setValue(n, i);
          break;
        }
    },
    saveOriginalState: function () {
      const t = this.binding,
        e = this.buffer,
        n = this.valueSize,
        i = n * this._origIndex;
      t.getValue(e, i);
      for (let t = n, r = i; t !== r; ++t) e[t] = e[i + (t % n)];
      this._setIdentity(),
        (this.cumulativeWeight = 0),
        (this.cumulativeWeightAdditive = 0);
    },
    restoreOriginalState: function () {
      const t = 3 * this.valueSize;
      this.binding.setValue(this.buffer, t);
    },
    _setAdditiveIdentityNumeric: function () {
      const t = this._addIndex * this.valueSize,
        e = t + this.valueSize;
      for (let n = t; n < e; n++) this.buffer[n] = 0;
    },
    _setAdditiveIdentityQuaternion: function () {
      this._setAdditiveIdentityNumeric(),
        (this.buffer[this._addIndex * this.valueSize + 3] = 1);
    },
    _setAdditiveIdentityOther: function () {
      const t = this._origIndex * this.valueSize,
        e = this._addIndex * this.valueSize;
      for (let n = 0; n < this.valueSize; n++)
        this.buffer[e + n] = this.buffer[t + n];
    },
    _select: function (t, e, n, i, r) {
      if (i >= 0.5) for (let i = 0; i !== r; ++i) t[e + i] = t[n + i];
    },
    _slerp: function (t, e, n, i) {
      k.slerpFlat(t, e, t, e, t, n, i);
    },
    _slerpAdditive: function (t, e, n, i, r) {
      const o = this._workIndex * r;
      k.multiplyQuaternionsFlat(t, o, t, e, t, n),
        k.slerpFlat(t, e, t, e, t, o, i);
    },
    _lerp: function (t, e, n, i, r) {
      const o = 1 - i;
      for (let s = 0; s !== r; ++s) {
        const r = e + s;
        t[r] = t[r] * o + t[n + s] * i;
      }
    },
    _lerpAdditive: function (t, e, n, i, r) {
      for (let o = 0; o !== r; ++o) {
        const r = e + o;
        t[r] = t[r] + t[n + o] * i;
      }
    },
  });
  const sc = new RegExp("[\\[\\]\\.:\\/]", "g"),
    ac = "[^\\[\\]\\.:\\/]",
    cc = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
    lc = /((?:WC+[\/:])*)/.source.replace("WC", ac),
    hc = /(WCOD+)?/.source.replace("WCOD", cc),
    uc = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", ac),
    dc = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", ac),
    pc = new RegExp("^" + lc + hc + uc + dc + "$"),
    fc = ["material", "materials", "bones"];
  function mc(t, e, n) {
    const i = n || gc.parseTrackName(e);
    (this._targetGroup = t), (this._bindings = t.subscribe_(e, i));
  }
  function gc(t, e, n) {
    (this.path = e),
      (this.parsedPath = n || gc.parseTrackName(e)),
      (this.node = gc.findNode(t, this.parsedPath.nodeName) || t),
      (this.rootNode = t);
  }
  Object.assign(mc.prototype, {
    getValue: function (t, e) {
      this.bind();
      const n = this._targetGroup.nCachedObjects_,
        i = this._bindings[n];
      void 0 !== i && i.getValue(t, e);
    },
    setValue: function (t, e) {
      const n = this._bindings;
      for (
        let i = this._targetGroup.nCachedObjects_, r = n.length;
        i !== r;
        ++i
      )
        n[i].setValue(t, e);
    },
    bind: function () {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, n = t.length;
        e !== n;
        ++e
      )
        t[e].bind();
    },
    unbind: function () {
      const t = this._bindings;
      for (
        let e = this._targetGroup.nCachedObjects_, n = t.length;
        e !== n;
        ++e
      )
        t[e].unbind();
    },
  }),
    Object.assign(gc, {
      Composite: mc,
      create: function (t, e, n) {
        return t && t.isAnimationObjectGroup
          ? new gc.Composite(t, e, n)
          : new gc(t, e, n);
      },
      sanitizeNodeName: function (t) {
        return t.replace(/\s/g, "_").replace(sc, "");
      },
      parseTrackName: function (t) {
        const e = pc.exec(t);
        if (!e)
          throw new Error("PropertyBinding: Cannot parse trackName: " + t);
        const n = {
            nodeName: e[2],
            objectName: e[3],
            objectIndex: e[4],
            propertyName: e[5],
            propertyIndex: e[6],
          },
          i = n.nodeName && n.nodeName.lastIndexOf(".");
        if (void 0 !== i && -1 !== i) {
          const t = n.nodeName.substring(i + 1);
          -1 !== fc.indexOf(t) &&
            ((n.nodeName = n.nodeName.substring(0, i)), (n.objectName = t));
        }
        if (null === n.propertyName || 0 === n.propertyName.length)
          throw new Error(
            "PropertyBinding: can not parse propertyName from trackName: " + t
          );
        return n;
      },
      findNode: function (t, e) {
        if (
          !e ||
          "" === e ||
          "." === e ||
          -1 === e ||
          e === t.name ||
          e === t.uuid
        )
          return t;
        if (t.skeleton) {
          const n = t.skeleton.getBoneByName(e);
          if (void 0 !== n) return n;
        }
        if (t.children) {
          const n = function (t) {
              for (let i = 0; i < t.length; i++) {
                const r = t[i];
                if (r.name === e || r.uuid === e) return r;
                const o = n(r.children);
                if (o) return o;
              }
              return null;
            },
            i = n(t.children);
          if (i) return i;
        }
        return null;
      },
    }),
    Object.assign(gc.prototype, {
      _getValue_unavailable: function () {},
      _setValue_unavailable: function () {},
      BindingType: {
        Direct: 0,
        EntireArray: 1,
        ArrayElement: 2,
        HasFromToArray: 3,
      },
      Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 },
      GetterByBindingType: [
        function (t, e) {
          t[e] = this.node[this.propertyName];
        },
        function (t, e) {
          const n = this.resolvedProperty;
          for (let i = 0, r = n.length; i !== r; ++i) t[e++] = n[i];
        },
        function (t, e) {
          t[e] = this.resolvedProperty[this.propertyIndex];
        },
        function (t, e) {
          this.resolvedProperty.toArray(t, e);
        },
      ],
      SetterByBindingTypeAndVersioning: [
        [
          function (t, e) {
            this.targetObject[this.propertyName] = t[e];
          },
          function (t, e) {
            (this.targetObject[this.propertyName] = t[e]),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            (this.targetObject[this.propertyName] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
        [
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
          },
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
            this.targetObject.needsUpdate = !0;
          },
          function (t, e) {
            const n = this.resolvedProperty;
            for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
            this.targetObject.matrixWorldNeedsUpdate = !0;
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e];
          },
          function (t, e) {
            (this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            (this.resolvedProperty[this.propertyIndex] = t[e]),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
        [
          function (t, e) {
            this.resolvedProperty.fromArray(t, e);
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e),
              (this.targetObject.needsUpdate = !0);
          },
          function (t, e) {
            this.resolvedProperty.fromArray(t, e),
              (this.targetObject.matrixWorldNeedsUpdate = !0);
          },
        ],
      ],
      getValue: function (t, e) {
        this.bind(), this.getValue(t, e);
      },
      setValue: function (t, e) {
        this.bind(), this.setValue(t, e);
      },
      bind: function () {
        let t = this.node;
        const e = this.parsedPath,
          n = e.objectName,
          i = e.propertyName;
        let r = e.propertyIndex;
        if (
          (t ||
            ((t = gc.findNode(this.rootNode, e.nodeName) || this.rootNode),
            (this.node = t)),
          (this.getValue = this._getValue_unavailable),
          (this.setValue = this._setValue_unavailable),
          !t)
        )
          return void console.error(
            "THREE.PropertyBinding: Trying to update node for track: " +
              this.path +
              " but it wasn't found."
          );
        if (n) {
          let i = e.objectIndex;
          switch (n) {
            case "materials":
              if (!t.material)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material as node does not have a material.",
                  this
                );
              if (!t.material.materials)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",
                  this
                );
              t = t.material.materials;
              break;
            case "bones":
              if (!t.skeleton)
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",
                  this
                );
              t = t.skeleton.bones;
              for (let e = 0; e < t.length; e++)
                if (t[e].name === i) {
                  i = e;
                  break;
                }
              break;
            default:
              if (void 0 === t[n])
                return void console.error(
                  "THREE.PropertyBinding: Can not bind to objectName of node undefined.",
                  this
                );
              t = t[n];
          }
          if (void 0 !== i) {
            if (void 0 === t[i])
              return void console.error(
                "THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",
                this,
                t
              );
            t = t[i];
          }
        }
        const o = t[i];
        if (void 0 === o) {
          const n = e.nodeName;
          return void console.error(
            "THREE.PropertyBinding: Trying to update property for track: " +
              n +
              "." +
              i +
              " but it wasn't found.",
            t
          );
        }
        let s = this.Versioning.None;
        (this.targetObject = t),
          void 0 !== t.needsUpdate
            ? (s = this.Versioning.NeedsUpdate)
            : void 0 !== t.matrixWorldNeedsUpdate &&
              (s = this.Versioning.MatrixWorldNeedsUpdate);
        let a = this.BindingType.Direct;
        if (void 0 !== r) {
          if ("morphTargetInfluences" === i) {
            if (!t.geometry)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",
                this
              );
            if (!t.geometry.isBufferGeometry)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",
                this
              );
            if (!t.geometry.morphAttributes)
              return void console.error(
                "THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",
                this
              );
            void 0 !== t.morphTargetDictionary[r] &&
              (r = t.morphTargetDictionary[r]);
          }
          (a = this.BindingType.ArrayElement),
            (this.resolvedProperty = o),
            (this.propertyIndex = r);
        } else
          void 0 !== o.fromArray && void 0 !== o.toArray
            ? ((a = this.BindingType.HasFromToArray),
              (this.resolvedProperty = o))
            : Array.isArray(o)
            ? ((a = this.BindingType.EntireArray), (this.resolvedProperty = o))
            : (this.propertyName = i);
        (this.getValue = this.GetterByBindingType[a]),
          (this.setValue = this.SetterByBindingTypeAndVersioning[a][s]);
      },
      unbind: function () {
        (this.node = null),
          (this.getValue = this._getValue_unbound),
          (this.setValue = this._setValue_unbound);
      },
    }),
    Object.assign(gc.prototype, {
      _getValue_unbound: gc.prototype.getValue,
      _setValue_unbound: gc.prototype.setValue,
    }),
    Object.assign(
      function () {
        (this.uuid = R.generateUUID()),
          (this._objects = Array.prototype.slice.call(arguments)),
          (this.nCachedObjects_ = 0);
        const t = {};
        this._indicesByUUID = t;
        for (let e = 0, n = arguments.length; e !== n; ++e)
          t[arguments[e].uuid] = e;
        (this._paths = []),
          (this._parsedPaths = []),
          (this._bindings = []),
          (this._bindingsIndicesByPath = {});
        const e = this;
        this.stats = {
          objects: {
            get total() {
              return e._objects.length;
            },
            get inUse() {
              return this.total - e.nCachedObjects_;
            },
          },
          get bindingsPerObject() {
            return e._bindings.length;
          },
        };
      }.prototype,
      {
        isAnimationObjectGroup: !0,
        add: function () {
          const t = this._objects,
            e = this._indicesByUUID,
            n = this._paths,
            i = this._parsedPaths,
            r = this._bindings,
            o = r.length;
          let s,
            a = t.length,
            c = this.nCachedObjects_;
          for (let l = 0, h = arguments.length; l !== h; ++l) {
            const h = arguments[l],
              u = h.uuid;
            let d = e[u];
            if (void 0 === d) {
              (d = a++), (e[u] = d), t.push(h);
              for (let t = 0, e = o; t !== e; ++t)
                r[t].push(new gc(h, n[t], i[t]));
            } else if (d < c) {
              s = t[d];
              const a = --c,
                l = t[a];
              (e[l.uuid] = d), (t[d] = l), (e[u] = a), (t[a] = h);
              for (let t = 0, e = o; t !== e; ++t) {
                const e = r[t],
                  o = e[a];
                let s = e[d];
                (e[d] = o),
                  void 0 === s && (s = new gc(h, n[t], i[t])),
                  (e[a] = s);
              }
            } else
              t[d] !== s &&
                console.error(
                  "THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes."
                );
          }
          this.nCachedObjects_ = c;
        },
        remove: function () {
          const t = this._objects,
            e = this._indicesByUUID,
            n = this._bindings,
            i = n.length;
          let r = this.nCachedObjects_;
          for (let o = 0, s = arguments.length; o !== s; ++o) {
            const s = arguments[o],
              a = s.uuid,
              c = e[a];
            if (void 0 !== c && c >= r) {
              const o = r++,
                l = t[o];
              (e[l.uuid] = c), (t[c] = l), (e[a] = o), (t[o] = s);
              for (let t = 0, e = i; t !== e; ++t) {
                const e = n[t],
                  i = e[o],
                  r = e[c];
                (e[c] = i), (e[o] = r);
              }
            }
          }
          this.nCachedObjects_ = r;
        },
        uncache: function () {
          const t = this._objects,
            e = this._indicesByUUID,
            n = this._bindings,
            i = n.length;
          let r = this.nCachedObjects_,
            o = t.length;
          for (let s = 0, a = arguments.length; s !== a; ++s) {
            const a = arguments[s].uuid,
              c = e[a];
            if (void 0 !== c)
              if ((delete e[a], c < r)) {
                const s = --r,
                  a = t[s],
                  l = --o,
                  h = t[l];
                (e[a.uuid] = c),
                  (t[c] = a),
                  (e[h.uuid] = s),
                  (t[s] = h),
                  t.pop();
                for (let t = 0, e = i; t !== e; ++t) {
                  const e = n[t],
                    i = e[s],
                    r = e[l];
                  (e[c] = i), (e[s] = r), e.pop();
                }
              } else {
                const r = --o,
                  s = t[r];
                r > 0 && (e[s.uuid] = c), (t[c] = s), t.pop();
                for (let t = 0, e = i; t !== e; ++t) {
                  const e = n[t];
                  (e[c] = e[r]), e.pop();
                }
              }
          }
          this.nCachedObjects_ = r;
        },
        subscribe_: function (t, e) {
          const n = this._bindingsIndicesByPath;
          let i = n[t];
          const r = this._bindings;
          if (void 0 !== i) return r[i];
          const o = this._paths,
            s = this._parsedPaths,
            a = this._objects,
            c = a.length,
            l = this.nCachedObjects_,
            h = new Array(c);
          (i = r.length), (n[t] = i), o.push(t), s.push(e), r.push(h);
          for (let n = l, i = a.length; n !== i; ++n) {
            const i = a[n];
            h[n] = new gc(i, t, e);
          }
          return h;
        },
        unsubscribe_: function (t) {
          const e = this._bindingsIndicesByPath,
            n = e[t];
          if (void 0 !== n) {
            const i = this._paths,
              r = this._parsedPaths,
              o = this._bindings,
              s = o.length - 1,
              a = o[s];
            (e[t[s]] = n),
              (o[n] = a),
              o.pop(),
              (r[n] = r[s]),
              r.pop(),
              (i[n] = i[s]),
              i.pop();
          }
        },
      }
    );
  class vc {
    constructor(t, e, n = null, i = e.blendMode) {
      (this._mixer = t),
        (this._clip = e),
        (this._localRoot = n),
        (this.blendMode = i);
      const r = e.tracks,
        o = r.length,
        s = new Array(o),
        a = { endingStart: _, endingEnd: _ };
      for (let t = 0; t !== o; ++t) {
        const e = r[t].createInterpolant(null);
        (s[t] = e), (e.settings = a);
      }
      (this._interpolantSettings = a),
        (this._interpolants = s),
        (this._propertyBindings = new Array(o)),
        (this._cacheIndex = null),
        (this._byClipCacheIndex = null),
        (this._timeScaleInterpolant = null),
        (this._weightInterpolant = null),
        (this.loop = 2201),
        (this._loopCount = -1),
        (this._startTime = null),
        (this.time = 0),
        (this.timeScale = 1),
        (this._effectiveTimeScale = 1),
        (this.weight = 1),
        (this._effectiveWeight = 1),
        (this.repetitions = 1 / 0),
        (this.paused = !1),
        (this.enabled = !0),
        (this.clampWhenFinished = !1),
        (this.zeroSlopeAtStart = !0),
        (this.zeroSlopeAtEnd = !0);
    }
    play() {
      return this._mixer._activateAction(this), this;
    }
    stop() {
      return this._mixer._deactivateAction(this), this.reset();
    }
    reset() {
      return (
        (this.paused = !1),
        (this.enabled = !0),
        (this.time = 0),
        (this._loopCount = -1),
        (this._startTime = null),
        this.stopFading().stopWarping()
      );
    }
    isRunning() {
      return (
        this.enabled &&
        !this.paused &&
        0 !== this.timeScale &&
        null === this._startTime &&
        this._mixer._isActiveAction(this)
      );
    }
    isScheduled() {
      return this._mixer._isActiveAction(this);
    }
    startAt(t) {
      return (this._startTime = t), this;
    }
    setLoop(t, e) {
      return (this.loop = t), (this.repetitions = e), this;
    }
    setEffectiveWeight(t) {
      return (
        (this.weight = t),
        (this._effectiveWeight = this.enabled ? t : 0),
        this.stopFading()
      );
    }
    getEffectiveWeight() {
      return this._effectiveWeight;
    }
    fadeIn(t) {
      return this._scheduleFading(t, 0, 1);
    }
    fadeOut(t) {
      return this._scheduleFading(t, 1, 0);
    }
    crossFadeFrom(t, e, n) {
      if ((t.fadeOut(e), this.fadeIn(e), n)) {
        const n = this._clip.duration,
          i = t._clip.duration,
          r = i / n,
          o = n / i;
        t.warp(1, r, e), this.warp(o, 1, e);
      }
      return this;
    }
    crossFadeTo(t, e, n) {
      return t.crossFadeFrom(this, e, n);
    }
    stopFading() {
      const t = this._weightInterpolant;
      return (
        null !== t &&
          ((this._weightInterpolant = null),
          this._mixer._takeBackControlInterpolant(t)),
        this
      );
    }
    setEffectiveTimeScale(t) {
      return (
        (this.timeScale = t),
        (this._effectiveTimeScale = this.paused ? 0 : t),
        this.stopWarping()
      );
    }
    getEffectiveTimeScale() {
      return this._effectiveTimeScale;
    }
    setDuration(t) {
      return (this.timeScale = this._clip.duration / t), this.stopWarping();
    }
    syncWith(t) {
      return (
        (this.time = t.time), (this.timeScale = t.timeScale), this.stopWarping()
      );
    }
    halt(t) {
      return this.warp(this._effectiveTimeScale, 0, t);
    }
    warp(t, e, n) {
      const i = this._mixer,
        r = i.time,
        o = this.timeScale;
      let s = this._timeScaleInterpolant;
      null === s &&
        ((s = i._lendControlInterpolant()), (this._timeScaleInterpolant = s));
      const a = s.parameterPositions,
        c = s.sampleValues;
      return (a[0] = r), (a[1] = r + n), (c[0] = t / o), (c[1] = e / o), this;
    }
    stopWarping() {
      const t = this._timeScaleInterpolant;
      return (
        null !== t &&
          ((this._timeScaleInterpolant = null),
          this._mixer._takeBackControlInterpolant(t)),
        this
      );
    }
    getMixer() {
      return this._mixer;
    }
    getClip() {
      return this._clip;
    }
    getRoot() {
      return this._localRoot || this._mixer._root;
    }
    _update(t, e, n, i) {
      if (!this.enabled) return void this._updateWeight(t);
      const r = this._startTime;
      if (null !== r) {
        const i = (t - r) * n;
        if (i < 0 || 0 === n) return;
        (this._startTime = null), (e = n * i);
      }
      e *= this._updateTimeScale(t);
      const o = this._updateTime(e),
        s = this._updateWeight(t);
      if (s > 0) {
        const t = this._interpolants,
          e = this._propertyBindings;
        switch (this.blendMode) {
          case 2501:
            for (let n = 0, i = t.length; n !== i; ++n)
              t[n].evaluate(o), e[n].accumulateAdditive(s);
            break;
          case 2500:
          default:
            for (let n = 0, r = t.length; n !== r; ++n)
              t[n].evaluate(o), e[n].accumulate(i, s);
        }
      }
    }
    _updateWeight(t) {
      let e = 0;
      if (this.enabled) {
        e = this.weight;
        const n = this._weightInterpolant;
        if (null !== n) {
          const i = n.evaluate(t)[0];
          (e *= i),
            t > n.parameterPositions[1] &&
              (this.stopFading(), 0 === i && (this.enabled = !1));
        }
      }
      return (this._effectiveWeight = e), e;
    }
    _updateTimeScale(t) {
      let e = 0;
      if (!this.paused) {
        e = this.timeScale;
        const n = this._timeScaleInterpolant;
        null !== n &&
          ((e *= n.evaluate(t)[0]),
          t > n.parameterPositions[1] &&
            (this.stopWarping(),
            0 === e ? (this.paused = !0) : (this.timeScale = e)));
      }
      return (this._effectiveTimeScale = e), e;
    }
    _updateTime(t) {
      const e = this._clip.duration,
        n = this.loop;
      let i = this.time + t,
        r = this._loopCount;
      const o = 2202 === n;
      if (0 === t) return -1 === r ? i : o && 1 == (1 & r) ? e - i : i;
      if (2200 === n) {
        -1 === r && ((this._loopCount = 0), this._setEndings(!0, !0, !1));
        t: {
          if (i >= e) i = e;
          else {
            if (!(i < 0)) {
              this.time = i;
              break t;
            }
            i = 0;
          }
          this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
            (this.time = i),
            this._mixer.dispatchEvent({
              type: "finished",
              action: this,
              direction: t < 0 ? -1 : 1,
            });
        }
      } else {
        if (
          (-1 === r &&
            (t >= 0
              ? ((r = 0), this._setEndings(!0, 0 === this.repetitions, o))
              : this._setEndings(0 === this.repetitions, !0, o)),
          i >= e || i < 0)
        ) {
          const n = Math.floor(i / e);
          (i -= e * n), (r += Math.abs(n));
          const s = this.repetitions - r;
          if (s <= 0)
            this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1),
              (i = t > 0 ? e : 0),
              (this.time = i),
              this._mixer.dispatchEvent({
                type: "finished",
                action: this,
                direction: t > 0 ? 1 : -1,
              });
          else {
            if (1 === s) {
              const e = t < 0;
              this._setEndings(e, !e, o);
            } else this._setEndings(!1, !1, o);
            (this._loopCount = r),
              (this.time = i),
              this._mixer.dispatchEvent({
                type: "loop",
                action: this,
                loopDelta: n,
              });
          }
        } else this.time = i;
        if (o && 1 == (1 & r)) return e - i;
      }
      return i;
    }
    _setEndings(t, e, n) {
      const i = this._interpolantSettings;
      n
        ? ((i.endingStart = x), (i.endingEnd = x))
        : ((i.endingStart = t ? (this.zeroSlopeAtStart ? x : _) : b),
          (i.endingEnd = e ? (this.zeroSlopeAtEnd ? x : _) : b));
    }
    _scheduleFading(t, e, n) {
      const i = this._mixer,
        r = i.time;
      let o = this._weightInterpolant;
      null === o &&
        ((o = i._lendControlInterpolant()), (this._weightInterpolant = o));
      const s = o.parameterPositions,
        a = o.sampleValues;
      return (s[0] = r), (a[0] = e), (s[1] = r + t), (a[1] = n), this;
    }
  }
  function yc(t) {
    (this._root = t),
      this._initMemoryManager(),
      (this._accuIndex = 0),
      (this.time = 0),
      (this.timeScale = 1);
  }
  yc.prototype = Object.assign(Object.create(A.prototype), {
    constructor: yc,
    _bindAction: function (t, e) {
      const n = t._localRoot || this._root,
        i = t._clip.tracks,
        r = i.length,
        o = t._propertyBindings,
        s = t._interpolants,
        a = n.uuid,
        c = this._bindingsByRootAndName;
      let l = c[a];
      void 0 === l && ((l = {}), (c[a] = l));
      for (let t = 0; t !== r; ++t) {
        const r = i[t],
          c = r.name;
        let h = l[c];
        if (void 0 !== h) o[t] = h;
        else {
          if (((h = o[t]), void 0 !== h)) {
            null === h._cacheIndex &&
              (++h.referenceCount, this._addInactiveBinding(h, a, c));
            continue;
          }
          const i = e && e._propertyBindings[t].binding.parsedPath;
          (h = new oc(gc.create(n, c, i), r.ValueTypeName, r.getValueSize())),
            ++h.referenceCount,
            this._addInactiveBinding(h, a, c),
            (o[t] = h);
        }
        s[t].resultBuffer = h.buffer;
      }
    },
    _activateAction: function (t) {
      if (!this._isActiveAction(t)) {
        if (null === t._cacheIndex) {
          const e = (t._localRoot || this._root).uuid,
            n = t._clip.uuid,
            i = this._actionsByClip[n];
          this._bindAction(t, i && i.knownActions[0]),
            this._addInactiveAction(t, n, e);
        }
        const e = t._propertyBindings;
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t];
          0 == n.useCount++ && (this._lendBinding(n), n.saveOriginalState());
        }
        this._lendAction(t);
      }
    },
    _deactivateAction: function (t) {
      if (this._isActiveAction(t)) {
        const e = t._propertyBindings;
        for (let t = 0, n = e.length; t !== n; ++t) {
          const n = e[t];
          0 == --n.useCount &&
            (n.restoreOriginalState(), this._takeBackBinding(n));
        }
        this._takeBackAction(t);
      }
    },
    _initMemoryManager: function () {
      (this._actions = []),
        (this._nActiveActions = 0),
        (this._actionsByClip = {}),
        (this._bindings = []),
        (this._nActiveBindings = 0),
        (this._bindingsByRootAndName = {}),
        (this._controlInterpolants = []),
        (this._nActiveControlInterpolants = 0);
      const t = this;
      this.stats = {
        actions: {
          get total() {
            return t._actions.length;
          },
          get inUse() {
            return t._nActiveActions;
          },
        },
        bindings: {
          get total() {
            return t._bindings.length;
          },
          get inUse() {
            return t._nActiveBindings;
          },
        },
        controlInterpolants: {
          get total() {
            return t._controlInterpolants.length;
          },
          get inUse() {
            return t._nActiveControlInterpolants;
          },
        },
      };
    },
    _isActiveAction: function (t) {
      const e = t._cacheIndex;
      return null !== e && e < this._nActiveActions;
    },
    _addInactiveAction: function (t, e, n) {
      const i = this._actions,
        r = this._actionsByClip;
      let o = r[e];
      if (void 0 === o)
        (o = { knownActions: [t], actionByRoot: {} }),
          (t._byClipCacheIndex = 0),
          (r[e] = o);
      else {
        const e = o.knownActions;
        (t._byClipCacheIndex = e.length), e.push(t);
      }
      (t._cacheIndex = i.length), i.push(t), (o.actionByRoot[n] = t);
    },
    _removeInactiveAction: function (t) {
      const e = this._actions,
        n = e[e.length - 1],
        i = t._cacheIndex;
      (n._cacheIndex = i), (e[i] = n), e.pop(), (t._cacheIndex = null);
      const r = t._clip.uuid,
        o = this._actionsByClip,
        s = o[r],
        a = s.knownActions,
        c = a[a.length - 1],
        l = t._byClipCacheIndex;
      (c._byClipCacheIndex = l),
        (a[l] = c),
        a.pop(),
        (t._byClipCacheIndex = null),
        delete s.actionByRoot[(t._localRoot || this._root).uuid],
        0 === a.length && delete o[r],
        this._removeInactiveBindingsForAction(t);
    },
    _removeInactiveBindingsForAction: function (t) {
      const e = t._propertyBindings;
      for (let t = 0, n = e.length; t !== n; ++t) {
        const n = e[t];
        0 == --n.referenceCount && this._removeInactiveBinding(n);
      }
    },
    _lendAction: function (t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = this._nActiveActions++,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    },
    _takeBackAction: function (t) {
      const e = this._actions,
        n = t._cacheIndex,
        i = --this._nActiveActions,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    },
    _addInactiveBinding: function (t, e, n) {
      const i = this._bindingsByRootAndName,
        r = this._bindings;
      let o = i[e];
      void 0 === o && ((o = {}), (i[e] = o)),
        (o[n] = t),
        (t._cacheIndex = r.length),
        r.push(t);
    },
    _removeInactiveBinding: function (t) {
      const e = this._bindings,
        n = t.binding,
        i = n.rootNode.uuid,
        r = n.path,
        o = this._bindingsByRootAndName,
        s = o[i],
        a = e[e.length - 1],
        c = t._cacheIndex;
      (a._cacheIndex = c),
        (e[c] = a),
        e.pop(),
        delete s[r],
        0 === Object.keys(s).length && delete o[i];
    },
    _lendBinding: function (t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = this._nActiveBindings++,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    },
    _takeBackBinding: function (t) {
      const e = this._bindings,
        n = t._cacheIndex,
        i = --this._nActiveBindings,
        r = e[i];
      (t._cacheIndex = i), (e[i] = t), (r._cacheIndex = n), (e[n] = r);
    },
    _lendControlInterpolant: function () {
      const t = this._controlInterpolants,
        e = this._nActiveControlInterpolants++;
      let n = t[e];
      return (
        void 0 === n &&
          ((n = new Bs(
            new Float32Array(2),
            new Float32Array(2),
            1,
            this._controlInterpolantsResultBuffer
          )),
          (n.__cacheIndex = e),
          (t[e] = n)),
        n
      );
    },
    _takeBackControlInterpolant: function (t) {
      const e = this._controlInterpolants,
        n = t.__cacheIndex,
        i = --this._nActiveControlInterpolants,
        r = e[i];
      (t.__cacheIndex = i), (e[i] = t), (r.__cacheIndex = n), (e[n] = r);
    },
    _controlInterpolantsResultBuffer: new Float32Array(1),
    clipAction: function (t, e, n) {
      const i = e || this._root,
        r = i.uuid;
      let o = "string" == typeof t ? Xs.findByName(i, t) : t;
      const s = null !== o ? o.uuid : t,
        a = this._actionsByClip[s];
      let c = null;
      if (
        (void 0 === n && (n = null !== o ? o.blendMode : 2500), void 0 !== a)
      ) {
        const t = a.actionByRoot[r];
        if (void 0 !== t && t.blendMode === n) return t;
        (c = a.knownActions[0]), null === o && (o = c._clip);
      }
      if (null === o) return null;
      const l = new vc(this, o, e, n);
      return this._bindAction(l, c), this._addInactiveAction(l, s, r), l;
    },
    existingAction: function (t, e) {
      const n = e || this._root,
        i = n.uuid,
        r = "string" == typeof t ? Xs.findByName(n, t) : t,
        o = r ? r.uuid : t,
        s = this._actionsByClip[o];
      return (void 0 !== s && s.actionByRoot[i]) || null;
    },
    stopAllAction: function () {
      const t = this._actions;
      for (let e = this._nActiveActions - 1; e >= 0; --e) t[e].stop();
      return this;
    },
    update: function (t) {
      t *= this.timeScale;
      const e = this._actions,
        n = this._nActiveActions,
        i = (this.time += t),
        r = Math.sign(t),
        o = (this._accuIndex ^= 1);
      for (let s = 0; s !== n; ++s) e[s]._update(i, t, r, o);
      const s = this._bindings,
        a = this._nActiveBindings;
      for (let t = 0; t !== a; ++t) s[t].apply(o);
      return this;
    },
    setTime: function (t) {
      this.time = 0;
      for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
      return this.update(t);
    },
    getRoot: function () {
      return this._root;
    },
    uncacheClip: function (t) {
      const e = this._actions,
        n = t.uuid,
        i = this._actionsByClip,
        r = i[n];
      if (void 0 !== r) {
        const t = r.knownActions;
        for (let n = 0, i = t.length; n !== i; ++n) {
          const i = t[n];
          this._deactivateAction(i);
          const r = i._cacheIndex,
            o = e[e.length - 1];
          (i._cacheIndex = null),
            (i._byClipCacheIndex = null),
            (o._cacheIndex = r),
            (e[r] = o),
            e.pop(),
            this._removeInactiveBindingsForAction(i);
        }
        delete i[n];
      }
    },
    uncacheRoot: function (t) {
      const e = t.uuid,
        n = this._actionsByClip;
      for (const t in n) {
        const i = n[t].actionByRoot[e];
        void 0 !== i &&
          (this._deactivateAction(i), this._removeInactiveAction(i));
      }
      const i = this._bindingsByRootAndName[e];
      if (void 0 !== i)
        for (const t in i) {
          const e = i[t];
          e.restoreOriginalState(), this._removeInactiveBinding(e);
        }
    },
    uncacheAction: function (t, e) {
      const n = this.existingAction(t, e);
      null !== n && (this._deactivateAction(n), this._removeInactiveAction(n));
    },
  });
  class _c {
    constructor(t) {
      "string" == typeof t &&
        (console.warn("THREE.Uniform: Type parameter is no longer needed."),
        (t = arguments[1])),
        (this.value = t);
    }
    clone() {
      return new _c(
        void 0 === this.value.clone ? this.value : this.value.clone()
      );
    }
  }
  function xc(t, e, n) {
    Rr.call(this, t, e), (this.meshPerAttribute = n || 1);
  }
  function bc(t, e, n, i, r) {
    (this.buffer = t),
      (this.type = e),
      (this.itemSize = n),
      (this.elementSize = i),
      (this.count = r),
      (this.version = 0);
  }
  function wc(t, e, n, i) {
    (this.ray = new mt(t, e)),
      (this.near = n || 0),
      (this.far = i || 1 / 0),
      (this.camera = null),
      (this.layers = new At()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }),
      Object.defineProperties(this.params, {
        PointCloud: {
          get: function () {
            return (
              console.warn(
                "THREE.Raycaster: params.PointCloud has been renamed to params.Points."
              ),
              this.Points
            );
          },
        },
      });
  }
  function Mc(t, e) {
    return t.distance - e.distance;
  }
  function Sc(t, e, n, i) {
    if ((t.layers.test(e.layers) && t.raycast(e, n), !0 === i)) {
      const i = t.children;
      for (let t = 0, r = i.length; t < r; t++) Sc(i[t], e, n, !0);
    }
  }
  (xc.prototype = Object.assign(Object.create(Rr.prototype), {
    constructor: xc,
    isInstancedInterleavedBuffer: !0,
    copy: function (t) {
      return (
        Rr.prototype.copy.call(this, t),
        (this.meshPerAttribute = t.meshPerAttribute),
        this
      );
    },
    clone: function (t) {
      const e = Rr.prototype.clone.call(this, t);
      return (e.meshPerAttribute = this.meshPerAttribute), e;
    },
    toJSON: function (t) {
      const e = Rr.prototype.toJSON.call(this, t);
      return (
        (e.isInstancedInterleavedBuffer = !0),
        (e.meshPerAttribute = this.meshPerAttribute),
        e
      );
    },
  })),
    Object.defineProperty(bc.prototype, "needsUpdate", {
      set: function (t) {
        !0 === t && this.version++;
      },
    }),
    Object.assign(bc.prototype, {
      isGLBufferAttribute: !0,
      setBuffer: function (t) {
        return (this.buffer = t), this;
      },
      setType: function (t, e) {
        return (this.type = t), (this.elementSize = e), this;
      },
      setItemSize: function (t) {
        return (this.itemSize = t), this;
      },
      setCount: function (t) {
        return (this.count = t), this;
      },
    }),
    Object.assign(wc.prototype, {
      set: function (t, e) {
        this.ray.set(t, e);
      },
      setFromCamera: function (t, e) {
        e && e.isPerspectiveCamera
          ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld),
            this.ray.direction
              .set(t.x, t.y, 0.5)
              .unproject(e)
              .sub(this.ray.origin)
              .normalize(),
            (this.camera = e))
          : e && e.isOrthographicCamera
          ? (this.ray.origin
              .set(t.x, t.y, (e.near + e.far) / (e.near - e.far))
              .unproject(e),
            this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld),
            (this.camera = e))
          : console.error(
              "THREE.Raycaster: Unsupported camera type: " + e.type
            );
      },
      intersectObject: function (t, e, n) {
        const i = n || [];
        return Sc(t, this, i, e), i.sort(Mc), i;
      },
      intersectObjects: function (t, e, n) {
        const i = n || [];
        if (!1 === Array.isArray(t))
          return (
            console.warn(
              "THREE.Raycaster.intersectObjects: objects is not an Array."
            ),
            i
          );
        for (let n = 0, r = t.length; n < r; n++) Sc(t[n], this, i, e);
        return i.sort(Mc), i;
      },
    });
  class Ec {
    constructor(t = 1, e = 0, n = 0) {
      return (this.radius = t), (this.phi = e), (this.theta = n), this;
    }
    set(t, e, n) {
      return (this.radius = t), (this.phi = e), (this.theta = n), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (
        (this.radius = t.radius),
        (this.phi = t.phi),
        (this.theta = t.theta),
        this
      );
    }
    makeSafe() {
      const t = 1e-6;
      return (this.phi = Math.max(t, Math.min(Math.PI - t, this.phi))), this;
    }
    setFromVector3(t) {
      return this.setFromCartesianCoords(t.x, t.y, t.z);
    }
    setFromCartesianCoords(t, e, n) {
      return (
        (this.radius = Math.sqrt(t * t + e * e + n * n)),
        0 === this.radius
          ? ((this.theta = 0), (this.phi = 0))
          : ((this.theta = Math.atan2(t, n)),
            (this.phi = Math.acos(R.clamp(e / this.radius, -1, 1)))),
        this
      );
    }
  }
  const Tc = new P(),
    Ac = new G(),
    Lc = new G();
  function Cc(t) {
    kt.call(this),
      (this.material = t),
      (this.render = function () {}),
      (this.hasPositions = !1),
      (this.hasNormals = !1),
      (this.hasColors = !1),
      (this.hasUvs = !1),
      (this.positionArray = null),
      (this.normalArray = null),
      (this.colorArray = null),
      (this.uvArray = null),
      (this.count = 0);
  }
  (Cc.prototype = Object.create(kt.prototype)),
    (Cc.prototype.constructor = Cc),
    (Cc.prototype.isImmediateRenderObject = !0);
  const Rc = new G(),
    Pc = new gt(),
    Oc = new gt();
  function Nc(t) {
    const e = [];
    t && t.isBone && e.push(t);
    for (let n = 0; n < t.children.length; n++)
      e.push.apply(e, Nc(t.children[n]));
    return e;
  }
  const Ic = new Float32Array(1),
    Dc =
      (new Int32Array(Ic.buffer),
      Math.pow(2, 8),
      [0.125, 0.215, 0.35, 0.446, 0.526, 0.582]),
    zc = 5 + Dc.length,
    { _lodPlanes: Bc, _sizeLods: Uc, _sigmas: Hc } = Fc();
  function Fc() {
    const t = [],
      e = [],
      n = [];
    let i = 8;
    for (let r = 0; r < zc; r++) {
      const o = Math.pow(2, i);
      e.push(o);
      let s = 1 / o;
      r > 4 ? (s = Dc[r - 8 + 4 - 1]) : 0 == r && (s = 0), n.push(s);
      const a = 1 / (o - 1),
        c = -a / 2,
        l = 1 + a / 2,
        h = [c, c, l, c, l, l, c, c, l, l, c, l],
        u = 6,
        d = 6,
        p = 3,
        f = 2,
        m = 1,
        g = new Float32Array(p * d * u),
        v = new Float32Array(f * d * u),
        y = new Float32Array(m * d * u);
      for (let t = 0; t < u; t++) {
        const e = ((t % 3) * 2) / 3 - 1,
          n = t > 2 ? 0 : -1,
          i = [
            e,
            n,
            0,
            e + 2 / 3,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n,
            0,
            e + 2 / 3,
            n + 1,
            0,
            e,
            n + 1,
            0,
          ];
        g.set(i, p * d * t), v.set(h, f * d * t);
        const r = [t, t, t, t, t, t];
        y.set(r, m * d * t);
      }
      const _ = new Ue();
      _.setAttribute("position", new ge(g, p)),
        _.setAttribute("uv", new ge(v, f)),
        _.setAttribute("faceIndex", new ge(y, m)),
        t.push(_),
        i > 4 && i--;
    }
    return { _lodPlanes: t, _sizeLods: e, _sigmas: n };
  }
  function kc(t) {
    console.warn(
      "THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."
    ),
      fa.call(this, t),
      (this.type = "catmullrom");
  }
  Math.sqrt(5),
    (sa.create = function (t, e) {
      return (
        console.log("THREE.Curve.create() has been deprecated"),
        (t.prototype = Object.create(sa.prototype)),
        (t.prototype.constructor = t),
        (t.prototype.getPoint = e),
        t
      );
    }),
    Object.assign(Ta.prototype, {
      createPointsGeometry: function (t) {
        console.warn(
          "THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead."
        );
        const e = this.getPoints(t);
        return this.createGeometry(e);
      },
      createSpacedPointsGeometry: function (t) {
        console.warn(
          "THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead."
        );
        const e = this.getSpacedPoints(t);
        return this.createGeometry(e);
      },
      createGeometry: function (t) {
        console.warn(
          "THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead."
        );
        const e = new Fo();
        for (let n = 0, i = t.length; n < i; n++) {
          const i = t[n];
          e.vertices.push(new G(i.x, i.y, i.z || 0));
        }
        return e;
      },
    }),
    Object.assign(Aa.prototype, {
      fromPoints: function (t) {
        return (
          console.warn(
            "THREE.Path: .fromPoints() has been renamed to .setFromPoints()."
          ),
          this.setFromPoints(t)
        );
      },
    }),
    Object.create(fa.prototype),
    Object.create(fa.prototype),
    (kc.prototype = Object.create(fa.prototype)),
    Object.assign(kc.prototype, {
      initFromArray: function () {
        console.error("THREE.Spline: .initFromArray() has been removed.");
      },
      getControlPointsArray: function () {
        console.error(
          "THREE.Spline: .getControlPointsArray() has been removed."
        );
      },
      reparametrizeByArcLength: function () {
        console.error(
          "THREE.Spline: .reparametrizeByArcLength() has been removed."
        );
      },
    }),
    (class extends Mo {
      constructor(t = 10, e = 10, n = 4473924, i = 8947848) {
        (n = new le(n)), (i = new le(i));
        const r = e / 2,
          o = t / e,
          s = t / 2,
          a = [],
          c = [];
        for (let t = 0, l = 0, h = -s; t <= e; t++, h += o) {
          a.push(-s, 0, h, s, 0, h), a.push(h, 0, -s, h, 0, s);
          const e = t === r ? n : i;
          e.toArray(c, l),
            (l += 3),
            e.toArray(c, l),
            (l += 3),
            e.toArray(c, l),
            (l += 3),
            e.toArray(c, l),
            (l += 3);
        }
        const l = new Ue();
        l.setAttribute("position", new Ee(a, 3)),
          l.setAttribute("color", new Ee(c, 3)),
          super(l, new fo({ vertexColors: !0, toneMapped: !1 })),
          (this.type = "GridHelper");
      }
    }.prototype.setColors = function () {
      console.error(
        "THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead."
      );
    }),
    (class extends Mo {
      constructor(t) {
        const e = Nc(t),
          n = new Ue(),
          i = [],
          r = [],
          o = new le(0, 0, 1),
          s = new le(0, 1, 0);
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          n.parent &&
            n.parent.isBone &&
            (i.push(0, 0, 0),
            i.push(0, 0, 0),
            r.push(o.r, o.g, o.b),
            r.push(s.r, s.g, s.b));
        }
        n.setAttribute("position", new Ee(i, 3)),
          n.setAttribute("color", new Ee(r, 3)),
          super(
            n,
            new fo({
              vertexColors: !0,
              depthTest: !1,
              depthWrite: !1,
              toneMapped: !1,
              transparent: !0,
            })
          ),
          (this.type = "SkeletonHelper"),
          (this.isSkeletonHelper = !0),
          (this.root = t),
          (this.bones = e),
          (this.matrix = t.matrixWorld),
          (this.matrixAutoUpdate = !1);
      }
      updateMatrixWorld(t) {
        const e = this.bones,
          n = this.geometry,
          i = n.getAttribute("position");
        Oc.copy(this.root.matrixWorld).invert();
        for (let t = 0, n = 0; t < e.length; t++) {
          const r = e[t];
          r.parent &&
            r.parent.isBone &&
            (Pc.multiplyMatrices(Oc, r.matrixWorld),
            Rc.setFromMatrixPosition(Pc),
            i.setXYZ(n, Rc.x, Rc.y, Rc.z),
            Pc.multiplyMatrices(Oc, r.parent.matrixWorld),
            Rc.setFromMatrixPosition(Pc),
            i.setXYZ(n + 1, Rc.x, Rc.y, Rc.z),
            (n += 2));
        }
        (n.getAttribute("position").needsUpdate = !0),
          super.updateMatrixWorld(t);
      }
    }.prototype.update = function () {
      console.error(
        "THREE.SkeletonHelper: update() no longer needs to be called."
      );
    }),
    Object.assign(Qs.prototype, {
      extractUrlBase: function (t) {
        return (
          console.warn(
            "THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."
          ),
          (function (t) {
            const e = t.lastIndexOf("/");
            return -1 === e ? "./" : t.substr(0, e + 1);
          })(t)
        );
      },
    }),
    (Qs.Handlers = {
      add: function () {
        console.error(
          "THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead."
        );
      },
      get: function () {
        console.error(
          "THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead."
        );
      },
    }),
    Object.assign(
      class {
        constructor(t, e) {
          Object.defineProperty(this, "isBox2", { value: !0 }),
            (this.min = void 0 !== t ? t : new P(1 / 0, 1 / 0)),
            (this.max = void 0 !== e ? e : new P(-1 / 0, -1 / 0));
        }
        set(t, e) {
          return this.min.copy(t), this.max.copy(e), this;
        }
        setFromPoints(t) {
          this.makeEmpty();
          for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
          return this;
        }
        setFromCenterAndSize(t, e) {
          const n = Tc.copy(e).multiplyScalar(0.5);
          return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          return this.min.copy(t.min), this.max.copy(t.max), this;
        }
        makeEmpty() {
          return (
            (this.min.x = this.min.y = 1 / 0),
            (this.max.x = this.max.y = -1 / 0),
            this
          );
        }
        isEmpty() {
          return this.max.x < this.min.x || this.max.y < this.min.y;
        }
        getCenter(t) {
          return (
            void 0 === t &&
              (console.warn("THREE.Box2: .getCenter() target is now required"),
              (t = new P())),
            this.isEmpty()
              ? t.set(0, 0)
              : t.addVectors(this.min, this.max).multiplyScalar(0.5)
          );
        }
        getSize(t) {
          return (
            void 0 === t &&
              (console.warn("THREE.Box2: .getSize() target is now required"),
              (t = new P())),
            this.isEmpty() ? t.set(0, 0) : t.subVectors(this.max, this.min)
          );
        }
        expandByPoint(t) {
          return this.min.min(t), this.max.max(t), this;
        }
        expandByVector(t) {
          return this.min.sub(t), this.max.add(t), this;
        }
        expandByScalar(t) {
          return this.min.addScalar(-t), this.max.addScalar(t), this;
        }
        containsPoint(t) {
          return !(
            t.x < this.min.x ||
            t.x > this.max.x ||
            t.y < this.min.y ||
            t.y > this.max.y
          );
        }
        containsBox(t) {
          return (
            this.min.x <= t.min.x &&
            t.max.x <= this.max.x &&
            this.min.y <= t.min.y &&
            t.max.y <= this.max.y
          );
        }
        getParameter(t, e) {
          return (
            void 0 === e &&
              (console.warn(
                "THREE.Box2: .getParameter() target is now required"
              ),
              (e = new P())),
            e.set(
              (t.x - this.min.x) / (this.max.x - this.min.x),
              (t.y - this.min.y) / (this.max.y - this.min.y)
            )
          );
        }
        intersectsBox(t) {
          return !(
            t.max.x < this.min.x ||
            t.min.x > this.max.x ||
            t.max.y < this.min.y ||
            t.min.y > this.max.y
          );
        }
        clampPoint(t, e) {
          return (
            void 0 === e &&
              (console.warn("THREE.Box2: .clampPoint() target is now required"),
              (e = new P())),
            e.copy(t).clamp(this.min, this.max)
          );
        }
        distanceToPoint(t) {
          return Tc.copy(t).clamp(this.min, this.max).sub(t).length();
        }
        intersect(t) {
          return this.min.max(t.min), this.max.min(t.max), this;
        }
        union(t) {
          return this.min.min(t.min), this.max.max(t.max), this;
        }
        translate(t) {
          return this.min.add(t), this.max.add(t), this;
        }
        equals(t) {
          return t.min.equals(this.min) && t.max.equals(this.max);
        }
      }.prototype,
      {
        center: function (t) {
          return (
            console.warn(
              "THREE.Box2: .center() has been renamed to .getCenter()."
            ),
            this.getCenter(t)
          );
        },
        empty: function () {
          return (
            console.warn(
              "THREE.Box2: .empty() has been renamed to .isEmpty()."
            ),
            this.isEmpty()
          );
        },
        isIntersectionBox: function (t) {
          return (
            console.warn(
              "THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."
            ),
            this.intersectsBox(t)
          );
        },
        size: function (t) {
          return (
            console.warn("THREE.Box2: .size() has been renamed to .getSize()."),
            this.getSize(t)
          );
        },
      }
    ),
    Object.assign(W.prototype, {
      center: function (t) {
        return (
          console.warn(
            "THREE.Box3: .center() has been renamed to .getCenter()."
          ),
          this.getCenter(t)
        );
      },
      empty: function () {
        return (
          console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),
          this.isEmpty()
        );
      },
      isIntersectionBox: function (t) {
        return (
          console.warn(
            "THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."
          ),
          this.intersectsBox(t)
        );
      },
      isIntersectionSphere: function (t) {
        return (
          console.warn(
            "THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."
          ),
          this.intersectsSphere(t)
        );
      },
      size: function (t) {
        return (
          console.warn("THREE.Box3: .size() has been renamed to .getSize()."),
          this.getSize(t)
        );
      },
    }),
    Object.assign(at.prototype, {
      empty: function () {
        return (
          console.warn(
            "THREE.Sphere: .empty() has been renamed to .isEmpty()."
          ),
          this.isEmpty()
        );
      },
    }),
    (xn.prototype.setFromMatrix = function (t) {
      return (
        console.warn(
          "THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."
        ),
        this.setFromProjectionMatrix(t)
      );
    }),
    (class {
      constructor(t, e) {
        (this.start = void 0 !== t ? t : new G()),
          (this.end = void 0 !== e ? e : new G());
      }
      set(t, e) {
        return this.start.copy(t), this.end.copy(e), this;
      }
      clone() {
        return new this.constructor().copy(this);
      }
      copy(t) {
        return this.start.copy(t.start), this.end.copy(t.end), this;
      }
      getCenter(t) {
        return (
          void 0 === t &&
            (console.warn("THREE.Line3: .getCenter() target is now required"),
            (t = new G())),
          t.addVectors(this.start, this.end).multiplyScalar(0.5)
        );
      }
      delta(t) {
        return (
          void 0 === t &&
            (console.warn("THREE.Line3: .delta() target is now required"),
            (t = new G())),
          t.subVectors(this.end, this.start)
        );
      }
      distanceSq() {
        return this.start.distanceToSquared(this.end);
      }
      distance() {
        return this.start.distanceTo(this.end);
      }
      at(t, e) {
        return (
          void 0 === e &&
            (console.warn("THREE.Line3: .at() target is now required"),
            (e = new G())),
          this.delta(e).multiplyScalar(t).add(this.start)
        );
      }
      closestPointToPointParameter(t, e) {
        Ac.subVectors(t, this.start), Lc.subVectors(this.end, this.start);
        const n = Lc.dot(Lc);
        let i = Lc.dot(Ac) / n;
        return e && (i = R.clamp(i, 0, 1)), i;
      }
      closestPointToPoint(t, e, n) {
        const i = this.closestPointToPointParameter(t, e);
        return (
          void 0 === n &&
            (console.warn(
              "THREE.Line3: .closestPointToPoint() target is now required"
            ),
            (n = new G())),
          this.delta(n).multiplyScalar(i).add(this.start)
        );
      }
      applyMatrix4(t) {
        return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this;
      }
      equals(t) {
        return t.start.equals(this.start) && t.end.equals(this.end);
      }
    }.prototype.center = function (t) {
      return (
        console.warn(
          "THREE.Line3: .center() has been renamed to .getCenter()."
        ),
        this.getCenter(t)
      );
    }),
    Object.assign(R, {
      random16: function () {
        return (
          console.warn(
            "THREE.Math: .random16() has been deprecated. Use Math.random() instead."
          ),
          Math.random()
        );
      },
      nearestPowerOfTwo: function (t) {
        return (
          console.warn(
            "THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."
          ),
          R.floorPowerOfTwo(t)
        );
      },
      nextPowerOfTwo: function (t) {
        return (
          console.warn(
            "THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."
          ),
          R.ceilPowerOfTwo(t)
        );
      },
    }),
    Object.assign(O.prototype, {
      flattenToArrayOffset: function (t, e) {
        return (
          console.warn(
            "THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
          ),
          this.toArray(t, e)
        );
      },
      multiplyVector3: function (t) {
        return (
          console.warn(
            "THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."
          ),
          t.applyMatrix3(this)
        );
      },
      multiplyVector3Array: function () {
        console.error(
          "THREE.Matrix3: .multiplyVector3Array() has been removed."
        );
      },
      applyToBufferAttribute: function (t) {
        return (
          console.warn(
            "THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."
          ),
          t.applyMatrix3(this)
        );
      },
      applyToVector3Array: function () {
        console.error(
          "THREE.Matrix3: .applyToVector3Array() has been removed."
        );
      },
      getInverse: function (t) {
        return (
          console.warn(
            "THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
          ),
          this.copy(t).invert()
        );
      },
    }),
    Object.assign(gt.prototype, {
      extractPosition: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."
          ),
          this.copyPosition(t)
        );
      },
      flattenToArrayOffset: function (t, e) {
        return (
          console.warn(
            "THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."
          ),
          this.toArray(t, e)
        );
      },
      getPosition: function () {
        return (
          console.warn(
            "THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."
          ),
          new G().setFromMatrixColumn(this, 3)
        );
      },
      setRotationFromQuaternion: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."
          ),
          this.makeRotationFromQuaternion(t)
        );
      },
      multiplyToArray: function () {
        console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
      },
      multiplyVector3: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."
          ),
          t.applyMatrix4(this)
        );
      },
      multiplyVector4: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."
          ),
          t.applyMatrix4(this)
        );
      },
      multiplyVector3Array: function () {
        console.error(
          "THREE.Matrix4: .multiplyVector3Array() has been removed."
        );
      },
      rotateAxis: function (t) {
        console.warn(
          "THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."
        ),
          t.transformDirection(this);
      },
      crossVector: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."
          ),
          t.applyMatrix4(this)
        );
      },
      translate: function () {
        console.error("THREE.Matrix4: .translate() has been removed.");
      },
      rotateX: function () {
        console.error("THREE.Matrix4: .rotateX() has been removed.");
      },
      rotateY: function () {
        console.error("THREE.Matrix4: .rotateY() has been removed.");
      },
      rotateZ: function () {
        console.error("THREE.Matrix4: .rotateZ() has been removed.");
      },
      rotateByAxis: function () {
        console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
      },
      applyToBufferAttribute: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."
          ),
          t.applyMatrix4(this)
        );
      },
      applyToVector3Array: function () {
        console.error(
          "THREE.Matrix4: .applyToVector3Array() has been removed."
        );
      },
      makeFrustum: function (t, e, n, i, r, o) {
        return (
          console.warn(
            "THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."
          ),
          this.makePerspective(t, e, i, n, r, o)
        );
      },
      getInverse: function (t) {
        return (
          console.warn(
            "THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."
          ),
          this.copy(t).invert()
        );
      },
    }),
    (Wt.prototype.isIntersectionLine = function (t) {
      return (
        console.warn(
          "THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."
        ),
        this.intersectsLine(t)
      );
    }),
    Object.assign(k.prototype, {
      multiplyVector3: function (t) {
        return (
          console.warn(
            "THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."
          ),
          t.applyQuaternion(this)
        );
      },
      inverse: function () {
        return (
          console.warn(
            "THREE.Quaternion: .inverse() has been renamed to invert()."
          ),
          this.invert()
        );
      },
    }),
    Object.assign(mt.prototype, {
      isIntersectionBox: function (t) {
        return (
          console.warn(
            "THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."
          ),
          this.intersectsBox(t)
        );
      },
      isIntersectionPlane: function (t) {
        return (
          console.warn(
            "THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."
          ),
          this.intersectsPlane(t)
        );
      },
      isIntersectionSphere: function (t) {
        return (
          console.warn(
            "THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."
          ),
          this.intersectsSphere(t)
        );
      },
    }),
    Object.assign(ne.prototype, {
      area: function () {
        return (
          console.warn(
            "THREE.Triangle: .area() has been renamed to .getArea()."
          ),
          this.getArea()
        );
      },
      barycoordFromPoint: function (t, e) {
        return (
          console.warn(
            "THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
          ),
          this.getBarycoord(t, e)
        );
      },
      midpoint: function (t) {
        return (
          console.warn(
            "THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."
          ),
          this.getMidpoint(t)
        );
      },
      normal: function (t) {
        return (
          console.warn(
            "THREE.Triangle: .normal() has been renamed to .getNormal()."
          ),
          this.getNormal(t)
        );
      },
      plane: function (t) {
        return (
          console.warn(
            "THREE.Triangle: .plane() has been renamed to .getPlane()."
          ),
          this.getPlane(t)
        );
      },
    }),
    Object.assign(ne, {
      barycoordFromPoint: function (t, e, n, i, r) {
        return (
          console.warn(
            "THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."
          ),
          ne.getBarycoord(t, e, n, i, r)
        );
      },
      normal: function (t, e, n, i) {
        return (
          console.warn(
            "THREE.Triangle: .normal() has been renamed to .getNormal()."
          ),
          ne.getNormal(t, e, n, i)
        );
      },
    }),
    Object.assign(La.prototype, {
      extractAllPoints: function (t) {
        return (
          console.warn(
            "THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."
          ),
          this.extractPoints(t)
        );
      },
      extrude: function (t) {
        return (
          console.warn(
            "THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."
          ),
          new gs(this, t)
        );
      },
      makeGeometry: function (t) {
        return (
          console.warn(
            "THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."
          ),
          new xs(this, t)
        );
      },
    }),
    Object.assign(P.prototype, {
      fromAttribute: function (t, e, n) {
        return (
          console.warn(
            "THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."
          ),
          this.fromBufferAttribute(t, e, n)
        );
      },
      distanceToManhattan: function (t) {
        return (
          console.warn(
            "THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
          ),
          this.manhattanDistanceTo(t)
        );
      },
      lengthManhattan: function () {
        return (
          console.warn(
            "THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."
          ),
          this.manhattanLength()
        );
      },
    }),
    Object.assign(G.prototype, {
      setEulerFromRotationMatrix: function () {
        console.error(
          "THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead."
        );
      },
      setEulerFromQuaternion: function () {
        console.error(
          "THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead."
        );
      },
      getPositionFromMatrix: function (t) {
        return (
          console.warn(
            "THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."
          ),
          this.setFromMatrixPosition(t)
        );
      },
      getScaleFromMatrix: function (t) {
        return (
          console.warn(
            "THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."
          ),
          this.setFromMatrixScale(t)
        );
      },
      getColumnFromMatrix: function (t, e) {
        return (
          console.warn(
            "THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."
          ),
          this.setFromMatrixColumn(e, t)
        );
      },
      applyProjection: function (t) {
        return (
          console.warn(
            "THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."
          ),
          this.applyMatrix4(t)
        );
      },
      fromAttribute: function (t, e, n) {
        return (
          console.warn(
            "THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."
          ),
          this.fromBufferAttribute(t, e, n)
        );
      },
      distanceToManhattan: function (t) {
        return (
          console.warn(
            "THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."
          ),
          this.manhattanDistanceTo(t)
        );
      },
      lengthManhattan: function () {
        return (
          console.warn(
            "THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."
          ),
          this.manhattanLength()
        );
      },
    }),
    Object.assign(U.prototype, {
      fromAttribute: function (t, e, n) {
        return (
          console.warn(
            "THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."
          ),
          this.fromBufferAttribute(t, e, n)
        );
      },
      lengthManhattan: function () {
        return (
          console.warn(
            "THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."
          ),
          this.manhattanLength()
        );
      },
    }),
    Object.assign(Fo.prototype, {
      computeTangents: function () {
        console.error("THREE.Geometry: .computeTangents() has been removed.");
      },
      computeLineDistances: function () {
        console.error(
          "THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead."
        );
      },
      applyMatrix: function (t) {
        return (
          console.warn(
            "THREE.Geometry: .applyMatrix() has been renamed to .applyMatrix4()."
          ),
          this.applyMatrix4(t)
        );
      },
    }),
    Object.assign(kt.prototype, {
      getChildByName: function (t) {
        return (
          console.warn(
            "THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."
          ),
          this.getObjectByName(t)
        );
      },
      renderDepth: function () {
        console.warn(
          "THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead."
        );
      },
      translate: function (t, e) {
        return (
          console.warn(
            "THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."
          ),
          this.translateOnAxis(e, t)
        );
      },
      getWorldRotation: function () {
        console.error(
          "THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead."
        );
      },
      applyMatrix: function (t) {
        return (
          console.warn(
            "THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."
          ),
          this.applyMatrix4(t)
        );
      },
    }),
    Object.defineProperties(kt.prototype, {
      eulerOrder: {
        get: function () {
          return (
            console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
            this.rotation.order
          );
        },
        set: function (t) {
          console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),
            (this.rotation.order = t);
        },
      },
      useQuaternion: {
        get: function () {
          console.warn(
            "THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
          );
        },
        set: function () {
          console.warn(
            "THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default."
          );
        },
      },
    }),
    Object.assign(nn.prototype, {
      setDrawMode: function () {
        console.error(
          "THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
        );
      },
    }),
    Object.defineProperties(nn.prototype, {
      drawMode: {
        get: function () {
          return (
            console.error(
              "THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."
            ),
            0
          );
        },
        set: function () {
          console.error(
            "THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary."
          );
        },
      },
    }),
    Object.defineProperties(Qr.prototype, {
      objects: {
        get: function () {
          return (
            console.warn("THREE.LOD: .objects has been renamed to .levels."),
            this.levels
          );
        },
      },
    }),
    Object.defineProperty(ao.prototype, "useVertexTexture", {
      get: function () {
        console.warn("THREE.Skeleton: useVertexTexture has been removed.");
      },
      set: function () {
        console.warn("THREE.Skeleton: useVertexTexture has been removed.");
      },
    }),
    (io.prototype.initBones = function () {
      console.error("THREE.SkinnedMesh: initBones() has been removed.");
    }),
    Object.defineProperty(sa.prototype, "__arcLengthDivisions", {
      get: function () {
        return (
          console.warn(
            "THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."
          ),
          this.arcLengthDivisions
        );
      },
      set: function (t) {
        console.warn(
          "THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."
        ),
          (this.arcLengthDivisions = t);
      },
    }),
    (dn.prototype.setLens = function (t, e) {
      console.warn(
        "THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."
      ),
        void 0 !== e && (this.filmGauge = e),
        this.setFocalLength(t);
    }),
    Object.defineProperties(Ca.prototype, {
      onlyShadow: {
        set: function () {
          console.warn("THREE.Light: .onlyShadow has been removed.");
        },
      },
      shadowCameraFov: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraFov is now .shadow.camera.fov."
          ),
            (this.shadow.camera.fov = t);
        },
      },
      shadowCameraLeft: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraLeft is now .shadow.camera.left."
          ),
            (this.shadow.camera.left = t);
        },
      },
      shadowCameraRight: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraRight is now .shadow.camera.right."
          ),
            (this.shadow.camera.right = t);
        },
      },
      shadowCameraTop: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraTop is now .shadow.camera.top."
          ),
            (this.shadow.camera.top = t);
        },
      },
      shadowCameraBottom: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."
          ),
            (this.shadow.camera.bottom = t);
        },
      },
      shadowCameraNear: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraNear is now .shadow.camera.near."
          ),
            (this.shadow.camera.near = t);
        },
      },
      shadowCameraFar: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowCameraFar is now .shadow.camera.far."
          ),
            (this.shadow.camera.far = t);
        },
      },
      shadowCameraVisible: {
        set: function () {
          console.warn(
            "THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead."
          );
        },
      },
      shadowBias: {
        set: function (t) {
          console.warn("THREE.Light: .shadowBias is now .shadow.bias."),
            (this.shadow.bias = t);
        },
      },
      shadowDarkness: {
        set: function () {
          console.warn("THREE.Light: .shadowDarkness has been removed.");
        },
      },
      shadowMapWidth: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."
          ),
            (this.shadow.mapSize.width = t);
        },
      },
      shadowMapHeight: {
        set: function (t) {
          console.warn(
            "THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."
          ),
            (this.shadow.mapSize.height = t);
        },
      },
    }),
    Object.defineProperties(ge.prototype, {
      length: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferAttribute: .length has been deprecated. Use .count instead."
            ),
            this.array.length
          );
        },
      },
      dynamic: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
            ),
            this.usage === E
          );
        },
        set: function () {
          console.warn(
            "THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."
          ),
            this.setUsage(E);
        },
      },
    }),
    Object.assign(ge.prototype, {
      setDynamic: function (t) {
        return (
          console.warn(
            "THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."
          ),
          this.setUsage(!0 === t ? E : S),
          this
        );
      },
      copyIndicesArray: function () {
        console.error(
          "THREE.BufferAttribute: .copyIndicesArray() has been removed."
        );
      },
      setArray: function () {
        console.error(
          "THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
        );
      },
    }),
    Object.assign(Ue.prototype, {
      addIndex: function (t) {
        console.warn(
          "THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."
        ),
          this.setIndex(t);
      },
      addAttribute: function (t, e) {
        return (
          console.warn(
            "THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."
          ),
          (e && e.isBufferAttribute) || (e && e.isInterleavedBufferAttribute)
            ? "index" === t
              ? (console.warn(
                  "THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."
                ),
                this.setIndex(e),
                this)
              : this.setAttribute(t, e)
            : (console.warn(
                "THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."
              ),
              this.setAttribute(t, new ge(arguments[1], arguments[2])))
        );
      },
      addDrawCall: function (t, e, n) {
        void 0 !== n &&
          console.warn(
            "THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."
          ),
          console.warn(
            "THREE.BufferGeometry: .addDrawCall() is now .addGroup()."
          ),
          this.addGroup(t, e);
      },
      clearDrawCalls: function () {
        console.warn(
          "THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."
        ),
          this.clearGroups();
      },
      computeTangents: function () {
        console.warn(
          "THREE.BufferGeometry: .computeTangents() has been removed."
        );
      },
      computeOffsets: function () {
        console.warn(
          "THREE.BufferGeometry: .computeOffsets() has been removed."
        );
      },
      removeAttribute: function (t) {
        return (
          console.warn(
            "THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."
          ),
          this.deleteAttribute(t)
        );
      },
      applyMatrix: function (t) {
        return (
          console.warn(
            "THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."
          ),
          this.applyMatrix4(t)
        );
      },
    }),
    Object.defineProperties(Ue.prototype, {
      drawcalls: {
        get: function () {
          return (
            console.error(
              "THREE.BufferGeometry: .drawcalls has been renamed to .groups."
            ),
            this.groups
          );
        },
      },
      offsets: {
        get: function () {
          return (
            console.warn(
              "THREE.BufferGeometry: .offsets has been renamed to .groups."
            ),
            this.groups
          );
        },
      },
    }),
    Object.defineProperties(ja.prototype, {
      maxInstancedCount: {
        get: function () {
          return (
            console.warn(
              "THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."
            ),
            this.instanceCount
          );
        },
        set: function (t) {
          console.warn(
            "THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount."
          ),
            (this.instanceCount = t);
        },
      },
    }),
    Object.defineProperties(wc.prototype, {
      linePrecision: {
        get: function () {
          return (
            console.warn(
              "THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."
            ),
            this.params.Line.threshold
          );
        },
        set: function (t) {
          console.warn(
            "THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead."
          ),
            (this.params.Line.threshold = t);
        },
      },
    }),
    Object.defineProperties(Rr.prototype, {
      dynamic: {
        get: function () {
          return (
            console.warn(
              "THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."
            ),
            this.usage === E
          );
        },
        set: function (t) {
          console.warn(
            "THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead."
          ),
            this.setUsage(t);
        },
      },
    }),
    Object.assign(Rr.prototype, {
      setDynamic: function (t) {
        return (
          console.warn(
            "THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."
          ),
          this.setUsage(!0 === t ? E : S),
          this
        );
      },
      setArray: function () {
        console.error(
          "THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers"
        );
      },
    }),
    Object.assign(fs.prototype, {
      getArrays: function () {
        console.error(
          "THREE.ExtrudeBufferGeometry: .getArrays() has been removed."
        );
      },
      addShapeList: function () {
        console.error(
          "THREE.ExtrudeBufferGeometry: .addShapeList() has been removed."
        );
      },
      addShape: function () {
        console.error(
          "THREE.ExtrudeBufferGeometry: .addShape() has been removed."
        );
      },
    }),
    Object.assign(Cr.prototype, {
      dispose: function () {
        console.error("THREE.Scene: .dispose() has been removed.");
      },
    }),
    Object.defineProperties(_c.prototype, {
      dynamic: {
        set: function () {
          console.warn(
            "THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead."
          );
        },
      },
      onUpdate: {
        value: function () {
          return (
            console.warn(
              "THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."
            ),
            this
          );
        },
      },
    }),
    Object.defineProperties(de.prototype, {
      wrapAround: {
        get: function () {
          console.warn("THREE.Material: .wrapAround has been removed.");
        },
        set: function () {
          console.warn("THREE.Material: .wrapAround has been removed.");
        },
      },
      overdraw: {
        get: function () {
          console.warn("THREE.Material: .overdraw has been removed.");
        },
        set: function () {
          console.warn("THREE.Material: .overdraw has been removed.");
        },
      },
      wrapRGB: {
        get: function () {
          return (
            console.warn("THREE.Material: .wrapRGB has been removed."), new le()
          );
        },
      },
      shading: {
        get: function () {
          console.error(
            "THREE." +
              this.type +
              ": .shading has been removed. Use the boolean .flatShading instead."
          );
        },
        set: function (t) {
          console.warn(
            "THREE." +
              this.type +
              ": .shading has been removed. Use the boolean .flatShading instead."
          ),
            (this.flatShading = 1 === t);
        },
      },
      stencilMask: {
        get: function () {
          return (
            console.warn(
              "THREE." +
                this.type +
                ": .stencilMask has been removed. Use .stencilFuncMask instead."
            ),
            this.stencilFuncMask
          );
        },
        set: function (t) {
          console.warn(
            "THREE." +
              this.type +
              ": .stencilMask has been removed. Use .stencilFuncMask instead."
          ),
            (this.stencilFuncMask = t);
        },
      },
    }),
    Object.defineProperties(As.prototype, {
      metal: {
        get: function () {
          return (
            console.warn(
              "THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."
            ),
            !1
          );
        },
        set: function () {
          console.warn(
            "THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead"
          );
        },
      },
    }),
    Object.defineProperties(Ts.prototype, {
      transparency: {
        get: function () {
          return (
            console.warn(
              "THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."
            ),
            this.transmission
          );
        },
        set: function (t) {
          console.warn(
            "THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission."
          ),
            (this.transmission = t);
        },
      },
    }),
    Object.defineProperties(hn.prototype, {
      derivatives: {
        get: function () {
          return (
            console.warn(
              "THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
            ),
            this.extensions.derivatives
          );
        },
        set: function (t) {
          console.warn(
            "THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."
          ),
            (this.extensions.derivatives = t);
        },
      },
    }),
    Object.assign(Ar.prototype, {
      clearTarget: function (t, e, n, i) {
        console.warn(
          "THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."
        ),
          this.setRenderTarget(t),
          this.clear(e, n, i);
      },
      animate: function (t) {
        console.warn(
          "THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."
        ),
          this.setAnimationLoop(t);
      },
      getCurrentRenderTarget: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."
          ),
          this.getRenderTarget()
        );
      },
      getMaxAnisotropy: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."
          ),
          this.capabilities.getMaxAnisotropy()
        );
      },
      getPrecision: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."
          ),
          this.capabilities.precision
        );
      },
      resetGLState: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .resetGLState() is now .state.reset()."
          ),
          this.state.reset()
        );
      },
      supportsFloatTextures: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."
          ),
          this.extensions.get("OES_texture_float")
        );
      },
      supportsHalfFloatTextures: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."
          ),
          this.extensions.get("OES_texture_half_float")
        );
      },
      supportsStandardDerivatives: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."
          ),
          this.extensions.get("OES_standard_derivatives")
        );
      },
      supportsCompressedTextureS3TC: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."
          ),
          this.extensions.get("WEBGL_compressed_texture_s3tc")
        );
      },
      supportsCompressedTexturePVRTC: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."
          ),
          this.extensions.get("WEBGL_compressed_texture_pvrtc")
        );
      },
      supportsBlendMinMax: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."
          ),
          this.extensions.get("EXT_blend_minmax")
        );
      },
      supportsVertexTextures: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."
          ),
          this.capabilities.vertexTextures
        );
      },
      supportsInstancedArrays: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."
          ),
          this.extensions.get("ANGLE_instanced_arrays")
        );
      },
      enableScissorTest: function (t) {
        console.warn(
          "THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."
        ),
          this.setScissorTest(t);
      },
      initMaterial: function () {
        console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
      },
      addPrePlugin: function () {
        console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
      },
      addPostPlugin: function () {
        console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
      },
      updateShadowMap: function () {
        console.warn(
          "THREE.WebGLRenderer: .updateShadowMap() has been removed."
        );
      },
      setFaceCulling: function () {
        console.warn(
          "THREE.WebGLRenderer: .setFaceCulling() has been removed."
        );
      },
      allocTextureUnit: function () {
        console.warn(
          "THREE.WebGLRenderer: .allocTextureUnit() has been removed."
        );
      },
      setTexture: function () {
        console.warn("THREE.WebGLRenderer: .setTexture() has been removed.");
      },
      setTexture2D: function () {
        console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.");
      },
      setTextureCube: function () {
        console.warn(
          "THREE.WebGLRenderer: .setTextureCube() has been removed."
        );
      },
      getActiveMipMapLevel: function () {
        return (
          console.warn(
            "THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."
          ),
          this.getActiveMipmapLevel()
        );
      },
    }),
    Object.defineProperties(Ar.prototype, {
      shadowMapEnabled: {
        get: function () {
          return this.shadowMap.enabled;
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."
          ),
            (this.shadowMap.enabled = t);
        },
      },
      shadowMapType: {
        get: function () {
          return this.shadowMap.type;
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."
          ),
            (this.shadowMap.type = t);
        },
      },
      shadowMapCullFace: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead."
          );
        },
      },
      context: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."
            ),
            this.getContext()
          );
        },
      },
      vr: {
        get: function () {
          return (
            console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),
            this.xr
          );
        },
      },
      gammaInput: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
            ),
            !1
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."
          );
        },
      },
      gammaOutput: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
            ),
            !1
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."
          ),
            (this.outputEncoding = !0 === t ? 3001 : w);
        },
      },
      toneMappingWhitePoint: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
            ),
            1
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."
          );
        },
      },
    }),
    Object.defineProperties(yr.prototype, {
      cullFace: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead."
          );
        },
      },
      renderReverseSided: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead."
          );
        },
      },
      renderSingleSided: {
        get: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
          );
        },
        set: function () {
          console.warn(
            "THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead."
          );
        },
      },
    }),
    Object.defineProperties(H.prototype, {
      wrapS: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."
            ),
            this.texture.wrapS
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."
          ),
            (this.texture.wrapS = t);
        },
      },
      wrapT: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."
            ),
            this.texture.wrapT
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."
          ),
            (this.texture.wrapT = t);
        },
      },
      magFilter: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
            ),
            this.texture.magFilter
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."
          ),
            (this.texture.magFilter = t);
        },
      },
      minFilter: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
            ),
            this.texture.minFilter
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."
          ),
            (this.texture.minFilter = t);
        },
      },
      anisotropy: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
            ),
            this.texture.anisotropy
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."
          ),
            (this.texture.anisotropy = t);
        },
      },
      offset: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .offset is now .texture.offset."
            ),
            this.texture.offset
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .offset is now .texture.offset."
          ),
            (this.texture.offset = t);
        },
      },
      repeat: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .repeat is now .texture.repeat."
            ),
            this.texture.repeat
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .repeat is now .texture.repeat."
          ),
            (this.texture.repeat = t);
        },
      },
      format: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .format is now .texture.format."
            ),
            this.texture.format
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .format is now .texture.format."
          ),
            (this.texture.format = t);
        },
      },
      type: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .type is now .texture.type."
            ),
            this.texture.type
          );
        },
        set: function (t) {
          console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),
            (this.texture.type = t);
        },
      },
      generateMipmaps: {
        get: function () {
          return (
            console.warn(
              "THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
            ),
            this.texture.generateMipmaps
          );
        },
        set: function (t) {
          console.warn(
            "THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."
          ),
            (this.texture.generateMipmaps = t);
        },
      },
    }),
    Object.defineProperties(
      class extends kt {
        constructor(t) {
          super(),
            (this.type = "Audio"),
            (this.listener = t),
            (this.context = t.context),
            (this.gain = this.context.createGain()),
            this.gain.connect(t.getInput()),
            (this.autoplay = !1),
            (this.buffer = null),
            (this.detune = 0),
            (this.loop = !1),
            (this.loopStart = 0),
            (this.loopEnd = 0),
            (this.offset = 0),
            (this.duration = void 0),
            (this.playbackRate = 1),
            (this.isPlaying = !1),
            (this.hasPlaybackControl = !0),
            (this.source = null),
            (this.sourceType = "empty"),
            (this._startedAt = 0),
            (this._progress = 0),
            (this._connected = !1),
            (this.filters = []);
        }
        getOutput() {
          return this.gain;
        }
        setNodeSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "audioNode"),
            (this.source = t),
            this.connect(),
            this
          );
        }
        setMediaElementSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "mediaNode"),
            (this.source = this.context.createMediaElementSource(t)),
            this.connect(),
            this
          );
        }
        setMediaStreamSource(t) {
          return (
            (this.hasPlaybackControl = !1),
            (this.sourceType = "mediaStreamNode"),
            (this.source = this.context.createMediaStreamSource(t)),
            this.connect(),
            this
          );
        }
        setBuffer(t) {
          return (
            (this.buffer = t),
            (this.sourceType = "buffer"),
            this.autoplay && this.play(),
            this
          );
        }
        play(t = 0) {
          if (!0 === this.isPlaying)
            return void console.warn("THREE.Audio: Audio is already playing.");
          if (!1 === this.hasPlaybackControl)
            return void console.warn(
              "THREE.Audio: this Audio has no playback control."
            );
          this._startedAt = this.context.currentTime + t;
          const e = this.context.createBufferSource();
          return (
            (e.buffer = this.buffer),
            (e.loop = this.loop),
            (e.loopStart = this.loopStart),
            (e.loopEnd = this.loopEnd),
            (e.onended = this.onEnded.bind(this)),
            e.start(
              this._startedAt,
              this._progress + this.offset,
              this.duration
            ),
            (this.isPlaying = !0),
            (this.source = e),
            this.setDetune(this.detune),
            this.setPlaybackRate(this.playbackRate),
            this.connect()
          );
        }
        pause() {
          if (!1 !== this.hasPlaybackControl)
            return (
              !0 === this.isPlaying &&
                ((this._progress +=
                  Math.max(this.context.currentTime - this._startedAt, 0) *
                  this.playbackRate),
                !0 === this.loop &&
                  (this._progress =
                    this._progress % (this.duration || this.buffer.duration)),
                this.source.stop(),
                (this.source.onended = null),
                (this.isPlaying = !1)),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        stop() {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this._progress = 0),
              this.source.stop(),
              (this.source.onended = null),
              (this.isPlaying = !1),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        connect() {
          if (this.filters.length > 0) {
            this.source.connect(this.filters[0]);
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].connect(this.filters[t]);
            this.filters[this.filters.length - 1].connect(this.getOutput());
          } else this.source.connect(this.getOutput());
          return (this._connected = !0), this;
        }
        disconnect() {
          if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0]);
            for (let t = 1, e = this.filters.length; t < e; t++)
              this.filters[t - 1].disconnect(this.filters[t]);
            this.filters[this.filters.length - 1].disconnect(this.getOutput());
          } else this.source.disconnect(this.getOutput());
          return (this._connected = !1), this;
        }
        getFilters() {
          return this.filters;
        }
        setFilters(t) {
          return (
            t || (t = []),
            !0 === this._connected
              ? (this.disconnect(), (this.filters = t.slice()), this.connect())
              : (this.filters = t.slice()),
            this
          );
        }
        setDetune(t) {
          if (((this.detune = t), void 0 !== this.source.detune))
            return (
              !0 === this.isPlaying &&
                this.source.detune.setTargetAtTime(
                  this.detune,
                  this.context.currentTime,
                  0.01
                ),
              this
            );
        }
        getDetune() {
          return this.detune;
        }
        getFilter() {
          return this.getFilters()[0];
        }
        setFilter(t) {
          return this.setFilters(t ? [t] : []);
        }
        setPlaybackRate(t) {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this.playbackRate = t),
              !0 === this.isPlaying &&
                this.source.playbackRate.setTargetAtTime(
                  this.playbackRate,
                  this.context.currentTime,
                  0.01
                ),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        getPlaybackRate() {
          return this.playbackRate;
        }
        onEnded() {
          this.isPlaying = !1;
        }
        getLoop() {
          return !1 === this.hasPlaybackControl
            ? (console.warn("THREE.Audio: this Audio has no playback control."),
              !1)
            : this.loop;
        }
        setLoop(t) {
          if (!1 !== this.hasPlaybackControl)
            return (
              (this.loop = t),
              !0 === this.isPlaying && (this.source.loop = this.loop),
              this
            );
          console.warn("THREE.Audio: this Audio has no playback control.");
        }
        setLoopStart(t) {
          return (this.loopStart = t), this;
        }
        setLoopEnd(t) {
          return (this.loopEnd = t), this;
        }
        getVolume() {
          return this.gain.gain.value;
        }
        setVolume(t) {
          return (
            this.gain.gain.setTargetAtTime(t, this.context.currentTime, 0.01),
            this
          );
        }
      }.prototype,
      {
        load: {
          value: function (t) {
            console.warn(
              "THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead."
            );
            const e = this;
            return (
              new $a().load(t, function (t) {
                e.setBuffer(t);
              }),
              this
            );
          },
        },
        startTime: {
          set: function () {
            console.warn("THREE.Audio: .startTime is now .play( delay ).");
          },
        },
      }
    ),
    (class {
      constructor(t, e = 2048) {
        (this.analyser = t.context.createAnalyser()),
          (this.analyser.fftSize = e),
          (this.data = new Uint8Array(this.analyser.frequencyBinCount)),
          t.getOutput().connect(this.analyser);
      }
      getFrequencyData() {
        return this.analyser.getByteFrequencyData(this.data), this.data;
      }
      getAverageFrequency() {
        let t = 0;
        const e = this.getFrequencyData();
        for (let n = 0; n < e.length; n++) t += e[n];
        return t / e.length;
      }
    }.prototype.getData = function () {
      return (
        console.warn(
          "THREE.AudioAnalyser: .getData() is now .getFrequencyData()."
        ),
        this.getFrequencyData()
      );
    }),
    (fn.prototype.updateCubeMap = function (t, e) {
      return (
        console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),
        this.update(t, e)
      );
    }),
    (fn.prototype.clear = function (t, e, n, i) {
      return (
        console.warn(
          "THREE.CubeCamera: .clear() is now .renderTarget.clear()."
        ),
        this.renderTarget.clear(t, e, n, i)
      );
    }),
    (I.crossOrigin = void 0),
    (I.loadTexture = function (t, e, n, i) {
      console.warn(
        "THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead."
      );
      const r = new oa();
      r.setCrossOrigin(this.crossOrigin);
      const o = r.load(t, n, void 0, i);
      return e && (o.mapping = e), o;
    }),
    (I.loadTextureCube = function (t, e, n, i) {
      console.warn(
        "THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead."
      );
      const r = new ia();
      r.setCrossOrigin(this.crossOrigin);
      const o = r.load(t, n, void 0, i);
      return e && (o.mapping = e), o;
    }),
    (I.loadCompressedTexture = function () {
      console.error(
        "THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead."
      );
    }),
    (I.loadCompressedTextureCube = function () {
      console.error(
        "THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead."
      );
    }),
    "undefined" != typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("register", { detail: { revision: "124" } })
      );
  var Gc = function (t, e) {
    var n, i, r, o, s, a;
    void 0 === e &&
      console.warn(
        'THREE.OrbitControls: The second parameter "domElement" is now mandatory.'
      ),
      e === document &&
        console.error(
          'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
        ),
      (this.object = t),
      (this.domElement = e),
      (this.enabled = !0),
      (this.target = new G()),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.minZoom = 0),
      (this.maxZoom = 1 / 0),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -1 / 0),
      (this.maxAzimuthAngle = 1 / 0),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.enableKeys = !0),
      (this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
      (this.mouseButtons = { LEFT: 0, MIDDLE: 1, RIGHT: 2 }),
      (this.touches = { ONE: 0, TWO: 2 }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this.getPolarAngle = function () {
        return m.phi;
      }),
      (this.getAzimuthalAngle = function () {
        return m.theta;
      }),
      (this.saveState = function () {
        c.target0.copy(c.target),
          c.position0.copy(c.object.position),
          (c.zoom0 = c.object.zoom);
      }),
      (this.reset = function () {
        c.target.copy(c.target0),
          c.object.position.copy(c.position0),
          (c.object.zoom = c.zoom0),
          c.object.updateProjectionMatrix(),
          c.dispatchEvent(l),
          c.update(),
          (p = d.NONE);
      }),
      (this.update =
        ((n = new G()),
        (i = new k().setFromUnitVectors(t.up, new G(0, 1, 0))),
        (r = i.clone().invert()),
        (o = new G()),
        (s = new k()),
        (a = 2 * Math.PI),
        function () {
          var t = c.object.position;
          n.copy(t).sub(c.target),
            n.applyQuaternion(i),
            m.setFromVector3(n),
            c.autoRotate &&
              p === d.NONE &&
              R(((2 * Math.PI) / 60 / 60) * c.autoRotateSpeed),
            c.enableDamping
              ? ((m.theta += g.theta * c.dampingFactor),
                (m.phi += g.phi * c.dampingFactor))
              : ((m.theta += g.theta), (m.phi += g.phi));
          var e = c.minAzimuthAngle,
            h = c.maxAzimuthAngle;
          return (
            isFinite(e) &&
              isFinite(h) &&
              (e < -Math.PI ? (e += a) : e > Math.PI && (e -= a),
              h < -Math.PI ? (h += a) : h > Math.PI && (h -= a),
              (m.theta =
                e <= h
                  ? Math.max(e, Math.min(h, m.theta))
                  : m.theta > (e + h) / 2
                  ? Math.max(e, m.theta)
                  : Math.min(h, m.theta))),
            (m.phi = Math.max(
              c.minPolarAngle,
              Math.min(c.maxPolarAngle, m.phi)
            )),
            m.makeSafe(),
            (m.radius *= v),
            (m.radius = Math.max(
              c.minDistance,
              Math.min(c.maxDistance, m.radius)
            )),
            !0 === c.enableDamping
              ? c.target.addScaledVector(y, c.dampingFactor)
              : c.target.add(y),
            n.setFromSpherical(m),
            n.applyQuaternion(r),
            t.copy(c.target).add(n),
            c.object.lookAt(c.target),
            !0 === c.enableDamping
              ? ((g.theta *= 1 - c.dampingFactor),
                (g.phi *= 1 - c.dampingFactor),
                y.multiplyScalar(1 - c.dampingFactor))
              : (g.set(0, 0, 0), y.set(0, 0, 0)),
            (v = 1),
            !!(
              _ ||
              o.distanceToSquared(c.object.position) > f ||
              8 * (1 - s.dot(c.object.quaternion)) > f
            ) &&
              (c.dispatchEvent(l),
              o.copy(c.object.position),
              s.copy(c.object.quaternion),
              (_ = !1),
              !0)
          );
        })),
      (this.dispose = function () {
        c.domElement.removeEventListener("contextmenu", it, !1),
          c.domElement.removeEventListener("pointerdown", Z, !1),
          c.domElement.removeEventListener("wheel", K, !1),
          c.domElement.removeEventListener("touchstart", tt, !1),
          c.domElement.removeEventListener("touchend", nt, !1),
          c.domElement.removeEventListener("touchmove", et, !1),
          c.domElement.ownerDocument.removeEventListener("pointermove", J, !1),
          c.domElement.ownerDocument.removeEventListener("pointerup", Q, !1),
          c.domElement.removeEventListener("keydown", $, !1);
      });
    var c = this,
      l = { type: "change" },
      h = { type: "start" },
      u = { type: "end" },
      d = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      },
      p = d.NONE,
      f = 1e-6,
      m = new Ec(),
      g = new Ec(),
      v = 1,
      y = new G(),
      _ = !1,
      x = new P(),
      b = new P(),
      w = new P(),
      M = new P(),
      S = new P(),
      E = new P(),
      T = new P(),
      A = new P(),
      L = new P();
    function C() {
      return Math.pow(0.95, c.zoomSpeed);
    }
    function R(t) {
      g.theta -= t;
    }
    function O(t) {
      g.phi -= t;
    }
    var N,
      I =
        ((N = new G()),
        function (t, e) {
          N.setFromMatrixColumn(e, 0), N.multiplyScalar(-t), y.add(N);
        }),
      D = (function () {
        var t = new G();
        return function (e, n) {
          !0 === c.screenSpacePanning
            ? t.setFromMatrixColumn(n, 1)
            : (t.setFromMatrixColumn(n, 0), t.crossVectors(c.object.up, t)),
            t.multiplyScalar(e),
            y.add(t);
        };
      })(),
      z = (function () {
        var t = new G();
        return function (e, n) {
          var i = c.domElement;
          if (c.object.isPerspectiveCamera) {
            var r = c.object.position;
            t.copy(r).sub(c.target);
            var o = t.length();
            (o *= Math.tan(((c.object.fov / 2) * Math.PI) / 180)),
              I((2 * e * o) / i.clientHeight, c.object.matrix),
              D((2 * n * o) / i.clientHeight, c.object.matrix);
          } else
            c.object.isOrthographicCamera
              ? (I(
                  (e * (c.object.right - c.object.left)) /
                    c.object.zoom /
                    i.clientWidth,
                  c.object.matrix
                ),
                D(
                  (n * (c.object.top - c.object.bottom)) /
                    c.object.zoom /
                    i.clientHeight,
                  c.object.matrix
                ))
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
                ),
                (c.enablePan = !1));
        };
      })();
    function B(t) {
      c.object.isPerspectiveCamera
        ? (v /= t)
        : c.object.isOrthographicCamera
        ? ((c.object.zoom = Math.max(
            c.minZoom,
            Math.min(c.maxZoom, c.object.zoom * t)
          )),
          c.object.updateProjectionMatrix(),
          (_ = !0))
        : (console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
          ),
          (c.enableZoom = !1));
    }
    function U(t) {
      c.object.isPerspectiveCamera
        ? (v *= t)
        : c.object.isOrthographicCamera
        ? ((c.object.zoom = Math.max(
            c.minZoom,
            Math.min(c.maxZoom, c.object.zoom / t)
          )),
          c.object.updateProjectionMatrix(),
          (_ = !0))
        : (console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
          ),
          (c.enableZoom = !1));
    }
    function H(t) {
      x.set(t.clientX, t.clientY);
    }
    function F(t) {
      M.set(t.clientX, t.clientY);
    }
    function V(t) {
      if (1 == t.touches.length) x.set(t.touches[0].pageX, t.touches[0].pageY);
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY);
        x.set(e, n);
      }
    }
    function j(t) {
      if (1 == t.touches.length) M.set(t.touches[0].pageX, t.touches[0].pageY);
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY);
        M.set(e, n);
      }
    }
    function W(t) {
      var e = t.touches[0].pageX - t.touches[1].pageX,
        n = t.touches[0].pageY - t.touches[1].pageY,
        i = Math.sqrt(e * e + n * n);
      T.set(0, i);
    }
    function q(t) {
      if (1 == t.touches.length) b.set(t.touches[0].pageX, t.touches[0].pageY);
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY);
        b.set(e, n);
      }
      w.subVectors(b, x).multiplyScalar(c.rotateSpeed);
      var i = c.domElement;
      R((2 * Math.PI * w.x) / i.clientHeight),
        O((2 * Math.PI * w.y) / i.clientHeight),
        x.copy(b);
    }
    function X(t) {
      if (1 == t.touches.length) S.set(t.touches[0].pageX, t.touches[0].pageY);
      else {
        var e = 0.5 * (t.touches[0].pageX + t.touches[1].pageX),
          n = 0.5 * (t.touches[0].pageY + t.touches[1].pageY);
        S.set(e, n);
      }
      E.subVectors(S, M).multiplyScalar(c.panSpeed), z(E.x, E.y), M.copy(S);
    }
    function Y(t) {
      var e = t.touches[0].pageX - t.touches[1].pageX,
        n = t.touches[0].pageY - t.touches[1].pageY,
        i = Math.sqrt(e * e + n * n);
      A.set(0, i),
        L.set(0, Math.pow(A.y / T.y, c.zoomSpeed)),
        B(L.y),
        T.copy(A);
    }
    function Z(t) {
      if (!1 !== c.enabled)
        switch (t.pointerType) {
          case "mouse":
          case "pen":
            !(function (t) {
              var e;
              switch (
                (t.preventDefault(),
                c.domElement.focus ? c.domElement.focus() : window.focus(),
                t.button)
              ) {
                case 0:
                  e = c.mouseButtons.LEFT;
                  break;
                case 1:
                  e = c.mouseButtons.MIDDLE;
                  break;
                case 2:
                  e = c.mouseButtons.RIGHT;
                  break;
                default:
                  e = -1;
              }
              switch (e) {
                case 1:
                  if (!1 === c.enableZoom) return;
                  !(function (t) {
                    T.set(t.clientX, t.clientY);
                  })(t),
                    (p = d.DOLLY);
                  break;
                case 0:
                  if (t.ctrlKey || t.metaKey || t.shiftKey) {
                    if (!1 === c.enablePan) return;
                    F(t), (p = d.PAN);
                  } else {
                    if (!1 === c.enableRotate) return;
                    H(t), (p = d.ROTATE);
                  }
                  break;
                case 2:
                  if (t.ctrlKey || t.metaKey || t.shiftKey) {
                    if (!1 === c.enableRotate) return;
                    H(t), (p = d.ROTATE);
                  } else {
                    if (!1 === c.enablePan) return;
                    F(t), (p = d.PAN);
                  }
                  break;
                default:
                  p = d.NONE;
              }
              p !== d.NONE &&
                (c.domElement.ownerDocument.addEventListener(
                  "pointermove",
                  J,
                  !1
                ),
                c.domElement.ownerDocument.addEventListener("pointerup", Q, !1),
                c.dispatchEvent(h));
            })(t);
        }
    }
    function J(t) {
      if (!1 !== c.enabled)
        switch (t.pointerType) {
          case "mouse":
          case "pen":
            !(function (t) {
              if (!1 !== c.enabled)
                switch ((t.preventDefault(), p)) {
                  case d.ROTATE:
                    if (!1 === c.enableRotate) return;
                    !(function (t) {
                      b.set(t.clientX, t.clientY),
                        w.subVectors(b, x).multiplyScalar(c.rotateSpeed);
                      var e = c.domElement;
                      R((2 * Math.PI * w.x) / e.clientHeight),
                        O((2 * Math.PI * w.y) / e.clientHeight),
                        x.copy(b),
                        c.update();
                    })(t);
                    break;
                  case d.DOLLY:
                    if (!1 === c.enableZoom) return;
                    !(function (t) {
                      A.set(t.clientX, t.clientY),
                        L.subVectors(A, T),
                        L.y > 0 ? B(C()) : L.y < 0 && U(C()),
                        T.copy(A),
                        c.update();
                    })(t);
                    break;
                  case d.PAN:
                    if (!1 === c.enablePan) return;
                    !(function (t) {
                      S.set(t.clientX, t.clientY),
                        E.subVectors(S, M).multiplyScalar(c.panSpeed),
                        z(E.x, E.y),
                        M.copy(S),
                        c.update();
                    })(t);
                }
            })(t);
        }
    }
    function Q(t) {
      switch (t.pointerType) {
        case "mouse":
        case "pen":
          c.domElement.ownerDocument.removeEventListener("pointermove", J, !1),
            c.domElement.ownerDocument.removeEventListener("pointerup", Q, !1),
            !1 !== c.enabled && (c.dispatchEvent(u), (p = d.NONE));
      }
    }
    function K(t) {
      !1 === c.enabled ||
        !1 === c.enableZoom ||
        (p !== d.NONE && p !== d.ROTATE) ||
        (t.preventDefault(),
        t.stopPropagation(),
        c.dispatchEvent(h),
        (function (t) {
          t.deltaY < 0 ? U(C()) : t.deltaY > 0 && B(C()), c.update();
        })(t),
        c.dispatchEvent(u));
    }
    function $(t) {
      !1 !== c.enabled &&
        !1 !== c.enableKeys &&
        !1 !== c.enablePan &&
        (function (t) {
          var e = !1;
          switch (t.keyCode) {
            case c.keys.UP:
              z(0, c.keyPanSpeed), (e = !0);
              break;
            case c.keys.BOTTOM:
              z(0, -c.keyPanSpeed), (e = !0);
              break;
            case c.keys.LEFT:
              z(c.keyPanSpeed, 0), (e = !0);
              break;
            case c.keys.RIGHT:
              z(-c.keyPanSpeed, 0), (e = !0);
          }
          e && (t.preventDefault(), c.update());
        })(t);
    }
    function tt(t) {
      if (!1 !== c.enabled) {
        switch ((t.preventDefault(), t.touches.length)) {
          case 1:
            switch (c.touches.ONE) {
              case 0:
                if (!1 === c.enableRotate) return;
                V(t), (p = d.TOUCH_ROTATE);
                break;
              case 1:
                if (!1 === c.enablePan) return;
                j(t), (p = d.TOUCH_PAN);
                break;
              default:
                p = d.NONE;
            }
            break;
          case 2:
            switch (c.touches.TWO) {
              case 2:
                if (!1 === c.enableZoom && !1 === c.enablePan) return;
                !(function (t) {
                  c.enableZoom && W(t), c.enablePan && j(t);
                })(t),
                  (p = d.TOUCH_DOLLY_PAN);
                break;
              case 3:
                if (!1 === c.enableZoom && !1 === c.enableRotate) return;
                !(function (t) {
                  c.enableZoom && W(t), c.enableRotate && V(t);
                })(t),
                  (p = d.TOUCH_DOLLY_ROTATE);
                break;
              default:
                p = d.NONE;
            }
            break;
          default:
            p = d.NONE;
        }
        p !== d.NONE && c.dispatchEvent(h);
      }
    }
    function et(t) {
      if (!1 !== c.enabled)
        switch ((t.preventDefault(), t.stopPropagation(), p)) {
          case d.TOUCH_ROTATE:
            if (!1 === c.enableRotate) return;
            q(t), c.update();
            break;
          case d.TOUCH_PAN:
            if (!1 === c.enablePan) return;
            X(t), c.update();
            break;
          case d.TOUCH_DOLLY_PAN:
            if (!1 === c.enableZoom && !1 === c.enablePan) return;
            !(function (t) {
              c.enableZoom && Y(t), c.enablePan && X(t);
            })(t),
              c.update();
            break;
          case d.TOUCH_DOLLY_ROTATE:
            if (!1 === c.enableZoom && !1 === c.enableRotate) return;
            !(function (t) {
              c.enableZoom && Y(t), c.enableRotate && q(t);
            })(t),
              c.update();
            break;
          default:
            p = d.NONE;
        }
    }
    function nt(t) {
      !1 !== c.enabled && (c.dispatchEvent(u), (p = d.NONE));
    }
    function it(t) {
      !1 !== c.enabled && t.preventDefault();
    }
    c.domElement.addEventListener("contextmenu", it, !1),
      c.domElement.addEventListener("pointerdown", Z, !1),
      c.domElement.addEventListener("wheel", K, !1),
      c.domElement.addEventListener("touchstart", tt, !1),
      c.domElement.addEventListener("touchend", nt, !1),
      c.domElement.addEventListener("touchmove", et, !1),
      c.domElement.addEventListener("keydown", $, !1),
      this.update();
  };
  (Gc.prototype = Object.create(A.prototype)).constructor = Gc;
  var Vc = function (t, e) {
    Gc.call(this, t, e),
      (this.screenSpacePanning = !1),
      (this.mouseButtons.LEFT = 2),
      (this.mouseButtons.RIGHT = 0),
      (this.touches.ONE = 1),
      (this.touches.TWO = 3);
  };
  function jc(t, e) {
    var n = t.__state.conversionName.toString(),
      i = Math.round(t.r),
      r = Math.round(t.g),
      o = Math.round(t.b),
      s = t.a,
      a = Math.round(t.h),
      c = t.s.toFixed(1),
      l = t.v.toFixed(1);
    if (e || "THREE_CHAR_HEX" === n || "SIX_CHAR_HEX" === n) {
      for (var h = t.hex.toString(16); h.length < 6; ) h = "0" + h;
      return "#" + h;
    }
    return "CSS_RGB" === n
      ? "rgb(" + i + "," + r + "," + o + ")"
      : "CSS_RGBA" === n
      ? "rgba(" + i + "," + r + "," + o + "," + s + ")"
      : "HEX" === n
      ? "0x" + t.hex.toString(16)
      : "RGB_ARRAY" === n
      ? "[" + i + "," + r + "," + o + "]"
      : "RGBA_ARRAY" === n
      ? "[" + i + "," + r + "," + o + "," + s + "]"
      : "RGB_OBJ" === n
      ? "{r:" + i + ",g:" + r + ",b:" + o + "}"
      : "RGBA_OBJ" === n
      ? "{r:" + i + ",g:" + r + ",b:" + o + ",a:" + s + "}"
      : "HSV_OBJ" === n
      ? "{h:" + a + ",s:" + c + ",v:" + l + "}"
      : "HSVA_OBJ" === n
      ? "{h:" + a + ",s:" + c + ",v:" + l + ",a:" + s + "}"
      : "unknown format";
  }
  (Vc.prototype = Object.create(A.prototype)).constructor = Vc;
  var Wc = Array.prototype.forEach,
    qc = Array.prototype.slice,
    Xc = {
      BREAK: {},
      extend: function (t) {
        return (
          this.each(
            qc.call(arguments, 1),
            function (e) {
              (this.isObject(e) ? Object.keys(e) : []).forEach(
                function (n) {
                  this.isUndefined(e[n]) || (t[n] = e[n]);
                }.bind(this)
              );
            },
            this
          ),
          t
        );
      },
      defaults: function (t) {
        return (
          this.each(
            qc.call(arguments, 1),
            function (e) {
              (this.isObject(e) ? Object.keys(e) : []).forEach(
                function (n) {
                  this.isUndefined(t[n]) && (t[n] = e[n]);
                }.bind(this)
              );
            },
            this
          ),
          t
        );
      },
      compose: function () {
        var t = qc.call(arguments);
        return function () {
          for (var e = qc.call(arguments), n = t.length - 1; n >= 0; n--)
            e = [t[n].apply(this, e)];
          return e[0];
        };
      },
      each: function (t, e, n) {
        if (t)
          if (Wc && t.forEach && t.forEach === Wc) t.forEach(e, n);
          else if (t.length === t.length + 0) {
            var i,
              r = void 0;
            for (r = 0, i = t.length; r < i; r++)
              if (r in t && e.call(n, t[r], r) === this.BREAK) return;
          } else for (var o in t) if (e.call(n, t[o], o) === this.BREAK) return;
      },
      defer: function (t) {
        setTimeout(t, 0);
      },
      debounce: function (t, e, n) {
        var i = void 0;
        return function () {
          var r = this,
            o = arguments;
          function s() {
            (i = null), n || t.apply(r, o);
          }
          var a = n || !i;
          clearTimeout(i), (i = setTimeout(s, e)), a && t.apply(r, o);
        };
      },
      toArray: function (t) {
        return t.toArray ? t.toArray() : qc.call(t);
      },
      isUndefined: function (t) {
        return void 0 === t;
      },
      isNull: function (t) {
        return null === t;
      },
      isNaN: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (t) {
        return isNaN(t);
      }),
      isArray:
        Array.isArray ||
        function (t) {
          return t.constructor === Array;
        },
      isObject: function (t) {
        return t === Object(t);
      },
      isNumber: function (t) {
        return t === t + 0;
      },
      isString: function (t) {
        return t === t + "";
      },
      isBoolean: function (t) {
        return !1 === t || !0 === t;
      },
      isFunction: function (t) {
        return t instanceof Function;
      },
    },
    Yc = [
      {
        litmus: Xc.isString,
        conversions: {
          THREE_CHAR_HEX: {
            read: function (t) {
              var e = t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
              return (
                null !== e && {
                  space: "HEX",
                  hex: parseInt(
                    "0x" +
                      e[1].toString() +
                      e[1].toString() +
                      e[2].toString() +
                      e[2].toString() +
                      e[3].toString() +
                      e[3].toString(),
                    0
                  ),
                }
              );
            },
            write: jc,
          },
          SIX_CHAR_HEX: {
            read: function (t) {
              var e = t.match(/^#([A-F0-9]{6})$/i);
              return (
                null !== e && {
                  space: "HEX",
                  hex: parseInt("0x" + e[1].toString(), 0),
                }
              );
            },
            write: jc,
          },
          CSS_RGB: {
            read: function (t) {
              var e = t.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
              return (
                null !== e && {
                  space: "RGB",
                  r: parseFloat(e[1]),
                  g: parseFloat(e[2]),
                  b: parseFloat(e[3]),
                }
              );
            },
            write: jc,
          },
          CSS_RGBA: {
            read: function (t) {
              var e = t.match(
                /^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/
              );
              return (
                null !== e && {
                  space: "RGB",
                  r: parseFloat(e[1]),
                  g: parseFloat(e[2]),
                  b: parseFloat(e[3]),
                  a: parseFloat(e[4]),
                }
              );
            },
            write: jc,
          },
        },
      },
      {
        litmus: Xc.isNumber,
        conversions: {
          HEX: {
            read: function (t) {
              return { space: "HEX", hex: t, conversionName: "HEX" };
            },
            write: function (t) {
              return t.hex;
            },
          },
        },
      },
      {
        litmus: Xc.isArray,
        conversions: {
          RGB_ARRAY: {
            read: function (t) {
              return (
                3 === t.length && { space: "RGB", r: t[0], g: t[1], b: t[2] }
              );
            },
            write: function (t) {
              return [t.r, t.g, t.b];
            },
          },
          RGBA_ARRAY: {
            read: function (t) {
              return (
                4 === t.length && {
                  space: "RGB",
                  r: t[0],
                  g: t[1],
                  b: t[2],
                  a: t[3],
                }
              );
            },
            write: function (t) {
              return [t.r, t.g, t.b, t.a];
            },
          },
        },
      },
      {
        litmus: Xc.isObject,
        conversions: {
          RGBA_OBJ: {
            read: function (t) {
              return (
                !!(
                  Xc.isNumber(t.r) &&
                  Xc.isNumber(t.g) &&
                  Xc.isNumber(t.b) &&
                  Xc.isNumber(t.a)
                ) && { space: "RGB", r: t.r, g: t.g, b: t.b, a: t.a }
              );
            },
            write: function (t) {
              return { r: t.r, g: t.g, b: t.b, a: t.a };
            },
          },
          RGB_OBJ: {
            read: function (t) {
              return (
                !!(
                  Xc.isNumber(t.r) &&
                  Xc.isNumber(t.g) &&
                  Xc.isNumber(t.b)
                ) && { space: "RGB", r: t.r, g: t.g, b: t.b }
              );
            },
            write: function (t) {
              return { r: t.r, g: t.g, b: t.b };
            },
          },
          HSVA_OBJ: {
            read: function (t) {
              return (
                !!(
                  Xc.isNumber(t.h) &&
                  Xc.isNumber(t.s) &&
                  Xc.isNumber(t.v) &&
                  Xc.isNumber(t.a)
                ) && { space: "HSV", h: t.h, s: t.s, v: t.v, a: t.a }
              );
            },
            write: function (t) {
              return { h: t.h, s: t.s, v: t.v, a: t.a };
            },
          },
          HSV_OBJ: {
            read: function (t) {
              return (
                !!(
                  Xc.isNumber(t.h) &&
                  Xc.isNumber(t.s) &&
                  Xc.isNumber(t.v)
                ) && { space: "HSV", h: t.h, s: t.s, v: t.v }
              );
            },
            write: function (t) {
              return { h: t.h, s: t.s, v: t.v };
            },
          },
        },
      },
    ],
    Zc = void 0,
    Jc = void 0,
    Qc = function () {
      Jc = !1;
      var t = arguments.length > 1 ? Xc.toArray(arguments) : arguments[0];
      return (
        Xc.each(Yc, function (e) {
          if (e.litmus(t))
            return (
              Xc.each(e.conversions, function (e, n) {
                if (((Zc = e.read(t)), !1 === Jc && !1 !== Zc))
                  return (
                    (Jc = Zc),
                    (Zc.conversionName = n),
                    (Zc.conversion = e),
                    Xc.BREAK
                  );
              }),
              Xc.BREAK
            );
        }),
        Jc
      );
    },
    Kc = void 0,
    $c = {
      hsv_to_rgb: function (t, e, n) {
        var i = Math.floor(t / 60) % 6,
          r = t / 60 - Math.floor(t / 60),
          o = n * (1 - e),
          s = n * (1 - r * e),
          a = n * (1 - (1 - r) * e),
          c = [
            [n, a, o],
            [s, n, o],
            [o, n, a],
            [o, s, n],
            [a, o, n],
            [n, o, s],
          ][i];
        return { r: 255 * c[0], g: 255 * c[1], b: 255 * c[2] };
      },
      rgb_to_hsv: function (t, e, n) {
        var i = Math.min(t, e, n),
          r = Math.max(t, e, n),
          o = r - i,
          s = void 0;
        return 0 === r
          ? { h: NaN, s: 0, v: 0 }
          : ((s =
              t === r
                ? (e - n) / o
                : e === r
                ? 2 + (n - t) / o
                : 4 + (t - e) / o),
            (s /= 6) < 0 && (s += 1),
            { h: 360 * s, s: o / r, v: r / 255 });
      },
      rgb_to_hex: function (t, e, n) {
        var i = this.hex_with_component(0, 2, t);
        return (
          (i = this.hex_with_component(i, 1, e)),
          this.hex_with_component(i, 0, n)
        );
      },
      component_from_hex: function (t, e) {
        return (t >> (8 * e)) & 255;
      },
      hex_with_component: function (t, e, n) {
        return (n << (Kc = 8 * e)) | (t & ~(255 << Kc));
      },
    },
    tl =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          },
    el = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    nl = (function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    })(),
    il = function t(e, n, i) {
      null === e && (e = Function.prototype);
      var r = Object.getOwnPropertyDescriptor(e, n);
      if (void 0 === r) {
        var o = Object.getPrototypeOf(e);
        return null === o ? void 0 : t(o, n, i);
      }
      if ("value" in r) return r.value;
      var s = r.get;
      return void 0 !== s ? s.call(i) : void 0;
    },
    rl = function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    },
    ol = function (t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    },
    sl = (function () {
      function t() {
        if (
          (el(this, t),
          (this.__state = Qc.apply(this, arguments)),
          !1 === this.__state)
        )
          throw new Error("Failed to interpret color arguments");
        this.__state.a = this.__state.a || 1;
      }
      return (
        nl(t, [
          {
            key: "toString",
            value: function () {
              return jc(this);
            },
          },
          {
            key: "toHexString",
            value: function () {
              return jc(this, !0);
            },
          },
          {
            key: "toOriginal",
            value: function () {
              return this.__state.conversion.write(this);
            },
          },
        ]),
        t
      );
    })();
  function al(t, e, n) {
    Object.defineProperty(t, e, {
      get: function () {
        return (
          "RGB" === this.__state.space || sl.recalculateRGB(this, e, n),
          this.__state[e]
        );
      },
      set: function (t) {
        "RGB" !== this.__state.space &&
          (sl.recalculateRGB(this, e, n), (this.__state.space = "RGB")),
          (this.__state[e] = t);
      },
    });
  }
  function cl(t, e) {
    Object.defineProperty(t, e, {
      get: function () {
        return (
          "HSV" === this.__state.space || sl.recalculateHSV(this),
          this.__state[e]
        );
      },
      set: function (t) {
        "HSV" !== this.__state.space &&
          (sl.recalculateHSV(this), (this.__state.space = "HSV")),
          (this.__state[e] = t);
      },
    });
  }
  (sl.recalculateRGB = function (t, e, n) {
    if ("HEX" === t.__state.space)
      t.__state[e] = $c.component_from_hex(t.__state.hex, n);
    else {
      if ("HSV" !== t.__state.space) throw new Error("Corrupted color state");
      Xc.extend(
        t.__state,
        $c.hsv_to_rgb(t.__state.h, t.__state.s, t.__state.v)
      );
    }
  }),
    (sl.recalculateHSV = function (t) {
      var e = $c.rgb_to_hsv(t.r, t.g, t.b);
      Xc.extend(t.__state, { s: e.s, v: e.v }),
        Xc.isNaN(e.h)
          ? Xc.isUndefined(t.__state.h) && (t.__state.h = 0)
          : (t.__state.h = e.h);
    }),
    (sl.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"]),
    al(sl.prototype, "r", 2),
    al(sl.prototype, "g", 1),
    al(sl.prototype, "b", 0),
    cl(sl.prototype, "h"),
    cl(sl.prototype, "s"),
    cl(sl.prototype, "v"),
    Object.defineProperty(sl.prototype, "a", {
      get: function () {
        return this.__state.a;
      },
      set: function (t) {
        this.__state.a = t;
      },
    }),
    Object.defineProperty(sl.prototype, "hex", {
      get: function () {
        return (
          "HEX" !== this.__state.space &&
            ((this.__state.hex = $c.rgb_to_hex(this.r, this.g, this.b)),
            (this.__state.space = "HEX")),
          this.__state.hex
        );
      },
      set: function (t) {
        (this.__state.space = "HEX"), (this.__state.hex = t);
      },
    });
  var ll = (function () {
      function t(e, n) {
        el(this, t),
          (this.initialValue = e[n]),
          (this.domElement = document.createElement("div")),
          (this.object = e),
          (this.property = n),
          (this.__onChange = void 0),
          (this.__onFinishChange = void 0);
      }
      return (
        nl(t, [
          {
            key: "onChange",
            value: function (t) {
              return (this.__onChange = t), this;
            },
          },
          {
            key: "onFinishChange",
            value: function (t) {
              return (this.__onFinishChange = t), this;
            },
          },
          {
            key: "setValue",
            value: function (t) {
              return (
                (this.object[this.property] = t),
                this.__onChange && this.__onChange.call(this, t),
                this.updateDisplay(),
                this
              );
            },
          },
          {
            key: "getValue",
            value: function () {
              return this.object[this.property];
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return this;
            },
          },
          {
            key: "isModified",
            value: function () {
              return this.initialValue !== this.getValue();
            },
          },
        ]),
        t
      );
    })(),
    hl = {};
  Xc.each(
    {
      HTMLEvents: ["change"],
      MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
      KeyboardEvents: ["keydown"],
    },
    function (t, e) {
      Xc.each(t, function (t) {
        hl[t] = e;
      });
    }
  );
  var ul = /(\d+(\.\d+)?)px/;
  function dl(t) {
    if ("0" === t || Xc.isUndefined(t)) return 0;
    var e = t.match(ul);
    return Xc.isNull(e) ? 0 : parseFloat(e[1]);
  }
  var pl = {
      makeSelectable: function (t, e) {
        void 0 !== t &&
          void 0 !== t.style &&
          ((t.onselectstart = e
            ? function () {
                return !1;
              }
            : function () {}),
          (t.style.MozUserSelect = e ? "auto" : "none"),
          (t.style.KhtmlUserSelect = e ? "auto" : "none"),
          (t.unselectable = e ? "on" : "off"));
      },
      makeFullscreen: function (t, e, n) {
        var i = n,
          r = e;
        Xc.isUndefined(r) && (r = !0),
          Xc.isUndefined(i) && (i = !0),
          (t.style.position = "absolute"),
          r && ((t.style.left = 0), (t.style.right = 0)),
          i && ((t.style.top = 0), (t.style.bottom = 0));
      },
      fakeEvent: function (t, e, n, i) {
        var r = n || {},
          o = hl[e];
        if (!o) throw new Error("Event type " + e + " not supported.");
        var s = document.createEvent(o);
        switch (o) {
          case "MouseEvents":
            var a = r.x || r.clientX || 0,
              c = r.y || r.clientY || 0;
            s.initMouseEvent(
              e,
              r.bubbles || !1,
              r.cancelable || !0,
              window,
              r.clickCount || 1,
              0,
              0,
              a,
              c,
              !1,
              !1,
              !1,
              !1,
              0,
              null
            );
            break;
          case "KeyboardEvents":
            var l = s.initKeyboardEvent || s.initKeyEvent;
            Xc.defaults(r, {
              cancelable: !0,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              keyCode: void 0,
              charCode: void 0,
            }),
              l(
                e,
                r.bubbles || !1,
                r.cancelable,
                window,
                r.ctrlKey,
                r.altKey,
                r.shiftKey,
                r.metaKey,
                r.keyCode,
                r.charCode
              );
            break;
          default:
            s.initEvent(e, r.bubbles || !1, r.cancelable || !0);
        }
        Xc.defaults(s, i), t.dispatchEvent(s);
      },
      bind: function (t, e, n, i) {
        var r = i || !1;
        return (
          t.addEventListener
            ? t.addEventListener(e, n, r)
            : t.attachEvent && t.attachEvent("on" + e, n),
          pl
        );
      },
      unbind: function (t, e, n, i) {
        var r = i || !1;
        return (
          t.removeEventListener
            ? t.removeEventListener(e, n, r)
            : t.detachEvent && t.detachEvent("on" + e, n),
          pl
        );
      },
      addClass: function (t, e) {
        if (void 0 === t.className) t.className = e;
        else if (t.className !== e) {
          var n = t.className.split(/ +/);
          -1 === n.indexOf(e) &&
            (n.push(e),
            (t.className = n
              .join(" ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, "")));
        }
        return pl;
      },
      removeClass: function (t, e) {
        if (e)
          if (t.className === e) t.removeAttribute("class");
          else {
            var n = t.className.split(/ +/),
              i = n.indexOf(e);
            -1 !== i && (n.splice(i, 1), (t.className = n.join(" ")));
          }
        else t.className = void 0;
        return pl;
      },
      hasClass: function (t, e) {
        return (
          new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)").test(t.className) || !1
        );
      },
      getWidth: function (t) {
        var e = getComputedStyle(t);
        return (
          dl(e["border-left-width"]) +
          dl(e["border-right-width"]) +
          dl(e["padding-left"]) +
          dl(e["padding-right"]) +
          dl(e.width)
        );
      },
      getHeight: function (t) {
        var e = getComputedStyle(t);
        return (
          dl(e["border-top-width"]) +
          dl(e["border-bottom-width"]) +
          dl(e["padding-top"]) +
          dl(e["padding-bottom"]) +
          dl(e.height)
        );
      },
      getOffset: function (t) {
        var e = t,
          n = { left: 0, top: 0 };
        if (e.offsetParent)
          do {
            (n.left += e.offsetLeft),
              (n.top += e.offsetTop),
              (e = e.offsetParent);
          } while (e);
        return n;
      },
      isActive: function (t) {
        return t === document.activeElement && (t.type || t.href);
      },
    },
    fl = (function (t) {
      function e(t, n) {
        el(this, e);
        var i = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          r = i;
        return (
          (i.__prev = i.getValue()),
          (i.__checkbox = document.createElement("input")),
          i.__checkbox.setAttribute("type", "checkbox"),
          pl.bind(
            i.__checkbox,
            "change",
            function () {
              r.setValue(!r.__prev);
            },
            !1
          ),
          i.domElement.appendChild(i.__checkbox),
          i.updateDisplay(),
          i
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = il(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "setValue",
                this
              ).call(this, t);
              return (
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue()),
                (this.__prev = this.getValue()),
                n
              );
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return (
                !0 === this.getValue()
                  ? (this.__checkbox.setAttribute("checked", "checked"),
                    (this.__checkbox.checked = !0),
                    (this.__prev = !0))
                  : ((this.__checkbox.checked = !1), (this.__prev = !1)),
                il(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(ll),
    ml = (function (t) {
      function e(t, n, i) {
        el(this, e);
        var r = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          o = i,
          s = r;
        if (((r.__select = document.createElement("select")), Xc.isArray(o))) {
          var a = {};
          Xc.each(o, function (t) {
            a[t] = t;
          }),
            (o = a);
        }
        return (
          Xc.each(o, function (t, e) {
            var n = document.createElement("option");
            (n.innerHTML = e),
              n.setAttribute("value", t),
              s.__select.appendChild(n);
          }),
          r.updateDisplay(),
          pl.bind(r.__select, "change", function () {
            var t = this.options[this.selectedIndex].value;
            s.setValue(t);
          }),
          r.domElement.appendChild(r.__select),
          r
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = il(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "setValue",
                this
              ).call(this, t);
              return (
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue()),
                n
              );
            },
          },
          {
            key: "updateDisplay",
            value: function () {
              return pl.isActive(this.__select)
                ? this
                : ((this.__select.value = this.getValue()),
                  il(
                    e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                    "updateDisplay",
                    this
                  ).call(this));
            },
          },
        ]),
        e
      );
    })(ll),
    gl = (function (t) {
      function e(t, n) {
        el(this, e);
        var i = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          r = i;
        function o() {
          r.setValue(r.__input.value);
        }
        return (
          (i.__input = document.createElement("input")),
          i.__input.setAttribute("type", "text"),
          pl.bind(i.__input, "keyup", o),
          pl.bind(i.__input, "change", o),
          pl.bind(i.__input, "blur", function () {
            r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
          }),
          pl.bind(i.__input, "keydown", function (t) {
            13 === t.keyCode && this.blur();
          }),
          i.updateDisplay(),
          i.domElement.appendChild(i.__input),
          i
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "updateDisplay",
            value: function () {
              return (
                pl.isActive(this.__input) ||
                  (this.__input.value = this.getValue()),
                il(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(ll);
  function vl(t) {
    var e = t.toString();
    return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0;
  }
  var yl = (function (t) {
      function e(t, n, i) {
        el(this, e);
        var r = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          o = i || {};
        return (
          (r.__min = o.min),
          (r.__max = o.max),
          (r.__step = o.step),
          Xc.isUndefined(r.__step)
            ? 0 === r.initialValue
              ? (r.__impliedStep = 1)
              : (r.__impliedStep =
                  Math.pow(
                    10,
                    Math.floor(Math.log(Math.abs(r.initialValue)) / Math.LN10)
                  ) / 10)
            : (r.__impliedStep = r.__step),
          (r.__precision = vl(r.__impliedStep)),
          r
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "setValue",
            value: function (t) {
              var n = t;
              return (
                void 0 !== this.__min && n < this.__min
                  ? (n = this.__min)
                  : void 0 !== this.__max && n > this.__max && (n = this.__max),
                void 0 !== this.__step &&
                  n % this.__step != 0 &&
                  (n = Math.round(n / this.__step) * this.__step),
                il(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "setValue",
                  this
                ).call(this, n)
              );
            },
          },
          {
            key: "min",
            value: function (t) {
              return (this.__min = t), this;
            },
          },
          {
            key: "max",
            value: function (t) {
              return (this.__max = t), this;
            },
          },
          {
            key: "step",
            value: function (t) {
              return (
                (this.__step = t),
                (this.__impliedStep = t),
                (this.__precision = vl(t)),
                this
              );
            },
          },
        ]),
        e
      );
    })(ll),
    _l = (function (t) {
      function e(t, n, i) {
        el(this, e);
        var r = ol(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, i)
        );
        r.__truncationSuspended = !1;
        var o = r,
          s = void 0;
        function a() {
          o.__onFinishChange && o.__onFinishChange.call(o, o.getValue());
        }
        function c(t) {
          var e = s - t.clientY;
          o.setValue(o.getValue() + e * o.__impliedStep), (s = t.clientY);
        }
        function l() {
          pl.unbind(window, "mousemove", c),
            pl.unbind(window, "mouseup", l),
            a();
        }
        return (
          (r.__input = document.createElement("input")),
          r.__input.setAttribute("type", "text"),
          pl.bind(r.__input, "change", function () {
            var t = parseFloat(o.__input.value);
            Xc.isNaN(t) || o.setValue(t);
          }),
          pl.bind(r.__input, "blur", function () {
            a();
          }),
          pl.bind(r.__input, "mousedown", function (t) {
            pl.bind(window, "mousemove", c),
              pl.bind(window, "mouseup", l),
              (s = t.clientY);
          }),
          pl.bind(r.__input, "keydown", function (t) {
            13 === t.keyCode &&
              ((o.__truncationSuspended = !0),
              this.blur(),
              (o.__truncationSuspended = !1),
              a());
          }),
          r.updateDisplay(),
          r.domElement.appendChild(r.__input),
          r
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t, n, i;
              return (
                (this.__input.value = this.__truncationSuspended
                  ? this.getValue()
                  : ((t = this.getValue()),
                    (n = this.__precision),
                    (i = Math.pow(10, n)),
                    Math.round(t * i) / i)),
                il(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(yl);
  function xl(t, e, n, i, r) {
    return i + ((t - e) / (n - e)) * (r - i);
  }
  var bl = (function (t) {
      function e(t, n, i, r, o) {
        el(this, e);
        var s = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n, {
              min: i,
              max: r,
              step: o,
            })
          ),
          a = s;
        function c(t) {
          t.preventDefault();
          var e = a.__background.getBoundingClientRect();
          return (
            a.setValue(xl(t.clientX, e.left, e.right, a.__min, a.__max)), !1
          );
        }
        function l() {
          pl.unbind(window, "mousemove", c),
            pl.unbind(window, "mouseup", l),
            a.__onFinishChange && a.__onFinishChange.call(a, a.getValue());
        }
        function h(t) {
          var e = t.touches[0].clientX,
            n = a.__background.getBoundingClientRect();
          a.setValue(xl(e, n.left, n.right, a.__min, a.__max));
        }
        function u() {
          pl.unbind(window, "touchmove", h),
            pl.unbind(window, "touchend", u),
            a.__onFinishChange && a.__onFinishChange.call(a, a.getValue());
        }
        return (
          (s.__background = document.createElement("div")),
          (s.__foreground = document.createElement("div")),
          pl.bind(s.__background, "mousedown", function (t) {
            document.activeElement.blur(),
              pl.bind(window, "mousemove", c),
              pl.bind(window, "mouseup", l),
              c(t);
          }),
          pl.bind(s.__background, "touchstart", function (t) {
            1 === t.touches.length &&
              (pl.bind(window, "touchmove", h),
              pl.bind(window, "touchend", u),
              h(t));
          }),
          pl.addClass(s.__background, "slider"),
          pl.addClass(s.__foreground, "slider-fg"),
          s.updateDisplay(),
          s.__background.appendChild(s.__foreground),
          s.domElement.appendChild(s.__background),
          s
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t =
                (this.getValue() - this.__min) / (this.__max - this.__min);
              return (
                (this.__foreground.style.width = 100 * t + "%"),
                il(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this)
              );
            },
          },
        ]),
        e
      );
    })(yl),
    wl = (function (t) {
      function e(t, n, i) {
        el(this, e);
        var r = ol(
            this,
            (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
          ),
          o = r;
        return (
          (r.__button = document.createElement("div")),
          (r.__button.innerHTML = void 0 === i ? "Fire" : i),
          pl.bind(r.__button, "click", function (t) {
            return t.preventDefault(), o.fire(), !1;
          }),
          pl.addClass(r.__button, "button"),
          r.domElement.appendChild(r.__button),
          r
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "fire",
            value: function () {
              this.__onChange && this.__onChange.call(this),
                this.getValue().call(this.object),
                this.__onFinishChange &&
                  this.__onFinishChange.call(this, this.getValue());
            },
          },
        ]),
        e
      );
    })(ll),
    Ml = (function (t) {
      function e(t, n) {
        el(this, e);
        var i = ol(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
        );
        (i.__color = new sl(i.getValue())), (i.__temp = new sl(0));
        var r = i;
        (i.domElement = document.createElement("div")),
          pl.makeSelectable(i.domElement, !1),
          (i.__selector = document.createElement("div")),
          (i.__selector.className = "selector"),
          (i.__saturation_field = document.createElement("div")),
          (i.__saturation_field.className = "saturation-field"),
          (i.__field_knob = document.createElement("div")),
          (i.__field_knob.className = "field-knob"),
          (i.__field_knob_border = "2px solid "),
          (i.__hue_knob = document.createElement("div")),
          (i.__hue_knob.className = "hue-knob"),
          (i.__hue_field = document.createElement("div")),
          (i.__hue_field.className = "hue-field"),
          (i.__input = document.createElement("input")),
          (i.__input.type = "text"),
          (i.__input_textShadow = "0 1px 1px "),
          pl.bind(i.__input, "keydown", function (t) {
            13 === t.keyCode && u.call(this);
          }),
          pl.bind(i.__input, "blur", u),
          pl.bind(i.__selector, "mousedown", function () {
            pl.addClass(this, "drag").bind(window, "mouseup", function () {
              pl.removeClass(r.__selector, "drag");
            });
          }),
          pl.bind(i.__selector, "touchstart", function () {
            pl.addClass(this, "drag").bind(window, "touchend", function () {
              pl.removeClass(r.__selector, "drag");
            });
          });
        var o,
          s = document.createElement("div");
        function a(t) {
          p(t),
            pl.bind(window, "mousemove", p),
            pl.bind(window, "touchmove", p),
            pl.bind(window, "mouseup", l),
            pl.bind(window, "touchend", l);
        }
        function c(t) {
          f(t),
            pl.bind(window, "mousemove", f),
            pl.bind(window, "touchmove", f),
            pl.bind(window, "mouseup", h),
            pl.bind(window, "touchend", h);
        }
        function l() {
          pl.unbind(window, "mousemove", p),
            pl.unbind(window, "touchmove", p),
            pl.unbind(window, "mouseup", l),
            pl.unbind(window, "touchend", l),
            d();
        }
        function h() {
          pl.unbind(window, "mousemove", f),
            pl.unbind(window, "touchmove", f),
            pl.unbind(window, "mouseup", h),
            pl.unbind(window, "touchend", h),
            d();
        }
        function u() {
          var t = Qc(this.value);
          !1 !== t
            ? ((r.__color.__state = t), r.setValue(r.__color.toOriginal()))
            : (this.value = r.__color.toString());
        }
        function d() {
          r.__onFinishChange &&
            r.__onFinishChange.call(r, r.__color.toOriginal());
        }
        function p(t) {
          -1 === t.type.indexOf("touch") && t.preventDefault();
          var e = r.__saturation_field.getBoundingClientRect(),
            n = (t.touches && t.touches[0]) || t,
            i = n.clientX,
            o = n.clientY,
            s = (i - e.left) / (e.right - e.left),
            a = 1 - (o - e.top) / (e.bottom - e.top);
          return (
            a > 1 ? (a = 1) : a < 0 && (a = 0),
            s > 1 ? (s = 1) : s < 0 && (s = 0),
            (r.__color.v = a),
            (r.__color.s = s),
            r.setValue(r.__color.toOriginal()),
            !1
          );
        }
        function f(t) {
          -1 === t.type.indexOf("touch") && t.preventDefault();
          var e = r.__hue_field.getBoundingClientRect(),
            n =
              1 -
              (((t.touches && t.touches[0]) || t).clientY - e.top) /
                (e.bottom - e.top);
          return (
            n > 1 ? (n = 1) : n < 0 && (n = 0),
            (r.__color.h = 360 * n),
            r.setValue(r.__color.toOriginal()),
            !1
          );
        }
        return (
          Xc.extend(i.__selector.style, {
            width: "122px",
            height: "102px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)",
          }),
          Xc.extend(i.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border:
              i.__field_knob_border + (i.__color.v < 0.5 ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1,
          }),
          Xc.extend(i.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1,
          }),
          Xc.extend(i.__saturation_field.style, {
            width: "100px",
            height: "100px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer",
          }),
          Xc.extend(s.style, {
            width: "100%",
            height: "100%",
            background: "none",
          }),
          El(s, "top", "rgba(0,0,0,0)", "#000"),
          Xc.extend(i.__hue_field.style, {
            width: "15px",
            height: "100px",
            border: "1px solid #555",
            cursor: "ns-resize",
            position: "absolute",
            top: "3px",
            right: "3px",
          }),
          ((o = i.__hue_field).style.background = ""),
          (o.style.cssText +=
            "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);"),
          (o.style.cssText +=
            "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (o.style.cssText +=
            "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (o.style.cssText +=
            "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          (o.style.cssText +=
            "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
          Xc.extend(i.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: i.__input_textShadow + "rgba(0,0,0,0.7)",
          }),
          pl.bind(i.__saturation_field, "mousedown", a),
          pl.bind(i.__saturation_field, "touchstart", a),
          pl.bind(i.__field_knob, "mousedown", a),
          pl.bind(i.__field_knob, "touchstart", a),
          pl.bind(i.__hue_field, "mousedown", c),
          pl.bind(i.__hue_field, "touchstart", c),
          i.__saturation_field.appendChild(s),
          i.__selector.appendChild(i.__field_knob),
          i.__selector.appendChild(i.__saturation_field),
          i.__selector.appendChild(i.__hue_field),
          i.__hue_field.appendChild(i.__hue_knob),
          i.domElement.appendChild(i.__input),
          i.domElement.appendChild(i.__selector),
          i.updateDisplay(),
          i
        );
      }
      return (
        rl(e, t),
        nl(e, [
          {
            key: "updateDisplay",
            value: function () {
              var t = Qc(this.getValue());
              if (!1 !== t) {
                var e = !1;
                Xc.each(
                  sl.COMPONENTS,
                  function (n) {
                    if (
                      !Xc.isUndefined(t[n]) &&
                      !Xc.isUndefined(this.__color.__state[n]) &&
                      t[n] !== this.__color.__state[n]
                    )
                      return (e = !0), {};
                  },
                  this
                ),
                  e && Xc.extend(this.__color.__state, t);
              }
              Xc.extend(this.__temp.__state, this.__color.__state),
                (this.__temp.a = 1);
              var n = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
                i = 255 - n;
              Xc.extend(this.__field_knob.style, {
                marginLeft: 100 * this.__color.s - 7 + "px",
                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                backgroundColor: this.__temp.toHexString(),
                border:
                  this.__field_knob_border +
                  "rgb(" +
                  n +
                  "," +
                  n +
                  "," +
                  n +
                  ")",
              }),
                (this.__hue_knob.style.marginTop =
                  100 * (1 - this.__color.h / 360) + "px"),
                (this.__temp.s = 1),
                (this.__temp.v = 1),
                El(
                  this.__saturation_field,
                  "left",
                  "#fff",
                  this.__temp.toHexString()
                ),
                (this.__input.value = this.__color.toString()),
                Xc.extend(this.__input.style, {
                  backgroundColor: this.__color.toHexString(),
                  color: "rgb(" + n + "," + n + "," + n + ")",
                  textShadow:
                    this.__input_textShadow +
                    "rgba(" +
                    i +
                    "," +
                    i +
                    "," +
                    i +
                    ",.7)",
                });
            },
          },
        ]),
        e
      );
    })(ll),
    Sl = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
  function El(t, e, n, i) {
    (t.style.background = ""),
      Xc.each(Sl, function (r) {
        t.style.cssText +=
          "background: " +
          r +
          "linear-gradient(" +
          e +
          ", " +
          n +
          " 0%, " +
          i +
          " 100%); ";
      });
  }
  var Tl =
      '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>',
    Al = function (t, e) {
      var n = t[e];
      return Xc.isArray(arguments[2]) || Xc.isObject(arguments[2])
        ? new ml(t, e, arguments[2])
        : Xc.isNumber(n)
        ? Xc.isNumber(arguments[2]) && Xc.isNumber(arguments[3])
          ? Xc.isNumber(arguments[4])
            ? new bl(t, e, arguments[2], arguments[3], arguments[4])
            : new bl(t, e, arguments[2], arguments[3])
          : Xc.isNumber(arguments[4])
          ? new _l(t, e, {
              min: arguments[2],
              max: arguments[3],
              step: arguments[4],
            })
          : new _l(t, e, { min: arguments[2], max: arguments[3] })
        : Xc.isString(n)
        ? new gl(t, e)
        : Xc.isFunction(n)
        ? new wl(t, e, "")
        : Xc.isBoolean(n)
        ? new fl(t, e)
        : null;
    },
    Ll =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (t) {
        setTimeout(t, 1e3 / 60);
      },
    Cl = (function () {
      function t() {
        el(this, t),
          (this.backgroundElement = document.createElement("div")),
          Xc.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear",
            transition: "opacity 0.2s linear",
          }),
          pl.makeFullscreen(this.backgroundElement),
          (this.backgroundElement.style.position = "fixed"),
          (this.domElement = document.createElement("div")),
          Xc.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition:
              "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
            transition: "transform 0.2s ease-out, opacity 0.2s linear",
          }),
          document.body.appendChild(this.backgroundElement),
          document.body.appendChild(this.domElement);
        var e = this;
        pl.bind(this.backgroundElement, "click", function () {
          e.hide();
        });
      }
      return (
        nl(t, [
          {
            key: "show",
            value: function () {
              var t = this;
              (this.backgroundElement.style.display = "block"),
                (this.domElement.style.display = "block"),
                (this.domElement.style.opacity = 0),
                (this.domElement.style.webkitTransform = "scale(1.1)"),
                this.layout(),
                Xc.defer(function () {
                  (t.backgroundElement.style.opacity = 1),
                    (t.domElement.style.opacity = 1),
                    (t.domElement.style.webkitTransform = "scale(1)");
                });
            },
          },
          {
            key: "hide",
            value: function () {
              var t = this,
                e = function e() {
                  (t.domElement.style.display = "none"),
                    (t.backgroundElement.style.display = "none"),
                    pl.unbind(t.domElement, "webkitTransitionEnd", e),
                    pl.unbind(t.domElement, "transitionend", e),
                    pl.unbind(t.domElement, "oTransitionEnd", e);
                };
              pl.bind(this.domElement, "webkitTransitionEnd", e),
                pl.bind(this.domElement, "transitionend", e),
                pl.bind(this.domElement, "oTransitionEnd", e),
                (this.backgroundElement.style.opacity = 0),
                (this.domElement.style.opacity = 0),
                (this.domElement.style.webkitTransform = "scale(1.1)");
            },
          },
          {
            key: "layout",
            value: function () {
              (this.domElement.style.left =
                window.innerWidth / 2 -
                pl.getWidth(this.domElement) / 2 +
                "px"),
                (this.domElement.style.top =
                  window.innerHeight / 2 -
                  pl.getHeight(this.domElement) / 2 +
                  "px");
            },
          },
        ]),
        t
      );
    })();
  !(function (t, e) {
    var n = e || document,
      i = document.createElement("style");
    (i.type = "text/css"), (i.innerHTML = t);
    var r = n.getElementsByTagName("head")[0];
    try {
      r.appendChild(i);
    } catch (t) {}
  })(
    (function (t) {
      if ("undefined" != typeof window) {
        var e = document.createElement("style");
        return (
          e.setAttribute("type", "text/css"),
          (e.innerHTML = t),
          document.head.appendChild(e),
          t
        );
      }
    })(
      ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
    )
  );
  var Rl = "Default",
    Pl = (function () {
      try {
        return !!window.localStorage;
      } catch (t) {
        return !1;
      }
    })(),
    Ol = void 0,
    Nl = !0,
    Il = void 0,
    Dl = !1,
    zl = [],
    Bl = function t(e) {
      var n = this,
        i = e || {};
      (this.domElement = document.createElement("div")),
        (this.__ul = document.createElement("ul")),
        this.domElement.appendChild(this.__ul),
        pl.addClass(this.domElement, "dg"),
        (this.__folders = {}),
        (this.__controllers = []),
        (this.__rememberedObjects = []),
        (this.__rememberedObjectIndecesToControllers = []),
        (this.__listening = []),
        (i = Xc.defaults(i, {
          closeOnTop: !1,
          autoPlace: !0,
          width: t.DEFAULT_WIDTH,
        })),
        (i = Xc.defaults(i, { resizable: i.autoPlace, hideable: i.autoPlace })),
        Xc.isUndefined(i.load)
          ? (i.load = { preset: Rl })
          : i.preset && (i.load.preset = i.preset),
        Xc.isUndefined(i.parent) && i.hideable && zl.push(this),
        (i.resizable = Xc.isUndefined(i.parent) && i.resizable),
        i.autoPlace && Xc.isUndefined(i.scrollable) && (i.scrollable = !0);
      var r,
        o = Pl && "true" === localStorage.getItem(Vl(0, "isLocal")),
        s = void 0,
        a = void 0;
      if (
        (Object.defineProperties(this, {
          parent: {
            get: function () {
              return i.parent;
            },
          },
          scrollable: {
            get: function () {
              return i.scrollable;
            },
          },
          autoPlace: {
            get: function () {
              return i.autoPlace;
            },
          },
          closeOnTop: {
            get: function () {
              return i.closeOnTop;
            },
          },
          preset: {
            get: function () {
              return n.parent ? n.getRoot().preset : i.load.preset;
            },
            set: function (t) {
              n.parent ? (n.getRoot().preset = t) : (i.load.preset = t),
                (function (t) {
                  for (var e = 0; e < t.__preset_select.length; e++)
                    t.__preset_select[e].value === t.preset &&
                      (t.__preset_select.selectedIndex = e);
                })(this),
                n.revert();
            },
          },
          width: {
            get: function () {
              return i.width;
            },
            set: function (t) {
              (i.width = t), Yl(n, t);
            },
          },
          name: {
            get: function () {
              return i.name;
            },
            set: function (t) {
              (i.name = t), a && (a.innerHTML = i.name);
            },
          },
          closed: {
            get: function () {
              return i.closed;
            },
            set: function (e) {
              (i.closed = e),
                i.closed
                  ? pl.addClass(n.__ul, t.CLASS_CLOSED)
                  : pl.removeClass(n.__ul, t.CLASS_CLOSED),
                this.onResize(),
                n.__closeButton &&
                  (n.__closeButton.innerHTML = e ? t.TEXT_OPEN : t.TEXT_CLOSED);
            },
          },
          load: {
            get: function () {
              return i.load;
            },
          },
          useLocalStorage: {
            get: function () {
              return o;
            },
            set: function (t) {
              Pl &&
                ((o = t),
                t
                  ? pl.bind(window, "unload", s)
                  : pl.unbind(window, "unload", s),
                localStorage.setItem(Vl(0, "isLocal"), t));
            },
          },
        }),
        Xc.isUndefined(i.parent))
      ) {
        if (
          ((this.closed = i.closed || !1),
          pl.addClass(this.domElement, t.CLASS_MAIN),
          pl.makeSelectable(this.domElement, !1),
          Pl && o)
        ) {
          n.useLocalStorage = !0;
          var c = localStorage.getItem(Vl(0, "gui"));
          c && (i.load = JSON.parse(c));
        }
        (this.__closeButton = document.createElement("div")),
          (this.__closeButton.innerHTML = t.TEXT_CLOSED),
          pl.addClass(this.__closeButton, t.CLASS_CLOSE_BUTTON),
          i.closeOnTop
            ? (pl.addClass(this.__closeButton, t.CLASS_CLOSE_TOP),
              this.domElement.insertBefore(
                this.__closeButton,
                this.domElement.childNodes[0]
              ))
            : (pl.addClass(this.__closeButton, t.CLASS_CLOSE_BOTTOM),
              this.domElement.appendChild(this.__closeButton)),
          pl.bind(this.__closeButton, "click", function () {
            n.closed = !n.closed;
          });
      } else {
        void 0 === i.closed && (i.closed = !0);
        var l = document.createTextNode(i.name);
        pl.addClass(l, "controller-name"),
          (a = Ul(n, l)),
          pl.addClass(this.__ul, t.CLASS_CLOSED),
          pl.addClass(a, "title"),
          pl.bind(a, "click", function (t) {
            return t.preventDefault(), (n.closed = !n.closed), !1;
          }),
          i.closed || (this.closed = !1);
      }
      i.autoPlace &&
        (Xc.isUndefined(i.parent) &&
          (Nl &&
            ((Il = document.createElement("div")),
            pl.addClass(Il, "dg"),
            pl.addClass(Il, t.CLASS_AUTO_PLACE_CONTAINER),
            document.body.appendChild(Il),
            (Nl = !1)),
          Il.appendChild(this.domElement),
          pl.addClass(this.domElement, t.CLASS_AUTO_PLACE)),
        this.parent || Yl(n, i.width)),
        (this.__resizeHandler = function () {
          n.onResizeDebounced();
        }),
        pl.bind(window, "resize", this.__resizeHandler),
        pl.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
        pl.bind(this.__ul, "transitionend", this.__resizeHandler),
        pl.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
        this.onResize(),
        i.resizable && Xl(this),
        (s = function () {
          Pl &&
            "true" === localStorage.getItem(Vl(0, "isLocal")) &&
            localStorage.setItem(
              Vl(0, "gui"),
              JSON.stringify(n.getSaveObject())
            );
        }),
        (this.saveToLocalStorageIfPossible = s),
        i.parent ||
          (((r = n.getRoot()).width += 1),
          Xc.defer(function () {
            r.width -= 1;
          }));
    };
  function Ul(t, e, n) {
    var i = document.createElement("li");
    return (
      e && i.appendChild(e),
      n ? t.__ul.insertBefore(i, n) : t.__ul.appendChild(i),
      t.onResize(),
      i
    );
  }
  function Hl(t) {
    pl.unbind(window, "resize", t.__resizeHandler),
      t.saveToLocalStorageIfPossible &&
        pl.unbind(window, "unload", t.saveToLocalStorageIfPossible);
  }
  function Fl(t, e) {
    var n = t.__preset_select[t.__preset_select.selectedIndex];
    n.innerHTML = e ? n.value + "*" : n.value;
  }
  function kl(t, e) {
    var n = t.getRoot(),
      i = n.__rememberedObjects.indexOf(e.object);
    if (-1 !== i) {
      var r = n.__rememberedObjectIndecesToControllers[i];
      if (
        (void 0 === r &&
          ((r = {}), (n.__rememberedObjectIndecesToControllers[i] = r)),
        (r[e.property] = e),
        n.load && n.load.remembered)
      ) {
        var o = n.load.remembered,
          s = void 0;
        if (o[t.preset]) s = o[t.preset];
        else {
          if (!o.Default) return;
          s = o.Default;
        }
        if (s[i] && void 0 !== s[i][e.property]) {
          var a = s[i][e.property];
          (e.initialValue = a), e.setValue(a);
        }
      }
    }
  }
  function Gl(t, e, n, i) {
    if (void 0 === e[n])
      throw new Error('Object "' + e + '" has no property "' + n + '"');
    var r = void 0;
    if (i.color) r = new Ml(e, n);
    else {
      var o = [e, n].concat(i.factoryArgs);
      r = Al.apply(t, o);
    }
    i.before instanceof ll && (i.before = i.before.__li),
      kl(t, r),
      pl.addClass(r.domElement, "c");
    var s = document.createElement("span");
    pl.addClass(s, "property-name"), (s.innerHTML = r.property);
    var a = document.createElement("div");
    a.appendChild(s), a.appendChild(r.domElement);
    var c = Ul(t, a, i.before);
    return (
      pl.addClass(c, Bl.CLASS_CONTROLLER_ROW),
      r instanceof Ml
        ? pl.addClass(c, "color")
        : pl.addClass(c, tl(r.getValue())),
      (function (t, e, n) {
        if (
          ((n.__li = e),
          (n.__gui = t),
          Xc.extend(n, {
            options: function (e) {
              if (arguments.length > 1) {
                var i = n.__li.nextElementSibling;
                return (
                  n.remove(),
                  Gl(t, n.object, n.property, {
                    before: i,
                    factoryArgs: [Xc.toArray(arguments)],
                  })
                );
              }
              if (Xc.isArray(e) || Xc.isObject(e)) {
                var r = n.__li.nextElementSibling;
                return (
                  n.remove(),
                  Gl(t, n.object, n.property, { before: r, factoryArgs: [e] })
                );
              }
            },
            name: function (t) {
              return (
                (n.__li.firstElementChild.firstElementChild.innerHTML = t), n
              );
            },
            listen: function () {
              return n.__gui.listen(n), n;
            },
            remove: function () {
              return n.__gui.remove(n), n;
            },
          }),
          n instanceof bl)
        ) {
          var i = new _l(n.object, n.property, {
            min: n.__min,
            max: n.__max,
            step: n.__step,
          });
          Xc.each(
            [
              "updateDisplay",
              "onChange",
              "onFinishChange",
              "step",
              "min",
              "max",
            ],
            function (t) {
              var e = n[t],
                r = i[t];
              n[t] = i[t] = function () {
                var t = Array.prototype.slice.call(arguments);
                return r.apply(i, t), e.apply(n, t);
              };
            }
          ),
            pl.addClass(e, "has-slider"),
            n.domElement.insertBefore(
              i.domElement,
              n.domElement.firstElementChild
            );
        } else if (n instanceof _l) {
          var r = function (e) {
            if (Xc.isNumber(n.__min) && Xc.isNumber(n.__max)) {
              var i = n.__li.firstElementChild.firstElementChild.innerHTML,
                r = n.__gui.__listening.indexOf(n) > -1;
              n.remove();
              var o = Gl(t, n.object, n.property, {
                before: n.__li.nextElementSibling,
                factoryArgs: [n.__min, n.__max, n.__step],
              });
              return o.name(i), r && o.listen(), o;
            }
            return e;
          };
          (n.min = Xc.compose(r, n.min)), (n.max = Xc.compose(r, n.max));
        } else
          n instanceof fl
            ? (pl.bind(e, "click", function () {
                pl.fakeEvent(n.__checkbox, "click");
              }),
              pl.bind(n.__checkbox, "click", function (t) {
                t.stopPropagation();
              }))
            : n instanceof wl
            ? (pl.bind(e, "click", function () {
                pl.fakeEvent(n.__button, "click");
              }),
              pl.bind(e, "mouseover", function () {
                pl.addClass(n.__button, "hover");
              }),
              pl.bind(e, "mouseout", function () {
                pl.removeClass(n.__button, "hover");
              }))
            : n instanceof Ml &&
              (pl.addClass(e, "color"),
              (n.updateDisplay = Xc.compose(function (t) {
                return (e.style.borderLeftColor = n.__color.toString()), t;
              }, n.updateDisplay)),
              n.updateDisplay());
        n.setValue = Xc.compose(function (e) {
          return (
            t.getRoot().__preset_select &&
              n.isModified() &&
              Fl(t.getRoot(), !0),
            e
          );
        }, n.setValue);
      })(t, c, r),
      t.__controllers.push(r),
      r
    );
  }
  function Vl(t, e) {
    return document.location.href + "." + e;
  }
  function jl(t, e, n) {
    var i = document.createElement("option");
    (i.innerHTML = e),
      (i.value = e),
      t.__preset_select.appendChild(i),
      n && (t.__preset_select.selectedIndex = t.__preset_select.length - 1);
  }
  function Wl(t, e) {
    e.style.display = t.useLocalStorage ? "block" : "none";
  }
  function ql(t) {
    var e = (t.__save_row = document.createElement("li"));
    pl.addClass(t.domElement, "has-save"),
      t.__ul.insertBefore(e, t.__ul.firstChild),
      pl.addClass(e, "save-row");
    var n = document.createElement("span");
    (n.innerHTML = "&nbsp;"), pl.addClass(n, "button gears");
    var i = document.createElement("span");
    (i.innerHTML = "Save"), pl.addClass(i, "button"), pl.addClass(i, "save");
    var r = document.createElement("span");
    (r.innerHTML = "New"), pl.addClass(r, "button"), pl.addClass(r, "save-as");
    var o = document.createElement("span");
    (o.innerHTML = "Revert"),
      pl.addClass(o, "button"),
      pl.addClass(o, "revert");
    var s = (t.__preset_select = document.createElement("select"));
    if (
      (t.load && t.load.remembered
        ? Xc.each(t.load.remembered, function (e, n) {
            jl(t, n, n === t.preset);
          })
        : jl(t, Rl, !1),
      pl.bind(s, "change", function () {
        for (var e = 0; e < t.__preset_select.length; e++)
          t.__preset_select[e].innerHTML = t.__preset_select[e].value;
        t.preset = this.value;
      }),
      e.appendChild(s),
      e.appendChild(n),
      e.appendChild(i),
      e.appendChild(r),
      e.appendChild(o),
      Pl)
    ) {
      var a = document.getElementById("dg-local-explain"),
        c = document.getElementById("dg-local-storage");
      (document.getElementById("dg-save-locally").style.display = "block"),
        "true" === localStorage.getItem(Vl(0, "isLocal")) &&
          c.setAttribute("checked", "checked"),
        Wl(t, a),
        pl.bind(c, "change", function () {
          (t.useLocalStorage = !t.useLocalStorage), Wl(t, a);
        });
    }
    var l = document.getElementById("dg-new-constructor");
    pl.bind(l, "keydown", function (t) {
      !t.metaKey || (67 !== t.which && 67 !== t.keyCode) || Ol.hide();
    }),
      pl.bind(n, "click", function () {
        (l.innerHTML = JSON.stringify(t.getSaveObject(), void 0, 2)),
          Ol.show(),
          l.focus(),
          l.select();
      }),
      pl.bind(i, "click", function () {
        t.save();
      }),
      pl.bind(r, "click", function () {
        var e = prompt("Enter a new preset name.");
        e && t.saveAs(e);
      }),
      pl.bind(o, "click", function () {
        t.revert();
      });
  }
  function Xl(t) {
    var e = void 0;
    function n(n) {
      return (
        n.preventDefault(),
        (t.width += e - n.clientX),
        t.onResize(),
        (e = n.clientX),
        !1
      );
    }
    function i() {
      pl.removeClass(t.__closeButton, Bl.CLASS_DRAG),
        pl.unbind(window, "mousemove", n),
        pl.unbind(window, "mouseup", i);
    }
    function r(r) {
      return (
        r.preventDefault(),
        (e = r.clientX),
        pl.addClass(t.__closeButton, Bl.CLASS_DRAG),
        pl.bind(window, "mousemove", n),
        pl.bind(window, "mouseup", i),
        !1
      );
    }
    (t.__resize_handle = document.createElement("div")),
      Xc.extend(t.__resize_handle.style, {
        width: "6px",
        marginLeft: "-3px",
        height: "200px",
        cursor: "ew-resize",
        position: "absolute",
      }),
      pl.bind(t.__resize_handle, "mousedown", r),
      pl.bind(t.__closeButton, "mousedown", r),
      t.domElement.insertBefore(
        t.__resize_handle,
        t.domElement.firstElementChild
      );
  }
  function Yl(t, e) {
    (t.domElement.style.width = e + "px"),
      t.__save_row && t.autoPlace && (t.__save_row.style.width = e + "px"),
      t.__closeButton && (t.__closeButton.style.width = e + "px");
  }
  function Zl(t, e) {
    var n = {};
    return (
      Xc.each(t.__rememberedObjects, function (i, r) {
        var o = {},
          s = t.__rememberedObjectIndecesToControllers[r];
        Xc.each(s, function (t, n) {
          o[n] = e ? t.initialValue : t.getValue();
        }),
          (n[r] = o);
      }),
      n
    );
  }
  function Jl(t) {
    0 !== t.length &&
      Ll.call(window, function () {
        Jl(t);
      }),
      Xc.each(t, function (t) {
        t.updateDisplay();
      });
  }
  (Bl.toggleHide = function () {
    (Dl = !Dl),
      Xc.each(zl, function (t) {
        t.domElement.style.display = Dl ? "none" : "";
      });
  }),
    (Bl.CLASS_AUTO_PLACE = "a"),
    (Bl.CLASS_AUTO_PLACE_CONTAINER = "ac"),
    (Bl.CLASS_MAIN = "main"),
    (Bl.CLASS_CONTROLLER_ROW = "cr"),
    (Bl.CLASS_TOO_TALL = "taller-than-window"),
    (Bl.CLASS_CLOSED = "closed"),
    (Bl.CLASS_CLOSE_BUTTON = "close-button"),
    (Bl.CLASS_CLOSE_TOP = "close-top"),
    (Bl.CLASS_CLOSE_BOTTOM = "close-bottom"),
    (Bl.CLASS_DRAG = "drag"),
    (Bl.DEFAULT_WIDTH = 245),
    (Bl.TEXT_CLOSED = "Close Controls"),
    (Bl.TEXT_OPEN = "Open Controls"),
    (Bl._keydownHandler = function (t) {
      "text" === document.activeElement.type ||
        (72 !== t.which && 72 !== t.keyCode) ||
        Bl.toggleHide();
    }),
    pl.bind(window, "keydown", Bl._keydownHandler, !1),
    Xc.extend(Bl.prototype, {
      add: function (t, e) {
        return Gl(this, t, e, {
          factoryArgs: Array.prototype.slice.call(arguments, 2),
        });
      },
      addColor: function (t, e) {
        return Gl(this, t, e, { color: !0 });
      },
      remove: function (t) {
        this.__ul.removeChild(t.__li),
          this.__controllers.splice(this.__controllers.indexOf(t), 1);
        var e = this;
        Xc.defer(function () {
          e.onResize();
        });
      },
      destroy: function () {
        if (this.parent)
          throw new Error(
            "Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead."
          );
        this.autoPlace && Il.removeChild(this.domElement);
        var t = this;
        Xc.each(this.__folders, function (e) {
          t.removeFolder(e);
        }),
          pl.unbind(window, "keydown", Bl._keydownHandler, !1),
          Hl(this);
      },
      addFolder: function (t) {
        if (void 0 !== this.__folders[t])
          throw new Error(
            'You already have a folder in this GUI by the name "' + t + '"'
          );
        var e = { name: t, parent: this };
        (e.autoPlace = this.autoPlace),
          this.load &&
            this.load.folders &&
            this.load.folders[t] &&
            ((e.closed = this.load.folders[t].closed),
            (e.load = this.load.folders[t]));
        var n = new Bl(e);
        this.__folders[t] = n;
        var i = Ul(this, n.domElement);
        return pl.addClass(i, "folder"), n;
      },
      removeFolder: function (t) {
        this.__ul.removeChild(t.domElement.parentElement),
          delete this.__folders[t.name],
          this.load &&
            this.load.folders &&
            this.load.folders[t.name] &&
            delete this.load.folders[t.name],
          Hl(t);
        var e = this;
        Xc.each(t.__folders, function (e) {
          t.removeFolder(e);
        }),
          Xc.defer(function () {
            e.onResize();
          });
      },
      open: function () {
        this.closed = !1;
      },
      close: function () {
        this.closed = !0;
      },
      hide: function () {
        this.domElement.style.display = "none";
      },
      show: function () {
        this.domElement.style.display = "";
      },
      onResize: function () {
        var t = this.getRoot();
        if (t.scrollable) {
          var e = pl.getOffset(t.__ul).top,
            n = 0;
          Xc.each(t.__ul.childNodes, function (e) {
            (t.autoPlace && e === t.__save_row) || (n += pl.getHeight(e));
          }),
            window.innerHeight - e - 20 < n
              ? (pl.addClass(t.domElement, Bl.CLASS_TOO_TALL),
                (t.__ul.style.height = window.innerHeight - e - 20 + "px"))
              : (pl.removeClass(t.domElement, Bl.CLASS_TOO_TALL),
                (t.__ul.style.height = "auto"));
        }
        t.__resize_handle &&
          Xc.defer(function () {
            t.__resize_handle.style.height = t.__ul.offsetHeight + "px";
          }),
          t.__closeButton && (t.__closeButton.style.width = t.width + "px");
      },
      onResizeDebounced: Xc.debounce(function () {
        this.onResize();
      }, 50),
      remember: function () {
        if (
          (Xc.isUndefined(Ol) && ((Ol = new Cl()).domElement.innerHTML = Tl),
          this.parent)
        )
          throw new Error("You can only call remember on a top level GUI.");
        var t = this;
        Xc.each(Array.prototype.slice.call(arguments), function (e) {
          0 === t.__rememberedObjects.length && ql(t),
            -1 === t.__rememberedObjects.indexOf(e) &&
              t.__rememberedObjects.push(e);
        }),
          this.autoPlace && Yl(this, this.width);
      },
      getRoot: function () {
        for (var t = this; t.parent; ) t = t.parent;
        return t;
      },
      getSaveObject: function () {
        var t = this.load;
        return (
          (t.closed = this.closed),
          this.__rememberedObjects.length > 0 &&
            ((t.preset = this.preset),
            t.remembered || (t.remembered = {}),
            (t.remembered[this.preset] = Zl(this))),
          (t.folders = {}),
          Xc.each(this.__folders, function (e, n) {
            t.folders[n] = e.getSaveObject();
          }),
          t
        );
      },
      save: function () {
        this.load.remembered || (this.load.remembered = {}),
          (this.load.remembered[this.preset] = Zl(this)),
          Fl(this, !1),
          this.saveToLocalStorageIfPossible();
      },
      saveAs: function (t) {
        this.load.remembered ||
          ((this.load.remembered = {}),
          (this.load.remembered.Default = Zl(this, !0))),
          (this.load.remembered[t] = Zl(this)),
          (this.preset = t),
          jl(this, t, !0),
          this.saveToLocalStorageIfPossible();
      },
      revert: function (t) {
        Xc.each(
          this.__controllers,
          function (e) {
            this.getRoot().load.remembered
              ? kl(t || this.getRoot(), e)
              : e.setValue(e.initialValue),
              e.__onFinishChange && e.__onFinishChange.call(e, e.getValue());
          },
          this
        ),
          Xc.each(this.__folders, function (t) {
            t.revert(t);
          }),
          t || Fl(this.getRoot(), !1);
      },
      listen: function (t) {
        var e = 0 === this.__listening.length;
        this.__listening.push(t), e && Jl(this.__listening);
      },
      updateDisplay: function () {
        Xc.each(this.__controllers, function (t) {
          t.updateDisplay();
        }),
          Xc.each(this.__folders, function (t) {
            t.updateDisplay();
          });
      },
    });
  const Ql = new Bl(),
    Kl = { x: 0, y: 0 };
  window.addEventListener("mousemove", (t) => {
    (Kl.x = t.clientX / th.width - 0.5),
      (Kl.y = -(t.clientY / th.height - 0.5));
  });
  const $l = document.querySelector("canvas.webgl"),
    th = { width: window.innerWidth, height: window.innerHeight };
  window.addEventListener("resize", () => {
    (th.width = window.innerWidth),
      (th.height = window.innerHeight),
      (rh.aspect = th.width / th.height),
      rh.updateProjectionMatrix(),
      sh.setSize(th.width, th.height),
      sh.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }),
    window.addEventListener("dblclick", () => {
      document.fullscreenElement || document.webkitFullscreenElement
        ? document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullscreen && document.webkitExitFullscreen()
        : $l.requestFullscreen
        ? $l.requestFullscreen()
        : $l.webkitFullscreen && $l.webkitRequestFullscreen();
    });
  const eh = new oa().load("./textures/matcaps/2.png");
  new Qa().load("./fonts/helvetiker_regular.typeface.json", (t) => {
    const e = new bs("Manan Bari", {
        font: t,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: !0,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      }),
      n = new Ps({ matcap: eh });
    e.center();
    const i = new nn(e, n);
    nh.add(i), console.time();
    const r = new ws(0.3, 0.2, 20, 30);
    for (let t = 0; t < 500; t++) {
      const t = new nn(r, n);
      (t.position.x = 20 * (Math.random() - 0.5)),
        (t.position.y = 20 * (Math.random() - 0.5)),
        (t.position.z = 20 * (Math.random() - 0.5)),
        (t.rotation.x = Math.random() * Math.PI),
        (t.rotation.y = Math.random() * Math.PI);
      const e = Math.random();
      t.scale.set(e, e, e), nh.add(t);
    }
    Ql.add(i.position, "x").min(-10).max(10).step(1e-4).name("Position X"),
      Ql.add(i.position, "y").min(-10).max(10).step(1e-4).name("Position Y"),
      Ql.add(i.position, "z").min(-10).max(10).step(1e-4).name("Position Z"),
      Ql.add(i.scale, "x").min(-10).max(10).step(1e-4).name("Scale X"),
      Ql.add(i.scale, "y").min(-10).max(10).step(1e-4).name("Scale Y"),
      Ql.add(i.scale, "z").min(-10).max(10).step(1e-4).name("Scale Z"),
      Ql.add(i.rotation, "x").min(-10).max(10).step(1e-4).name("rotation X"),
      Ql.add(i.rotation, "y").min(-10).max(10).step(1e-4).name("rotation Y"),
      Ql.add(i.rotation, "z").min(-10).max(10).step(1e-4).name("rotation Z"),
      console.timeEnd();
  });
  const nh = new Cr(),
    ih = new (class extends Mo {
      constructor(t = 1) {
        const e = [0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t],
          n = new Ue();
        n.setAttribute("position", new Ee(e, 3)),
          n.setAttribute(
            "color",
            new Ee(
              [1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1],
              3
            )
          ),
          super(n, new fo({ vertexColors: !0, toneMapped: !1 })),
          (this.type = "AxesHelper");
      }
    })(20);
  nh.add(ih);
  const rh = new dn(75, th.width / th.height);
  (rh.position.z = 2), nh.add(rh);
  const oh = new Gc(rh, $l);
  oh.enableDamping = !0;
  const sh = new Ar({ canvas: $l });
  sh.setSize(th.width, th.height),
    sh.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const ah = new (class {
      constructor(t) {
        (this.autoStart = void 0 === t || t),
          (this.startTime = 0),
          (this.oldTime = 0),
          (this.elapsedTime = 0),
          (this.running = !1);
      }
      start() {
        (this.startTime = rc()),
          (this.oldTime = this.startTime),
          (this.elapsedTime = 0),
          (this.running = !0);
      }
      stop() {
        this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
      }
      getElapsedTime() {
        return this.getDelta(), this.elapsedTime;
      }
      getDelta() {
        let t = 0;
        if (this.autoStart && !this.running) return this.start(), 0;
        if (this.running) {
          const e = rc();
          (t = (e - this.oldTime) / 1e3),
            (this.oldTime = e),
            (this.elapsedTime += t);
        }
        return t;
      }
    })(),
    ch = () => {
      ah.getElapsedTime(),
        oh.update(),
        sh.render(nh, rh),
        window.requestAnimationFrame(ch);
    };
  ch();
})();
//# sourceMappingURL=bundle.53328038ee0649d31596.js.map
