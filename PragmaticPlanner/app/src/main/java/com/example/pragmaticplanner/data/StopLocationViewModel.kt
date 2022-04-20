package com.example.pragmaticplanner.data

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class StopLocationViewModel(application: Application): AndroidViewModel(application) {

    private val readAllData: LiveData<List<StopLocation>>
    private val repository: StopLocationsRepository

    init {
        val stopLocationDao =  StopLocationDatabase.getDatabase(application).stopLocationDao()
        repository = StopLocationsRepository(stopLocationDao)
        readAllData = repository.readAllData
    }

    fun addStopLocation(stopLocation: StopLocation){
        viewModelScope.launch(Dispatchers.IO) {
            repository.addStopLocation(stopLocation)
        }
    }

}