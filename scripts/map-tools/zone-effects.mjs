export default class VessayaZoneEffects extends AbstractBaseFilter {

	static defaultUniforms = {
		outlineColor: [ 0.6, 1, 0.6, 0.8 ],
		thickness: [ 5, 5 ]
	}

	static vertexShader = `
		attribute vec2 aVertexPosition;
		
		uniform mat3 projectionMatrix;
		uniform vec2 screenDimensions;
		uniform vec4 inputSize;
		uniform vec4 outputFrame;
		
		varying vec2 vTextureCoord;
		varying vec2 vFilterCoord;
		
		vec4 filterVertexPosition( void ) {
			vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
			return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0., 1.);
		}
		
		// getting normalized coord for the tile texture
		vec2 filterTextureCoord( void ) {
			return aVertexPosition * (outputFrame.zw * inputSize.zw);
		}
		
		// getting normalized coord for a screen sized mask render texture
		vec2 filterCoord( in vec2 textureCoord ) {
			return textureCoord * inputSize.xy / outputFrame.zw;
		}
		
		void main() {
			vTextureCoord = filterTextureCoord();
			vFilterCoord = filterCoord(vTextureCoord);
			gl_Position = filterVertexPosition();
		}`

	static createFragmentShader() {
		return `
		varying vec2 vTextureCoord;
		varying vec2 vFilterCoord;
		uniform sampler2D uSampler;
		
		uniform vec2 thickness;
		uniform vec4 outlineColor;
		uniform vec4 filterClamp;
		uniform float time;

		${this.CONSTANTS}
		
		void main(void) {
			float dist = distance(vFilterCoord, vec2(0.5)) * 2.0;
			vec4 ownColor = texture2D(uSampler, vTextureCoord);
			vec4 wColor = outlineColor * 0.15;
			float texAlpha = smoothstep(0.0, 1.0, ownColor.a);
			vec4 curColor;
			float maxAlpha = 0.;
			vec2 displaced;
			for ( float angle = 0.0; angle <= TWOPI; angle += ${this.#quality.toFixed(7)} ) {
				displaced.x = vTextureCoord.x + thickness.x * cos(angle);
				displaced.y = vTextureCoord.y + thickness.y * sin(angle);
				curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));
				curColor.a = clamp((curColor.a - 0.6) * 2.5, 0.0, 1.0);
				maxAlpha = max(maxAlpha, curColor.a);
			}
			float resultAlpha = max(maxAlpha, texAlpha);
			vec3 result = outlineColor.rgb * (1.0 - texAlpha) * resultAlpha;
			gl_FragColor = mix(vec4(result, resultAlpha), wColor, texAlpha);
		}
		`
	}

	static get #quality() {
		switch (canvas.performance.mode) {
			case CONST.CANVAS_PERFORMANCE_MODES.LOW:
				return (Math.PI * 2) / 10
			case CONST.CANVAS_PERFORMANCE_MODES.MED:
				return (Math.PI * 2) / 20
			default:
				return (Math.PI * 2) / 30
		}
	}

	get thickness() {
		return this.#thickness
	}

	set thickness(value) {
		this.#thickness = value
		this.padding = value
	}

	#thickness = 1.2

	static create(uniforms = {}) {
		uniforms = {
			...this.defaultUniforms,
			...uniforms
		}
		return new this(this.vertexShader, this.createFragmentShader(), uniforms)
	}

	apply(filterManager, input, output, clear) {
		let time = 0
		let thickness = Math.max(2, this.#thickness * canvas.stage.scale.x)
		if (!canvas.photosensitiveMode) {
			time = canvas.app.ticker.lastTime
			thickness *= Math.oscillation(0.8, 1.2, time, 2000)
		}
		this.uniforms.time = time
		this.uniforms.thickness[0] = thickness / input._frame.width
		this.uniforms.thickness[1] = thickness / input._frame.height

		filterManager.applyFilter(this, input, output, clear)
	}

}
