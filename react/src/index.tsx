import React, { createContext, useContext, useEffect, useRef } from 'react';
import { SpotlightTour, TourStep } from '@jojovms/spotlight-tour-core';

interface TourContextType {
    start: () => void;
    stop: () => void;
    next: () => void;
}

const TourContext = createContext<TourContextType | null>(null);

interface TourProviderProps {
    steps: TourStep[];
    children: React.ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ steps, children }) => {
    const tourRef = useRef<SpotlightTour | null>(null);

    useEffect(() => {
        tourRef.current = new SpotlightTour({ steps });

        return () => {
            tourRef.current?.stop();
        };
    }, [steps]);

    const start = () => tourRef.current?.start();
    const stop = () => tourRef.current?.stop();
    const next = () => tourRef.current?.next();

    return (
        <TourContext.Provider value={{ start, stop, next }}>
            {children}
        </TourContext.Provider>
    );
};

export const useTour = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
};
