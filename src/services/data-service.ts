import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DataService {
    db: AngularFireDatabase;
    mesas: FirebaseListObservable<any>;
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
    /*
    * adiciona uma mesa a um estabelecimento
    */
    addMesa(numero:string, idestab: string){
        this.mesas = this.db.list('/estabelecimentos/'+idestab+'/mesas');
        this.mesas.push({
            numero: numero,
            status: "livre"
         });
    }
    /*
    * Atualizar status de uma mesa
    */
    updateMesa(idestab: string, idmesa: string, status: string){
        this.mesas = this.db.list('/estabelecimentos/'+idestab+'/mesas');
        this.mesas.update(idmesa, {
            status: status
        });
    }

    

}