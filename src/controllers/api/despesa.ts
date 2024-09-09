import { Request, Response } from 'express';
import { Receita } from '../../models/receita';
import con from '../../../config/connection';
import { RowDataPacket } from 'mysql2';
