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
	document.getElementsByClassName('.sign-in-button').addEventListener('click', () =>{
		event.defaultPrevented();
		localStorage.setItem('is_admin',true);
		alert('admin');
		// console.log(localStorage.getItem('is_admin'));
		
	});
	document.getElementsByClassName('.sign-up-button').addEventListener('click', () =>{
		alert('user');
		event.defaultPrevented();
		localStorage.setItem('is_admin',false);
		// console.log(localStorage.getItem('is_admin'));
	});
	document.querySelector('.footer-date').textContent = new Date().getFullYear();
	// <script type="text/javascript">document.write(new Date().getFullYear());</script>
});