    const info = document.getElementsByClassName("info")[0];
    const settings = document.getElementsByClassName("settings")[0];
    const play = document.getElementById("play")
    const timer = document.querySelector('.timer')

    let workBut = document.getElementsByClassName('mode-shell')[0]
    let sbBut = document.getElementsByClassName('mode-shell')[1]
    let lbBut = document.getElementsByClassName('mode-shell')[2]

    const modeLabel = document.querySelector('.timer-descript')

    const alarm = new Audio('alarm.mp3')
    const colors = document.querySelector(":root")

    let isTimerOn = false;

    let timerId;

    let workMins = 25
    let workSecs = 0

    let sbMins = 5
    let sbSecs = 0

    let lbMins = 15
    let lbSecs = 0

    let startMins = workMins;
    let startSeconds = workSecs;
    let time = (60 * startMins) + startSeconds;

    timer.textContent = getTimeStr()

    function showInfo() {
        info.classList.toggle("scale-info")
    }


    function selectWork(){
        workBut.classList.remove("modes-unselected")
        workBut.classList.add("modes-selected")
        
        workBut.children[0].classList.remove("mode-unselected")
        workBut.children[0].classList.add("mode-selected")

        sbBut.classList.add("modes-unselected")
        sbBut.classList.remove("modes-selected")
        
        sbBut.children[0].classList.remove("mode-selected")
        sbBut.children[0].classList.add("mode-unselected")

        lbBut.classList.add("modes-unselected")
        lbBut.classList.remove("modes-selected")
        
        lbBut.children[0].classList.remove("mode-selected")
        lbBut.children[0].classList.add("mode-unselected")
    }

    function selectSB(){
        workBut.classList.remove("modes-selected")
        workBut.classList.add("modes-unselected")
        
        workBut.children[0].classList.remove("mode-selected")
        workBut.children[0].classList.add("mode-unselected")

        sbBut.classList.add("modes-selected")
        sbBut.classList.remove("modes-unselected")
        
        sbBut.children[0].classList.remove("mode-unselected")
        sbBut.children[0].classList.add("mode-selected")

        lbBut.classList.add("modes-unselected")
        lbBut.classList.remove("modes-selected")
        
        lbBut.children[0].classList.remove("mode-selected")
        lbBut.children[0].classList.add("mode-unselected")
    }

    function selectLB(){
        workBut.classList.remove("modes-selected")
        workBut.classList.add("modes-unselected")
        
        workBut.children[0].classList.remove("mode-selected")
        workBut.children[0].classList.add("mode-unselected")

        sbBut.classList.add("modes-unselected")
        sbBut.classList.remove("modes-selected")
        
        sbBut.children[0].classList.remove("mode-selected")
        sbBut.children[0].classList.add("mode-unselected")

        lbBut.classList.add("modes-selected")
        lbBut.classList.remove("modes-unselected")
        
        lbBut.children[0].classList.remove("mode-unselected")
        lbBut.children[0].classList.add("mode-selected")
    }

    function changeMode(mode) {
        if (mode == 'work') {
            startMins = workMins
            startSeconds = workSecs
            modeLabel.textContent = "Work"
            selectWork()
            
            resetTimer();
            changeColors("#F9F940")
        }
        else if (mode == 'shortb') {
            startMins = sbMins
            startSeconds = sbSecs
            modeLabel.textContent = "Short Break"
            selectSB()
        
            resetTimer();
            changeColors("#32d7ce")
        }
        else {
            startMins = lbMins
            startSeconds = lbSecs
            modeLabel.textContent = "Long Break"
            selectLB();
            
            resetTimer();
            changeColors("#A8E10C")
        }
    }

    function changeColors(clr) {
        let clrAct = getComputedStyle(colors).getPropertyValue("--foreground")
        colors.style.setProperty('--foreground', clr)
        // if (clrAct == '#F9F940') {
        //     colors.style.setProperty('--foreground', '#32d7ce')
        // } else {
        //     colors.style.setProperty('--foreground', '#F9F940')
        // }
    }


    function playToggle(uiOnly = false) {
        play.classList.toggle("fa-play")
        play.classList.toggle("fa-pause")
        if (uiOnly) {
            return
        }
        if (isTimerOn) {
            stopTimer()
        } else {
            timerId = setInterval(updateTime, 1000)
        }
    }

    function resetTimer() {
        time = (60 * startMins) + startSeconds;
        if (isTimerOn) {
            stopTimer();
            playToggle(true);
        }
        timer.textContent = getTimeStr();
    }

    function showSettings() {
        settings.classList.toggle("scale-settings")

    }

    function stopTimer() {
        clearInterval(timerId);
        isTimerOn = false
    }

    function getTimeStr() {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60;
        mStr = minutes < 10 ? "0" + minutes : "" + minutes
        sStr = seconds < 10 ? "0" + seconds : "" + seconds
        return mStr + ":" + sStr;
    }

    function updateTime() {
        isTimerOn = true
        if (time == 1) {
            playToggle(true);
        }
        if (time > 0) {
            time--
            timer.textContent = getTimeStr();
        }
        else {
            alarm.play()
            stopTimer();
            resetTimer();
        }
    }

