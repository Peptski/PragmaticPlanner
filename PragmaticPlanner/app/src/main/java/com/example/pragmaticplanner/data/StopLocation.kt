package com.example.pragmaticplanner.data
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "stop_locations")
data class StopLocation(
    val name: String,
    val id: Int,
    val lat: Float,
    val long: Float,
    val weight: Int,
    val track: String?
)