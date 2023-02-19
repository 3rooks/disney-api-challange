import { ExpressApplication } from '@lib/express';
import { Routes } from '@routes/routes';
import express from 'express';
import { createServer } from 'http';

const { application } = new ExpressApplication(express(), new Routes());

export const httpServer = createServer(application);
