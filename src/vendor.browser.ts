import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { platformBrowser, BrowserModule } from '@angular/platform-browser';
import {Component, OnInit, Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Router, Routes, ActivatedRoute, RouterModule } from '@angular/router';
import { Http, URLSearchParams, HttpModule } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';