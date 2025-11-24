// prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// The PrismaService class should extend PrismaClient directly
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // Constructor and other methods (like onModuleInit/onModuleDestroy) go here
    async onModuleInit() {
        // Connect to the database
        await this.$connect(); 
    }

    async onModuleDestroy() {
        // Disconnect from the database
        await this.$disconnect();
    }
}
