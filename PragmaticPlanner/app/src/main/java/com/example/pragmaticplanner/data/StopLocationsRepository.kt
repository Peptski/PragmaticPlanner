package com.example.pragmaticplanner.data

import androidx.lifecycle.LiveData

class StopLocationsRepository(private val stopLocationDao: StopLocationDao) {

    val readAllData: LiveData<List<StopLocation>> = stopLocationDao.getStopLocations()

    suspend fun addStopLocation(stopLocation: StopLocation){
        stopLocationDao.addStopLocation(stopLocation)
    }

}