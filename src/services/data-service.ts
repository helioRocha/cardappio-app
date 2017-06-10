import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DataService {
    db: AngularFireDatabase;

    constructor(dB: AngularFireDatabase) {
        this.db = dB;
    }

    /*
    * Retorna todos as Redes.
    */
    getRedes(): FirebaseListObservable<any> {
        return this.db.list('/redes', { preserveSnapshot: true });
    }

    /*
    * Retorna todos os Estabelecimentos.
    */
    getEstabelecimentos(){
        return this.db.list('/estabelecimentos', { preserveSnapshot: true });
    }
    

}