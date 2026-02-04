

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

document.querySelector(".pro-letter-btn").addEventListener("click", () => {
    async function saveEmail(){
        const dataToSend = { email: document.getElementById("letterEmail").value };
        try {
            const response = await fetch(`https://servers.nextdesignwebsite.com/casey/api/save-email`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const data = await response.json();
            if(data.message == "success"){
                document.getElementById("letterEmail").value = "";
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    if(document.getElementById("letterEmail").value != ""){
        saveEmail();
    }
});

let params = new URLSearchParams(window.location.search);
let emailInput;
let pdf;
if(params.get("downloadId") && params.get("downloadId") == "904510"){
    document.getElementById("pdfModal").style.opacity = "1";
    document.getElementById("pdfModal").style.pointerEvents = "auto";
    emailInput = document.getElementById("emailInput").value;
    pdf = 0;
} else if(params.get("downloadId") && params.get("downloadId") == "558427"){
    document.getElementById("pdfModal2").style.opacity = "1";
    document.getElementById("pdfModal2").style.pointerEvents = "auto";
    emailInput = document.getElementById("emailInput2").value;
    pdf = 1;
}
function viewPdf(){
    let email = emailInput.value;
    let link = "https://caseybuiltfitness.com/pdfs/programme.pdf";
    if(pdf == 1){
        link = "https://caseybuiltfitness.com/pdfs/hybrid.pdf";
    }
    if(email != ""){
        async function sendEmail(){
            const dataToSend = { email: email, text: "Your payment has been confirmed.<br><br>You can now access the program here: " + link };
            try {
                const response = await fetch(`https://servers.nextdesignwebsite.com/casey/api/send-email`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const data = await response.json();
                if(data.message == "success"){
                    window.location.href = link;
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } 
        sendEmail();
    } else {
        document.getElementById("emailInput").style.border = "1px solid red";
    }
}

let pdfIdx;
document.querySelectorAll(".free-btn").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        document.getElementById("accessModal").style.opacity = "1";
        document.getElementById("accessModal").style.pointerEvents = "auto"; 
        pdfIdx = idx + 1;
    });
});
document.getElementById("accessModal").addEventListener("click", (e) => {
    if(!document.querySelector("#accessModal .book-wrapper").contains(e.target)){
        document.getElementById("accessModal").style.opacity = "0";
        document.getElementById("accessModal").style.pointerEvents = "none"; 
    } 
});
function viewFree(){
    let email = document.getElementById("freeInput").value;
    let url = pdfIdx + ".pdf";
    if(email != ""){
        async function sendEmail(){
            const dataToSend = { email: email, text: "You can now access the program you unlocked here: https://caseybuiltfitness.com/pdfs/" + url };
            try {
                const response = await fetch(`https://servers.nextdesignwebsite.com/casey/api/send-email`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(dataToSend), 
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    return;
                }

                const data = await response.json();
                if(data.message == "success"){
                    window.location.href = "/pdfs/" + url;
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } 
        sendEmail();
    } else {
        document.getElementById("emailInput").style.border = "1px solid red";
    }
}