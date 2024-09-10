
let generatedOtp = null;
const otpTimeout = 120000; 

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}


function storeOtp(category, detail, otp) {
    const otpData = {
        otp: otp,
        expiry: new Date().getTime() + otpTimeout, 
        detail: detail
    };
    localStorage.setItem(`${category}_${detail}`, JSON.stringify(otpData));
}


function validateOtp(category, detail, enteredOtp) {
    const storedOtpData = JSON.parse(localStorage.getItem(`${category}_${detail}`));

    if (!storedOtpData) {
        return { status: false, message: "OTP not found. Please request a new one." };
    }

    const currentTime = new Date().getTime();

    if (currentTime > storedOtpData.expiry) {
        return { status: false, message: "OTP expired. Please request a new one." };
    }

    if (enteredOtp === storedOtpData.otp.toString()) {
        return { status: true, message: "OTP verified successfully!" };
    } else {
        return { status: false, message: "Invalid OTP. Please try again." };
    }
}


document.getElementById("sendOtpBtn").addEventListener("click", function () {
    const category = document.getElementById("categorySelect").value;  
    const detail = document.getElementById("phoneEmail").value;  
    if (detail === "") {
        alert(`Please enter a valid ${category}.`);
        return;
    }

    
    generatedOtp = generateOtp();
    console.log("Generated OTP:", generatedOtp);

    
    storeOtp(category, detail, generatedOtp);

    
    document.querySelector(".otp-section").style.display = "block";
    document.getElementById("statusMessage").innerText = `OTP sent to your ${category}: ${detail}`;
});


document.getElementById("verifyOtpBtn").addEventListener("click", function () {
    const category = document.getElementById("categorySelect").value;  
    const detail = document.getElementById("phoneEmail").value;  
    const enteredOtp = document.getElementById("otpInput").value;

    const validation = validateOtp(category, detail, enteredOtp);

    document.getElementById("statusMessage").innerText = validation.message;
    document.getElementById("statusMessage").style.color = validation.status ? "green" : "red";
});
