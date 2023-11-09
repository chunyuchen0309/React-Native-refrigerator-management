// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name);
    }
}

// add other navigation functions that you need and export them