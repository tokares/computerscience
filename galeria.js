function Galeria(id, zdjecia, css, ochrona, zaladuj)
{
	this.kolumny = 3;
	this.naStronie = 6;
	
	
	this.id = id;
	this.zdjecia = zdjecia;
	this.ochrona = typeof ochrona != 'undefined' ? ochrona : false;
	this.css = css;
	
	if (typeof zaladuj != 'undefined' && zaladuj)
	{
		for (var i = 0; i < this.zdjecia.length; i++)
		{
			new Image().src = this.zdjecia[i][0];
		}
	}
	
	this.wyswietl = function(strona)
	{
		if (typeof strona == 'undefined') strona = 1;
		var html = '';
		
		for (var i = start_ = (strona - 1) * this.naStronie, stop_ = Math.min(start_ + this.naStronie, this.zdjecia.length); i < stop_; i++)
		{
			if (i > start_ && !(i % this.kolumny)) html += '</tr><tr>';
			html +=
				'<td>' +
					'<a href="' + (this.ochrona ? 'javascript:void(0)' : this.zdjecia[i][1]) + '" onclick="return !' + this.id + '.pokaz(' + i + ')" onkeypress="return !' + this.id + '.pokaz(' + i + ')"><img src="' + this.zdjecia[i][0] + '" alt=""' + (this.ochrona ? ' onmousedown="return false" oncontextmenu="return false" onselectstart="return false" onselect="return false" oncopy="return false" ondragstart="return false" ondrag="return false" galleryimg="no"' : '') + '></a>' +
					(typeof this.zdjecia[i][2] != 'undefined' ? '<div>' + this.zdjecia[i][2] + '</div>' : '') +
				'</td>';
		}
		if (html) html = '<table><tr>' + html + '</tr></table>';
		
		if (this.zdjecia.length > this.naStronie)
		{
			html += '<div class="stronicowanie">';
			if (strona > 1) html += '<a href="javascript:void(0)" onclick="' + this.id + '.wyswietl(' + (strona - 1) + '); return false" onkeypress="' + this.id + '.wyswietl(' + (strona - 1) + '); return false">&laquo;</a>';
			for (var i = 1, stop_ = Math.ceil(this.zdjecia.length / this.naStronie); i <= stop_; i++)
			{
				html += ' ' + (i == strona ? i : '<a href="javascript:void(0)" onclick="' + this.id + '.wyswietl(' + i + '); return false" onkeypress="' + this.id + '.wyswietl(' + i + '); return false">' + i + '</a>');
			}
			if (strona < stop_) html += ' <a href="javascript:void(0)" onclick="' + this.id + '.wyswietl(' + (strona + 1) + '); return false" onkeypress="' + this.id + '.wyswietl(' + (strona + 1) + '); return false">&raquo;</a>';
			html += '</div>';
		}
		
		document.getElementById(this.id).innerHTML = '<div class="galeria">' + html + '</div>';
	}
	
	this._pokaz = function(i)
	{
		var numer = (i + 1) + '/' + this.zdjecia.length;
		if (this.zdjecia.length < 2) var stronicowanie = '';
		else
		{
			var stronicowanie =
				'<div class="stronicowanie" style="white-space: nowrap">' +
					(i > 0 ? '<a href="javascript:void(0)" onclick="setTimeout(\'document.write(window.opener.' + this.id + '._pokaz(' + (i - 1) + ')); document.close(); document.close()\', 1); return false" onkeypress="setTimeout(\'document.write(window.opener.' + this.id + '._pokaz(' + (i - 1) + ')); document.close(); document.close()\', 1); return false">&laquo;&nbsp;Wstecz</a>&nbsp;&nbsp;&nbsp;' : '') +
					numer +
					(i < this.zdjecia.length - 1 ? '&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="setTimeout(\'document.write(window.opener.' + this.id + '._pokaz(' + (i + 1) + ')); document.close()\', 1); return false" onkeypress="setTimeout(\'document.write(window.opener.' + this.id + '._pokaz(' + (i + 1) + ')); document.close()\', 1); return false">Dalej&nbsp;&raquo;</a>' : '') +
				'</div>';
		}
		
		var html =
			'<html>' +
				'<head>' +
					'<title>' + (typeof this.zdjecia[i][2] != 'undefined' ? this.zdjecia[i][2].replace(/<[^>]+>/g, '') + (numer ? ' (' + numer + ')' : '') : numer) + '</title>' +
					(typeof this.css != 'undefined' && this.css ? '<link rel="stylesheet" href="' + this.css + '">' : '') +
					'<'+'script>' +
					'function dopasuj() { window.resizeTo(Math.min(screen.availWidth, Math.max(document.getElementById(\'img\').width + 50, document.getElementById(\'body\').offsetWidth)), Math.min(screen.availHeight, document.getElementById(\'body\').offsetHeight + 80)); }' +
					(this.ochrona ? 'window.onblur = function() { if (document.getElementById(\'body\')) document.getElementById(\'body\').style.visibility = \'hidden\'; try { clipboardData.clearData(); } catch (e) {} }; window.onfocus = function () { if (document.getElementById(\'body\')) document.getElementById(\'body\').style.visibility = \'visible\'; };'  : '') +
					'<'+'/script>' +
				'</head>' +
				'<body style="margin: 0; padding: 0" onload="dopasuj(); dopasuj()"' + (this.ochrona ? ' oncontextmenu="return false" onbeforeprint="document.getElementsByTagName(\'body\')[0].style.visibility = \'hidden\'; window.alert(\'Wydruk jest niedostępny!\')" onafterprint="document.getElementsByTagName(\'body\')[0].style.visibility = \'visible\'"' : '') + '>' +
					'<div id="body">' +
						'<div id="zdjecie">' +
							(typeof this.zdjecia[i][2] != 'undefined' || numer ? '<h1>' + (typeof this.zdjecia[i][2] != 'undefined' ? this.zdjecia[i][2] : numer) + '</h1>' : '') +
							'<div style="text-align: center"><img id="img" src="' + this.zdjecia[i][1] + '" alt=""' + (this.ochrona ? ' onmousedown="return false" oncontextmenu="return false" onselectstart="return false" onselect="return false" oncopy="return false" ondragstart="return false" ondrag="return false" galleryimg="no"' : '') + '></div>' +
							(typeof this.zdjecia[i][3] != 'undefined' ? '<div>' + this.zdjecia[i][3] + '</div>' : '') +
							stronicowanie +
						'</div>' +
					'</div>' +
				'</body>' +
			'</html>';
		
		return html;
	}
	
	this.pokaz = function(i)
	{
		try { Galeria.okno.close() } catch (e) {}
		Galeria.okno = window.open('', this.id, 'menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,width=400,height=400');
		if (!Galeria.okno) return false;
		
		Galeria.okno.document.close();
		Galeria.okno.document.write(this._pokaz(i));
		Galeria.okno.document.close();
		Galeria.okno.focus();
		
		return true;
	}
	
	document.write('<div id="' + this.id + '"></div>');
	this.wyswietl();
}
 
Galeria.okno = null;
