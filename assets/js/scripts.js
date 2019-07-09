document.addEventListener('DOMContentLoaded',()=>{
	let leftNav_li = document.querySelector('.toggle-left');
	leftNav_li.addEventListener('click',()=>{
		leftNav_li.children[1].classList.toggle("active");
	});
	document.addEventListener('click', (event) => {
	  if (!event.target.matches('.toggle-left')) {
	    console.log(event.target.matches('.toggle-left'));

	    let dropdowns = document.querySelector(".toggle-left");
	    let i;
	    for (i = 0; i < dropdowns.length; i++) {
	      let openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('active')) {
	        openDropdown.classList.remove('active');
	      }
	    }
	  }
	});
});