(function (_) {
	_.$ = _.getElementById;
	// arreglos para usar en el algoritmo
	var cocientes = new Array(1),
			divisores = [],
			residuos = [],
			resultado;

	//definicion de variables para el dom
	var btn,input1,input2,cocientesDiv,divisoresDiv,residuosDiv,textResultado;

	$(function () {
		//asignacion de variables con los objetos del dom
		btn = _.$('btn');
		resultado = _.$('resultado');
		input1 = _.$('val1');
		input2 = _.$('val2');
		cocientesDiv = _.$('cocientes');
		divisoresDiv = _.$('divisores');
		residuosDiv = _.$('residuos');

		//asginacion de evento click al boton
		btn.addEventListener('click',calcular);

	});
	function limpiar(cb) {
		cocientes = new Array(1),
		divisores = [],
		residuos = [],
		resultado;
		active(true,function () {
			console.log('termino ');
			$('.row-g').empty();
			cb();
		});
	}
	//funcion al realizar un click
	function calcular(evt) {
		evt.preventDefault();
		limpiar(function () {
			var val1 = Number(input1.value),
					val2 = Number(input2.value);
			if(val1 === 0 || val2 === 0 || isNaN(val1) || isNaN(val2)) return Materialize.toast('Ingrese los dos valores', 4000);

			divisores.push(val1);
			divisores.push(val2);
			reDiv(val1,val2,fin);
		});
	}
	function reDiv(dividendo,divisor,cb) {
		var residuo = dividendo % divisor;
		var cociente = Math.floor(dividendo / divisor);

		residuos.push(residuo);
		cocientes.push(cociente);
		if(residuo === 0 ){
			return cb(divisor);
		}else{
			divisores.push(residuo);
			return reDiv(divisor,residuo,cb);
		}
	}
	function fin(result) {
		var width = divisores.length * 100;
		$('.row-g').width(width + 'px');

		for(var i in divisores){
			$(divisoresDiv).append($('<div class="cell card"/>').text(divisores[i]));
			$(cocientesDiv).append($('<div class="cell card"/>').text(cocientes[i]));
			$(residuosDiv).append($('<div class="cell card"/>').text(residuos[i]));
		}
		active();
	}
	function timeout(el,time,remove,divisor) {
		setTimeout(function () {
				if(remove){
					$(el).removeClass('active');
				}else{
					if(divisor){
						resultado.textContent = el.textContent;
					}
					$(el).addClass('active');
				}
		}, time);
	}
	function active(reverse,cb) {
		var diff =  100,
				inicio = 0;

		var temp1 = /*reverse? $(residuosDiv).children().reverse() :*/ $(cocientesDiv).children();
		var temp2 = /*reverse? $(divisoresDiv).children().reverse() :*/ $(divisoresDiv).children();
		var temp3 = /*reverse? $(cocientesDiv).children().reverse() :*/ $(residuosDiv).children();
		if(temp1.length == 0) return cb();

		temp1.each(function (i) {
			timeout(temp1[i], inicio,reverse,undefined);
			timeout(temp2[i], inicio + diff,reverse,true);
			timeout(temp3[i], inicio + diff + diff,reverse);
			inicio += diff;
			if(i == temp1.length-1){
				if(cb){
					setTimeout(function () {
						cb();
					}, diff * (temp1.length + 4));
				}
			}
		});
	}
})(document);
