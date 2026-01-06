import { atom } from 'recoil';

// Controls whether the auth modal is visible
export const authModalOpenState = atom({
    key: 'authModalOpenState',
    default: false,
});

// Controls which tab is active: 'login' or 'register'
export const authModalTabState = atom({
    key: 'authModalTabState',
    default: 'login',
});

// Tracks if user has dismissed the modal this session (persisted via sessionStorage)
export const authModalDismissedState = atom({
    key: 'authModalDismissedState',
    default: typeof window !== 'undefined'
        ? sessionStorage.getItem('authModalDismissed') === 'true'
        : false,
});
