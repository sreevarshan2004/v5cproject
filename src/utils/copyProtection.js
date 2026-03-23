// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable ALL keyboard shortcuts except basic typing
document.addEventListener('keydown', (e) => {
    // Allow only basic keys: letters, numbers, backspace, enter, tab, arrows
    const allowedKeys = ['Backspace', 'Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'];

    // Block if Ctrl, Alt, Meta (Windows/Command) key is pressed
    if (e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault();
        return;
    }

    // Block function keys (F1-F12)
    if (e.key.startsWith('F') && e.key.length <= 3) {
        e.preventDefault();
        return;
    }

    // Block PrintScreen, Insert, Delete, etc.
    if (['PrintScreen', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        return;
    }
});


