//<![CDATA[
	(function(){
	
		const category_chara = '🅲';
		const labels = document.getElementsByClassName('article-label');
		let label = null;
		for( const l of labels ){
			if(l.innerText.startsWith(category_chara)){
				label = l;
				break;
			}
		}
		if(!label) return;
		const label_container = document.getElementById('category-crumb');
		label_container.href = label.href;
		label_container.setAttribute('itemid', label.href);
		label_container.children[0].innerText = label.innerText.slice(category_chara.length);
	
	})();
//]]>