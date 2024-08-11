function getRandomColor() {
    // Generate a random color in hexadecimal format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setCurrentTime(){
    const dayWeek =['Sunday', 'Monday','Tuesday','Wedensday',
        'Thursday','Friday','Saturday'];
    const months=['Jan','Feb','Mar','Apr','May','June','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();

    const output=dayWeek[now.getDay()]+', '+now.getDate()+' '+months[now.getMonth()]+' ' +now.getFullYear()+' '+ now.toLocaleTimeString();
    const outPut = document.getElementById('clock');
    outPut.innerHTML=output;
    outPut.style.color= getRandomColor();
    

}
setInterval(setCurrentTime, 1000);
setCurrentTime();


document.addEventListener("DOMContentLoaded", function() {
    function updateWidth() {
        var width = window.innerWidth;
        document.getElementById("widthDisplay").textContent = "Screen: " + width + "px";
        document.getElementById('widthDisplay').style.color = getRandomColor();
    }

    updateWidth(); // Initial width
    window.addEventListener("resize", updateWidth); // Update width on window resize
});
