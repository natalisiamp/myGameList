// server requirements to run
const express = require('express');
const path = require('path');
const request = require('request');
const steam_router = express.Router()

const{app, STEAM_WEB_API_KEY} = require("../db");

//steam api post
steam_router.post('/getSteamGames', async (req, res) => 
{
  // incoming: userId, steamId
  // outgoing: appId, playtime
  const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
              + 'key=' + STEAM_WEB_API_KEY + '&steamid=' + req.body.steamId;

  request.get(url, function(error, steamResponse, steamBody) {
    res.setHeader('Content-Type', 'application/json');
    res.send(steamBody);
  });
});

steam_router.get('/getAllGames', async (req, res) =>
{
  const url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';

  request.get(url, function(error, steamResponse, steamBody) {
    res.setHeader('Content-Type', 'application/json');
    res.send(steamBody);
  })
});

module.exports = steam_router;