"use strict";
//Navigation
const navList = document.querySelector('.nav-list');
const content = document.querySelectorAll('.main_content--item');

function changeClass(el) {
    for (let i = 0; i < navList.children.length; i++) {
        navList.children[i].classList.remove('active');
        navList.children[i].setAttribute('data-nav', i);
    }
    el.classList.add('active');
}

navList.addEventListener('click', (event) => {
    let currentNavPosition = null;

    if (event.target.tagName !== 'LI') {
        if (event.target.parentNode.tagName !== 'LI') {
            currentNavPosition = event.target.parentNode.parentNode.dataset.nav;
        } else {
            currentNavPosition = event.target.parentNode.dataset.nav;
        }
    }
    if (event.target.tagName == 'LI') {
        currentNavPosition = event.target.dataset.nav;
    }

    changeClass(event.target);

    content.forEach((items, index) => {
        items.classList.remove('active');
        items.setAttribute('data-content', index);
        if (items.dataset.content === currentNavPosition) {
            items.classList.add('active');
        }
    })
})


//add task


const $ADDNAME = document.querySelector('.add_task_form_name__input');
const $ADDNAMEIMPLEMENTER = document.querySelector('.add_task_form_implementer__input');
const $ADDDEADLINE = document.querySelector('.add_task_form_dead-line__input');
const $ADDDESCRIPTION = document.querySelector('.add_task_form_description__input');
const $ADDBTN = document.querySelector('.add_task_form_btn__add');
const $DIVMADE = document.querySelector('.made_tasks');
const $DIVINPROGRESS = document.querySelector('.in_progress__tasks');
const $DIVDONE = document.querySelector('.done__tasks');

let del;
let done;
let inProgress;
let remove;
let madeArr = JSON.parse(localStorage.getItem('made')) || [];
// let inProgressArr = JSON.parse(localStorage.getItem('inProgress')) || [];
// let doneArr = JSON.parse(localStorage.getItem('done')) || [];


