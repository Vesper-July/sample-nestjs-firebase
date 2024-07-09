import { ItemDto } from './item.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { getDocs, getDoc, collection, query, where, limit, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'

@Injectable()
export class ItemsService {
    constructor(private firebaseService: FirebaseService) {}

    items = collection(this.firebaseService.getFirestore(), 'items')

    async getItems () {
        try {
            const q = query(this.items)
            const itemsDocs = await getDocs(q)
            const data = itemsDocs.docs.map((item) => item.data())
            return data
        } catch (error) {
            console.error('GET ITEMS', error)
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getItem (id: string) {
        try {
            const q = doc(this.firebaseService.getFirestore(), 'items', id)
            const itemsDoc = await getDoc(q)
            return itemsDoc.data()
        } catch (error) {
            console.error('GET ITEM-' + id, error)
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createItem (item: ItemDto) {
        try {
            const itemsDoc = await addDoc(this.items, {
                ...item
            })
            await updateDoc(doc(this.firebaseService.getFirestore(), 'items', itemsDoc.id), {
                id: itemsDoc.id
            })
            item.id = itemsDoc.id

            return item
        } catch (error) {
            console.error('CREATE ITEM', error)
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateItem (item: ItemDto) {
        try {
            await updateDoc(doc(this.firebaseService.getFirestore(), 'items', item.id), {
                ...item
            })
            return item
        } catch (error) {
            console.error('UPDATE ITEM-' + item.id, error)
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteItem (id: string) {
        try {
            return await deleteDoc(doc(this.firebaseService.getFirestore(), 'items', id))
        } catch (error) {
            console.error('UPDATE ITEM-' + id, error)
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
