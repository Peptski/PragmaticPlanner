package com.example.pragmaticplanner.data

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface StopLocationDao {

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addStopLocation(stopLocation: StopLocation)

    @Query("SELECT * FROM stop_locations")
    fun getStopLocations(): LiveData<List<StopLocation>>
}