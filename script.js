

const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
	if (entry.isIntersecting) {
		entry.target.style.transform = "translateY(0px)";
		entry.target.style.filter = "blur(0px)";
		entry.target.style.opacity = "1";

	observer.unobserve(entry.target);
	}
});
}, {
	threshold: 0.2,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});

function startAnimation(){
    document.querySelectorAll(".starter").forEach((el, idx) => {
        setTimeout(() => {
            el.style.filter = "blur(0px)";
            el.style.transform = "translateY(0px)";
            el.style.opacity = "1";
        }, (idx + 1) * 300);
    });
}
startAnimation();

document.querySelectorAll(".pro-wrapper").forEach(wrapper => {
    wrapper.addEventListener("click", () => {
        document.querySelectorAll(".pro-wrapper").forEach(other => {
            other.classList.remove("pro-wrapper-active");
        });
        setTimeout(() => {
            wrapper.classList.add("pro-wrapper-active");
        }, 300);
    });
});