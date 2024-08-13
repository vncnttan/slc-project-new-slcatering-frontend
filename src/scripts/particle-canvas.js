// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use strict";

export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static diff(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    mult(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    setValue(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const magnitudeVal = this.magnitude();
        return this.x /= Math.abs(magnitudeVal), this.y /= Math.abs(magnitudeVal), this;
    }

    truncate(maxValue) {
        return this.magnitude() > maxValue && (this.normalize(), this.mult(maxValue)), this;
    }

    get key() {
        return Math.floor(this.x) + "|" + Math.floor(this.y);
    }
}

export class Particle {
    constructor(position, mousePosition, ub, particleMap, chunkSize) {
        this.position = position, this.mousePosition = mousePosition, this.ub = ub, this.particleMap = particleMap, this.chunkSize = chunkSize, this.radius = 1, this.radiusLb = this.radius + 1, this.radiusUb = 2 * (this.radius + 1), this.maxSpeed = .25 * Math.random(), this.maxForce = .01, this.velocity = new Vector(20 * Math.random() - 10, 20 * Math.random() - 10), this.acceleration = new Vector(0, 0), this.deleteLineDataQueue = [], this.drawedLines = {};
    }

    update() {
        return this.velocity.add(this.acceleration), this.velocity.truncate(this.maxSpeed), this.position.add(this.velocity), this.acceleration.mult(0), this.position.x > this.ub.x ? this.position.x = 0 : this.position.x < 0 && (this.position.x = this.ub.x), this.position.y > this.ub.y ? this.position.y = 0 : this.position.y < 0 && (this.position.y = this.ub.y), this;
    }

    clear(ctx) {
        ctx.clearRect(this.position.x - this.radiusLb, this.position.y - this.radiusLb, this.radiusUb, this.radiusUb), this.deleteLineDataQueue.splice(0, this.deleteLineDataQueue.length).forEach(function (data) {
            if (ctx.save(), ctx.translate(data.x, data.y), ctx.rotate(data.degInRad), ctx.clearRect(0, -2, data.mag, 4), ctx.restore(), data.end) for (var key in data.end.drawedLines[data.positionKey]) delete data.end.drawedLines[data.positionKey][key];
        });
    }

    draw(ctx) {
        let mag = Vector.diff(this.mousePosition, this.position).magnitude();
        mag < 150 ? (ctx.strokeStyle = "rgba(255, 255, 255, " + (150 - mag) / 300 + ")", this.drawLine(ctx, this.position, this.mousePosition), ctx.fillStyle = "rgba(255, 255, 255, " + (.5 + (150 - mag) / 300) + ")") : ctx.fillStyle = "rgba(250, 250, 250, 0.5)";
        for (var row = Math.floor(this.position.y / this.chunkSize.y), col = Math.floor(this.position.x / this.chunkSize.x), i = Math.max(row - 1, 0); i <= row + 1; i++) if (this.particleMap[i]) for (var j = Math.max(col - 1, 0); j <= col + 1; j++) this.particleMap[i][j] && 0 != this.particleMap[i][j].length && this.particleMap[i][j].forEach(particle => {
            if (particle.position !== this.position && 1 !== this.drawedLines[particle.position.key]) {
                let mag = Vector.diff(particle.position, this.position).magnitude();
                mag < this.chunkSize.x && (ctx.strokeStyle = "rgba(255, 255, 255, " + (this.chunkSize.x - mag) / this.chunkSize.x + ")", particle.drawedLines[this.position.key] = !0, this.drawLine(ctx, this.position, particle.position), this.deleteLineDataQueue[this.deleteLineDataQueue.length - 1].end = particle, this.deleteLineDataQueue[this.deleteLineDataQueue.length - 1].positionKey = this.position.key);
            }
        });
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawLine(ctx, start, end) {
        const degInRad = this._getDegInRad(start, end), mag = Vector.diff(end, start).magnitude();
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        this.deleteLineDataQueue.push({
            degInRad: degInRad,
            x: start.x,
            y: start.y,
            mag: mag
        });
    }

    _getDegInRad(v1, v2) {
        let deg = Math.atan((v2.y - v1.y) / (v2.x - v1.x));
        v2.x < v1.x && (deg += Math.PI)
        return deg;
    }

    moveTo(targetPosition) {
        const desired = Vector.diff(targetPosition, this.position);
        desired.normalize().mult(this.maxSpeed);
        const steer = Vector.diff(desired, this.velocity);
        steer.truncate(this.maxForce);
        this.acceleration.add(steer);
    }
}

export class ParticleCanvas {
    constructor(canvas, mousePosition) {
        this.mousePosition = mousePosition;
        this.context = canvas.getContext("2d");
        this.canvasSize = new Vector(canvas.width, canvas.height);
        this.chunkSize = new Vector(100, 100);
        this.particleList = [];
        this.particleChunkMap = [];
    }

    get totalParticle() {
        return this.canvasSize.x * this.canvasSize.y / 10000;
    }

    getRandomPosition() {
        return new Vector(Math.random() * this.canvasSize.x, Math.random() * this.canvasSize.y);
    }

    init() {
        for (let i = 0; i < this.totalParticle; i++) this.particleList.push(new Particle(this.getRandomPosition(), this.mousePosition, this.canvasSize, this.particleChunkMap, this.chunkSize));
        let totalRow = this.canvasSize.y / this.chunkSize.y, totalCol = this.canvasSize.x / this.chunkSize.x, row = 0;
        for (; row < totalRow; row++) {
            this.particleChunkMap[row] = [];
            for (let col = 0; col < totalCol; col++) this.particleChunkMap[row][col] = [];
        }
    }

    clearChunkMap() {
        this.particleChunkMap.forEach(function (row) {
            row.forEach(function (chunk) {
                chunk.splice(0, chunk.length);
            });
        });
    }

    setParticleInChunk() {
        const particleChunkMap = this.particleChunkMap, chunkSize = this.chunkSize;
        this.particleList.forEach(function (particle) {
            const row = Math.floor(particle.position.y / chunkSize.y),
                col = Math.floor(particle.position.x / chunkSize.x);
            particleChunkMap[row][col].push(particle);
        });
    }

    draw() {
        const ctx = this.context;
        this.clearChunkMap();
        this.setParticleInChunk();
        this.particleList.forEach(function (particle) {
            particle.clear(ctx);
        });
        this.particleList.forEach(function (particle) {
            particle.update(ctx);
        });
        this.particleList.forEach(function (particle) {
            particle.draw(ctx);
        });
        requestAnimationFrame(this.draw.bind(this));
    }
}

performance.now();

