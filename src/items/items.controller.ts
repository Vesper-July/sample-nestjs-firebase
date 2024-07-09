import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ItemDto } from './item.dto';
import { ItemsService } from './items.service';

@Controller('items/')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get()
    async getItems() {
        return await this.itemsService.getItems()
    }

    @Post()
    async createItem(@Body() body: ItemDto) {
        return await this.itemsService.createItem(body)
    }

    @Get(':id')
    async getItem(@Param('id') id: string) {
        return await this.itemsService.getItem(id)
    }

    @Put()
    async updateItem(@Body() body: ItemDto) {
        return await this.itemsService.updateItem(body)
    }

    @Delete(':id')
    async deleteItems(@Param('id') id: string) {
        return await this.itemsService.deleteItem(id)
    }
}
