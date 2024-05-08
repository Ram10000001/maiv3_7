var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pregunta = /** @class */ (function () {
    //fuente: string;
    function Pregunta(tipo, enunciado, instrucciones) {
        this.tipo = tipo;
        this.enunciado = enunciado;
        this.instrucciones = instrucciones;
        //this.fuente = fuente;
    }
    return Pregunta;
}());
var OpcionMultiple = /** @class */ (function (_super) {
    __extends(OpcionMultiple, _super);
    function OpcionMultiple(enunciado, instrucciones, opciones, respuesta_correcta) {
        var _this = _super.call(this, 'opcion_multiple', enunciado, instrucciones) || this;
        _this.opciones = opciones;
        _this.respuesta_correcta = respuesta_correcta;
        return _this;
    }
    OpcionMultiple.prototype.getRespuestaCorrecta = function () {
        return this.respuesta_correcta;
    };
    return OpcionMultiple;
}(Pregunta));
var SeleccionMultiple = /** @class */ (function (_super) {
    __extends(SeleccionMultiple, _super);
    function SeleccionMultiple(enunciado, instrucciones, opciones, respuestas_correctas) {
        var _this = _super.call(this, 'seleccion_multiple', enunciado, instrucciones) || this;
        _this.opciones = opciones;
        _this.respuestas_correctas = respuestas_correctas;
        return _this;
    }
    SeleccionMultiple.prototype.getRespuestaCorrecta = function () {
        return this.respuestas_correctas[0];
    };
    SeleccionMultiple.prototype.getRespuestasCorrectas = function () {
        return this.respuestas_correctas;
    };
    return SeleccionMultiple;
}(Pregunta));
var VerdaderoFalso = /** @class */ (function (_super) {
    __extends(VerdaderoFalso, _super);
    function VerdaderoFalso(enunciado, instrucciones, respuesta_correcta) {
        var _this = _super.call(this, 'verdadero_falso', enunciado, instrucciones) || this;
        _this.respuesta_correcta = respuesta_correcta;
        return _this;
    }
    VerdaderoFalso.prototype.getRespuestaCorrecta = function () {
        return this.respuesta_correcta;
    };
    return VerdaderoFalso;
}(Pregunta));
var RespuestaCorta = /** @class */ (function (_super) {
    __extends(RespuestaCorta, _super);
    function RespuestaCorta(enunciado, instrucciones, respuesta_correcta) {
        var _this = _super.call(this, 'respuesta_corta', enunciado, instrucciones) || this;
        _this.respuesta_correcta = respuesta_correcta;
        return _this;
    }
    RespuestaCorta.prototype.getRespuestaCorrecta = function () {
        return this.respuesta_correcta;
    };
    return RespuestaCorta;
}(Pregunta));
var Emparejamiento = /** @class */ (function (_super) {
    __extends(Emparejamiento, _super);
    function Emparejamiento(enunciado, instrucciones, pares) {
        var _this = _super.call(this, 'emparejamiento', enunciado, instrucciones) || this;
        _this.pares = pares;
        return _this;
    }
    Emparejamiento.prototype.getRespuestaCorrecta = function () {
        return this.pares;
    };
    return Emparejamiento;
}(Pregunta));
var RespuestaNumerica = /** @class */ (function (_super) {
    __extends(RespuestaNumerica, _super);
    function RespuestaNumerica(enunciado, instrucciones, respuesta_correcta) {
        var _this = _super.call(this, 'respuesta_numerica', enunciado, instrucciones) || this;
        _this.respuesta_correcta = respuesta_correcta;
        return _this;
    }
    RespuestaNumerica.prototype.getRespuestaCorrecta = function () {
        return this.respuesta_correcta;
    };
    return RespuestaNumerica;
}(Pregunta));
var RespuestaLarga = /** @class */ (function (_super) {
    __extends(RespuestaLarga, _super);
    function RespuestaLarga(enunciado, instrucciones) {
        return _super.call(this, 'respuesta_larga', enunciado, instrucciones) || this;
    }
    RespuestaLarga.prototype.getRespuestaCorrecta = function () {
        return null; // Las preguntas de respuesta larga no tienen una única respuesta correcta
    };
    return RespuestaLarga;
}(Pregunta));
var RellenarEspacios = /** @class */ (function (_super) {
    __extends(RellenarEspacios, _super);
    function RellenarEspacios(enunciado, instrucciones, respuesta_correcta) {
        var _this = _super.call(this, 'rellenar_espacios', enunciado, instrucciones) || this;
        _this.respuesta_correcta = respuesta_correcta;
        return _this;
    }
    RellenarEspacios.prototype.getRespuestaCorrecta = function () {
        return this.respuesta_correcta;
    };
    return RellenarEspacios;
}(Pregunta));
var Examen = /** @class */ (function () {
    function Examen(titulo, descripcion, preguntas) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.preguntas = preguntas;
    }
    return Examen;
}());
function crearPreguntaJson(preguntaJson) {
    switch (preguntaJson.tipo) {
        case 'opcion_multiple':
            return new OpcionMultiple(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.opciones, preguntaJson.respuesta_correcta);
        case 'verdadero_falso':
            return new VerdaderoFalso(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.respuesta_correcta);
        case 'respuesta_corta':
            return new RespuestaCorta(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.respuesta_correcta);
        case 'respuesta_numerica':
            return new RespuestaNumerica(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.respuesta_correcta);
        case 'respuesta_larga':
            return new RespuestaLarga(preguntaJson.enunciado, preguntaJson.instrucciones);
        case 'rellenar_espacios':
            return new RellenarEspacios(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.respuesta_correcta);
        case 'emparejamiento':
            return new Emparejamiento(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.pares);
        case 'seleccion_multiple':
            return new SeleccionMultiple(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.opciones, preguntaJson.respuestas_correctas);
        default:
            console.warn("Tipo de pregunta no reconocido: ".concat(preguntaJson.tipo));
            return new RespuestaCorta(preguntaJson.enunciado, preguntaJson.instrucciones, preguntaJson.respuesta_correcta);
    }
}
export function crearExamenJson(examenJson) {
    var preguntas = examenJson.preguntas.map(crearPreguntaJson);
    return new Examen(examenJson.titulo, examenJson.descripcion, preguntas);
}
