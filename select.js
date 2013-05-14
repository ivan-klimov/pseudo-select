(function() {


function Select(opt) {
	var select = document.getElementById(opt.selectId),
			currentClass = opt.currentClass,
			optionsClass = opt.optionsClass,
			optionClass = opt.optionClass,
			subscribe = opt.subscribe,
			container = opt.container,
			oncomplete = opt.oncomplete || '',
			self = this;

	select.onclick = onSelectClick;
	select.onmousedown = select.onselectstart = function() {
		return false;
	}


	function onSelectClick(e) {
		handler(e, this);
	}

	function handler(e, _this) {
		e = e || window.event;

		var target = e.target || e.srcElement;

		if (target.className == currentClass) toggle(target, _this);
		if (target.className == optionClass) changeValue(target, _this);
	}



	function toggle(trg, select) {
		if (hasClass(select, 'select_show')) return;
		close();
		open(trg, select);
	}



	function changeValue(trg, _this) {
		var elements = _this.getElementsByTagName('div');

		for (var i=0; i<elements.length; i++) {
			if (elements[i].className != currentClass) continue;
			elements[i].innerHTML = trg.innerHTML;
			close();
			
			if (oncomplete && typeof oncomplete == 'function') oncomplete();
		}
	}




	function open(trg, select) {
		addClass(select, 'select_show');

		function event() {
			addEvent(document, 'click', hideAllSelects);
		}

		setTimeout(event,0);
	}



	function close() {
		var elements = container.getElementsByTagName('div');

		for (var i=0; i<elements.length; i++) {
			if (!hasClass(elements[i], 'select_show')) continue;
				delClass(elements[i], 'select_show');
		}

		removeEvent(document, 'click', hideAllSelects);
	}




	function addClass(elem, cls) {
		var tmp = elem.className ? elem.className.split(' ') : [];

		for (var i=0; i<tmp.length; i++) {
			if (tmp[i] == cls) return;
		}

		tmp.push(cls);
		elem.className = tmp.join(' ');
	}




	function delClass(elem, cls) {
		var tmp = elem.className ? elem.className.split(' ') : [];

		for (var i=0; i<tmp.length; i++) {
			if (tmp[i] != cls) continue;
			tmp.splice(i,1);
			i--;
		}

		elem.className = tmp.join(' ');
	}




	function hasClass(elem, cls) {
		var tmp = elem.className ? elem.className.split(' ') : [];

		for (var i=0; i<tmp.length; i++) {
			if (tmp[i] == cls) return true;
		}

		return false;
	}



	function hideAllSelects(e) {
		e = e || window.event;

		var target = e.target || e.srcElement;
		
		if (target.className == currentClass) return;
		close();
	}


	var addEvent, removeEvent;

	if (document.addEventListener) { // проверка существования метода
	  addEvent = function(elem, type, handler) {
	    elem.addEventListener(type, handler, false);
	  };
	  removeEvent = function(elem, type, handler) {
	    elem.removeEventListener(type, handler, false);
	  };
	} else {
	  addEvent = function(elem, type, handler) {
	    elem.attachEvent("on" + type, handler);
	  };
	  removeEvent = function(elem, type, handler) {
	    elem.detachEvent("on" + type, handler);
	  };
	}

}



var select = new Select({
	selectId: 'select',
	currentClass: 'select__current',
	optionsClass: 'select__items',
	optionClass: 'select__item',
	oncomplete: function() {
		var e = event || window.event,
				target = e.target || e.srcElement;

		alert(target.innerHTML);
	},
	container: document
});


var select2 = new Select({
	selectId: 'select2',
	currentClass: 'select__current',
	optionsClass: 'select__items',
	optionClass: 'select__item',
	container: document
});



})();


