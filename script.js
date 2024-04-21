let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let interval_id = null;
const display_el = document.getElementById("display");
const start_el_icon = document.getElementById("start-icon");
const git_btn = document.getElementById("git-icon-btn");
const git_model_container_el = document.getElementById("model-box-container");
let isGitHidden = true;
const lap_el = document.getElementById("lap");
let first_lap = true;
let lap_index = 1;
let h;
let m;
let s;
let ms;
let prev_flag_sec = 0,
  passed_flag_sec = 0;

//========VARIOUS_EVENT_HANDLERS====================================

document.getElementById("start").addEventListener("click", () => {
  if (!interval_id) {
    //for start
    interval_id = setInterval(displayTimer, 10);
    start_el_icon.classList.remove("start-icon");
    start_el_icon.classList.add("pause-icon");
  } else {
    //for stop
    clearInterval(interval_id);
    interval_id = null;
    start_el_icon.classList.remove("pause-icon");
    start_el_icon.classList.add("start-icon");
  }
});

document.getElementById("flag").addEventListener("click", () => {
  if (interval_id !== null) {
    if (first_lap) {
      display_el.classList.add("move-up");
      lap_el.classList.add("show-lap");
      first_lap = false;
    }

    passed_flag_sec =
      hours * 3600 +
      minutes * 60 +
      seconds +
      milliseconds / 1000 -
      prev_flag_sec;
    prev_flag_sec += passed_flag_sec;

    console.log("+ " + passed_flag_sec);

    //create lap dom el
    const p_el = document.createElement("p");
    const index_el = document.createElement("span");
    index_el.classList.add("index");
    index_el.textContent = lap_index < 10 ? "0" + lap_index++ : lap_index++;
    const diff_el = document.createElement("span");
    diff_el.classList.add("lap_diff");
    diff_el.textContent = "+ " + passed_flag_sec.toFixed(2);
    const at_duration_el = document.createElement("span");
    at_duration_el.classList.add("at-duration");
    at_duration_el.textContent = `${h} : ${m} : ${s} : ${ms}`;

    p_el.appendChild(index_el);
    p_el.appendChild(diff_el);
    p_el.appendChild(at_duration_el);

    const existing_first_child = lap_el.firstChild;

    lap_el.insertBefore(p_el, existing_first_child);
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(interval_id);
  interval_id = null;
  first_lap = true;
  prev_flag_sec = 0;
  passed_flag_sec = 0;
  start_el_icon.classList.remove("pause-icon");
  start_el_icon.classList.add("start-icon");
  display_el.classList.remove("move-up");
  lap_el.classList.remove("show-lap");
  lap_el.textContent = "";
  lap_index = 1;

  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  display_el.textContent = "00 : 00 : 00 : 000 ";
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds += 1;
    if (seconds == 60) {
      seconds = 0;
      minutes += 1;
      if (minutes == 60) {
        minutes = 0;
        hours += 1;
      }
    }
  }

  h = hours < 10 ? "0" + hours : hours;
  m = minutes < 10 ? "0" + minutes : minutes;
  s = seconds < 10 ? "0" + seconds : seconds;
  ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  display_el.textContent = `${h} : ${m} : ${s} : ${ms}`;
}

//=======GIT_MODEL_EVENT_HANDLERS===================================

git_btn.addEventListener("click", () => {
  if (isGitHidden) {
    git_model_container_el.style.display = "inherit";
  }
});

git_model_container_el.addEventListener("click", () => {
  git_model_container_el.style.display = "none";
});

document.getElementById("model-box").addEventListener("click", (event) => {
  event.stopPropagation();
});
