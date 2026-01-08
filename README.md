# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Registration Form - Direct Email Solution

The registration form now uses a **direct email approach** that works immediately without any setup!

### How It Works:

When a user fills out the registration form and clicks **"Send Registration Email"**:

1. ✅ **Form validates** all required fields
2. ✅ **Opens user's email client** (Gmail, Outlook, etc.)
3. ✅ **Pre-fills email** addressed to `srees9113@gmail.com`
4. ✅ **Includes all form data** in the email body
5. ✅ **User clicks "Send"** in their email client
6. ✅ **Email arrives directly** in your inbox

### Email Content:

The email will contain:
- **Full Name:** First + Last name
- **Email:** User's email address
- **Phone:** Complete phone with country code
- **Purpose:** Investment/Self-use/Business
- **Timeline:** Immediately/3-6 months/6+ months
- **Bedrooms:** 1/2/3/4 Bedrooms
- **Broker:** Yes/No
- **Timestamp:** When submitted

### No Setup Required!

**The form works immediately!** Just fill it out and click the button - it will open your email client with everything ready to send.

### Alternative Setup (Optional):

If you prefer automated sending without opening email client, you can still set up Formspree:

1. Go to [formspree.io](https://formspree.io/)
2. Create free account
3. Create form with email `srees9113@gmail.com`
4. Update the endpoint in `PropertyDetail.jsx`
