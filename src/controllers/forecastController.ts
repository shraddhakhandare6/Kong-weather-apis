import { Request, Response } from "express";
import * as forecastService from "../services/forecastService";

export const list = async (req: Request, res: Response) => {
  try {
    const forecasts = await forecastService.getAllForecasts();
    res.json(forecasts);
    console.log(forecasts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forecasts" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const forecast = await forecastService.getForecastById(req.params.id);
    res.json(forecast);
    console.log(forecast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const forecast = await forecastService.createForecast(req.body);
    res.status(201).json(forecast);
    console.log(forecast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create forecast" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const forecast = await forecastService.updateForecast(req.params.id, req.body);
    res.json(forecast);
    console.log(forecast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update forecast" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await forecastService.deleteForecast(req.params.id);
    res.json({ message: "Forecast deleted successfully" });
    console.log(`Deleted forecast with id: ${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete forecast" });
  }
};