//creating task structure
let createTask = (elem) => {
    let newTask = `
    <div class="made_tasks--item">
        <div class="made_tasks__left">
            <div class="made_tasks__name">
                <h1 class="made_tasks_name__text">${elem.name}</h1>
            </div>
            <div class="made_tasks__implementer">
                <h2 class="made_tasks_implementer__text">${elem.implementer}</h2>
            </div>
            <div class="made_tasks__description">
                <p class="made_tasks_description__text">${elem.description}</p>
            </div>
        </div>
        <div class="made_tasks__right">
            <div class="made_tasks__dead-line">
                <span class="made_tasks_dead-line__text">${elem.deadline}</span>
            </div>
            <div class="made_tasks__buttons">
                <div class="made_tasks_btn_inprogress">
                    <button class="btn_inprogress"><i class="fa-solid fa-business-time"></i></button>
                </div>
                <div class="btn__delete">
                    <button class="btn_delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    return $DIVMADE.innerHTML += newTask;
}

//creating object
let newArr = () => {
    function createObj(name, implementer, deadline, description) {
        this.name = $ADDNAME.value;
        this.implementer = $ADDNAMEIMPLEMENTER.value;
        this.deadline = $ADDDEADLINE.value;
        this.description = $ADDDESCRIPTION.value;
    }
    madeArr.push(new createObj())
}

//newArr push to localStorage
let restore = () => {
    let taskToJson = JSON.stringify(madeArr);
    localStorage.setItem('made', taskToJson)
}

//task rendering
let taskRender = () => {
    if(madeArr){
        sortArr(madeArr)
    } else {
        $DIVMADE.innerHTML = '';
    }
}

let sortArr = (madeArr) => {
    $DIVMADE.innerHTML = '';
    madeArr.forEach((elem) => {
        createTask(elem)
    })
}

// deleting and restoring tasks
let inProgressArr = JSON.parse(localStorage.getItem('inProgress')) || [];
function dataSetTask() {
    del = document.querySelectorAll('.btn_delete');
    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener('click', (el) => {
            madeArr.splice(i, 1);
            restore();
            reload();
        })
    }
    inProgress = document.querySelectorAll('.btn_inprogress');
    for (let i = 0; i < inProgress.length; i++) {
        inProgress[i].addEventListener('click', (el) => {
            // console.log(inProgressBtn)
            el.preventDefault();
            inProgressArr.push(madeArr[i]);
            madeArr.splice(i, 1);
            // createInProgressTask();
            restoreInProgress();
            taskInProgressRender();
            // dataSetTaskInProgress();
            reloadInProgress();
            restore();
            reload();
            console.log(inProgressArr)

        })
        
    }
}

// addTask button onclick
$ADDBTN.addEventListener('click', (el) => {
    el.preventDefault();
    newArr();
    restore();
    taskRender();
    dataSetTask();
    $ADDNAME.value = '';
    $ADDNAMEIMPLEMENTER.value = '';
    $ADDDEADLINE.value = '';
    $ADDDESCRIPTION.value = '';
})

//tasks after reloading
let reload = () => {
    if(madeArr){
        sortArr(madeArr)
    } else {
        $DIVMADE.innerHTML = '';
    }
    dataSetTask()
}
reload();


//in Progress

//creating in progress task structure
let createInProgressTask = (el) => {
    let newTaskInProgress = `
    <div class="in_progress_tasks--item">
        <div class="in_progress_tasks__left">
            <div class="in_progress_tasks__name">
                <h1 class="in_progress_tasks_name__text">${el.name}</h1>
            </div>
            <div class="in_progress_tasks__implementer">
                <h2 class="in_progress_tasks_implementer__text">${el.implementer}</h2>
            </div>
            <div class="in_progress_tasks__description">
                <p class="in_progress_tasks_description__text">${el.description}</p>
            </div>
        </div>
        <div class="in_progress_tasks__right">
            <div class="in_progress_tasks__dead-line">
                <span class="in_progress_tasks_dead-line__text">${el.deadline}</span>
            </div>
            <div class="in_progress_tasks__buttons">
                <div class="done_task_in-progress">
                    <button class="done_task__button_in-progress"><i class="fa-solid fa-square-check"></i></button>
                </div>
                <div class="made_tasks_btn_out-of-progress">
                    <button class="btn_out-of-progress"><i class="fa-solid fa-business-time"></i></button>
                </div>
                <div class="btn__delete">
                    <button class="btn_delete_in-progress"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>
    `
    return $DIVINPROGRESS.innerHTML += newTaskInProgress;
}

//inProgressArr push to localStorage
let restoreInProgress = () => {
    let taskInProgressToJson = JSON.stringify(inProgressArr);
    localStorage.setItem('inProgress', taskInProgressToJson)
}

//taskInProgress rendering
let taskInProgressRender = () => {
    if(inProgressArr){
        sortInProgressArr(inProgressArr)
    } else {
        $DIVINPROGRESS.innerHTML = '';
    }
}

let sortInProgressArr = (inProgressArr) => {
    $DIVINPROGRESS.innerHTML = '';
    inProgressArr.forEach((el) => {
        createInProgressTask(el)
    })
}

// deleting and restoring tasksInProgress
let delInProgress;
let outOfInProgress;
let doneInProgress;
let doneArr = JSON.parse(localStorage.getItem('done')) || [];
function dataSetTaskInProgress() {
    delInProgress = document.querySelectorAll('.btn_delete_in-progress');
    for (let i = 0; i < delInProgress.length; i++) {
        delInProgress[i].addEventListener('click', (el) => {
            el.preventDefault();
            inProgressArr.splice(i, 1);
            restoreInProgress();
            reloadInProgress();
        })
    }
    outOfInProgress = document.querySelectorAll('.btn_out-of-progress');
    for (let i = 0; i < outOfInProgress.length; i++) {
        outOfInProgress[i].addEventListener('click', (el) => {
            el.preventDefault();
            madeArr.push(inProgressArr[i]);
            inProgressArr.splice(i, 1);
            restoreInProgress();
            reloadInProgress();
            restore();
            reload();
        })
    }
    doneInProgress = document.querySelectorAll('.done_task__button_in-progress');
    for (let i = 0; i < doneInProgress.length; i++) {
        doneInProgress[i].addEventListener('click', (el) => {
            el.preventDefault();
            doneArr.push(inProgressArr[i]);
            inProgressArr.splice(i, 1);
            // createInProgressTask();
            restoreDone();
            taskDoneRender();
            // dataSetTaskInProgress();
            reloadDone();
            restoreInProgress();
            reloadInProgress();
        })
    }
}

//tasksInProgress after reloading
let reloadInProgress = () => {
    if(inProgressArr){
        sortInProgressArr(inProgressArr)
    } else {
        $DIVINPROGRESS.innerHTML = '';
    }
    dataSetTaskInProgress()
}
reloadInProgress();

let deleteInProgressAll = document.querySelector('.btn_delete_in-progress-top');
deleteInProgressAll.addEventListener('click', () => {
    inProgressArr = [];
    restoreInProgress();
    reloadInProgress();
})



//done

//creating done task structure
let createDoneTask = (el) => {
    let newTaskDone = `
        <div class="done--item">
            <div class="done_tasks__left">
                <div class="done_tasks__name">
                    <h1 class="done_tasks_name__text">${el.name}</h1>
                </div>
                <div class="done_tasks__implementer">
                    <h2 class="done_tasks_implementer__text">${el.implementer}</h2>
                </div>
                <div class="done_tasks__description">
                    <p class="done_tasks_description__text">${el.description}</p>
                </div>
            </div>
            <div class="done_tasks__right">
                <div class="done_tasks__dead-line">
                    <span class="done_tasks_dead-line__text">${el.deadline}</span>
                </div>
                <div class="done_tasks__buttons">
                    <div class="made_tasks_btn_still-in-progress">
                        <button class="btn_still-in-progress"><i class="fa-solid fa-business-time"></i></button>
                    </div>
                    <div class="btn__delete">
                        <button class="btn_delete__done"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `
    return $DIVDONE.innerHTML += newTaskDone;
}

//DoneArr push to localStorage
let restoreDone = () => {
    let taskDoneToJson = JSON.stringify(doneArr);
    localStorage.setItem('done', taskDoneToJson)
}

//DoneTask rendering
let taskDoneRender = () => {
    if(doneArr){
        sortDoneArr(doneArr)
    } else {
        $DIVDONE.innerHTML = '';
    }
}

let sortDoneArr = (doneArr) => {
    $DIVDONE.innerHTML = '';
    doneArr.forEach((el) => {
        createDoneTask(el)
    })
}

let delDone;
let stillInProgressBtn;
function dataSetTaskDone() {
    delDone = document.querySelectorAll('.btn_delete__done');
    for (let i = 0; i < delDone.length; i++) {
        delDone[i].addEventListener('click', (el) => {
            el.preventDefault();
            doneArr.splice(i, 1);
            restoreDone();
            reloadDone();
        })
    }
    stillInProgressBtn = document.querySelectorAll('.btn_still-in-progress');
    for (let i = 0; i < stillInProgressBtn.length; i ++) {
        stillInProgressBtn[i].addEventListener('click', (el) => {
            el.preventDefault();
            inProgressArr.push(doneArr[i]);
            doneArr.splice(i, 1);
            restoreDone();
            reloadDone();
            restoreInProgress();
            reloadInProgress();
        })
    }
}

//Done tasks after reloading
let reloadDone = () => {
    if(doneArr){
        sortDoneArr(doneArr)
    } else {
        $DIVDONE.innerHTML = '';
    }
    dataSetTaskDone();
}
reloadDone();

let deleteDoneAll = document.querySelector('.btn_delete_done');
deleteDoneAll.addEventListener('click', () => {
    doneArr = [];
    restoreDone();
    reloadDone();
})