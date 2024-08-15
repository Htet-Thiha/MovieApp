import React, { createContext, useState, useContext } from 'react';
const LightTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'white',
        card: 'rgb(255, 255, 255)',
        text: 'black',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const DarkTheme = {
    dark: true,
    colors: {
        primary: 'rgb(10, 132, 255)',
        background: 'black',
        card: 'rgb(28, 28, 30)',
        text: 'white',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    },
};

const ThemeContext = createContext();

const ThemeProvider=({ children })=> {
    const [theme, setTheme] = useState(LightTheme);

    const toggleTheme = () => {
        setTheme(theme.dark ? LightTheme : DarkTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };

