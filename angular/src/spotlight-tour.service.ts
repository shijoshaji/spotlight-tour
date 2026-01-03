import { Injectable } from '@angular/core';
import { SpotlightTour, TourOptions } from '@jojovms/spotlight-tour-core';

@Injectable({
    providedIn: 'root'
})
export class SpotlightTourService {
    private tour: SpotlightTour | null = null;

    init(options: TourOptions) {
        this.tour = new SpotlightTour(options);
    }

    start() {
        this.tour?.start();
    }

    stop() {
        this.tour?.stop();
    }

    next() {
        this.tour?.next();
    }

    prev() {
        this.tour?.prev();
    }
}
