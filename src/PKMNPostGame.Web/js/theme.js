// Theme related JS
const DARK_THEME_STATE = "toggle-bootstrap-theme";

const LOCAL_META_DATA = JSON.parse(localStorage.getItem(DARK_THEME_STATE));

const DARK_THEME_PATH = "https://bootswatch.com/4/darkly/bootstrap.css";

const DARK_STYLE_LINK = document.getElementById("dark-theme-style");
const THEME_TOGGLER = document.getElementById("theme-toggler");

let isDark = LOCAL_META_DATA && LOCAL_META_DATA.isDark;

// Check if user has already selected dark theme earlier
if (isDark) {
    enableDarkTheme();
} else {
    disableDarkTheme();
}

function toggleTheme() {
    isDark = !isDark;

    if (isDark) {
        enableDarkTheme();
    } else {
        disableDarkTheme();
    }

    const META = { isDark };
    localStorage.setItem(DARK_THEME_STATE, JSON.stringify(META));
}

function enableDarkTheme() {
    DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
    //THEME_TOGGLER.innerHTML = "🌞 Light";
    THEME_TOGGLER.innerHTML = "<i class='fas fa-sun'></i> Light";
}

function disableDarkTheme() {
    DARK_STYLE_LINK.setAttribute("href", "");
    //THEME_TOGGLER.innerHTML = "🌙 Dark";
    THEME_TOGGLER.innerHTML = "<i class='fas fa-moon'></i> Dark";
}