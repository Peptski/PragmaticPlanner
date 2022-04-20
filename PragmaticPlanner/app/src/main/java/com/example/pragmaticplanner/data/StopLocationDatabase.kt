package com.example.pragmaticplanner.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [StopLocation::class], version = 1, exportSchema = false)
abstract class StopLocationDatabase: RoomDatabase(){

    abstract fun stopLocationDao(): StopLocationDao

    companion object{
        @Volatile
        private var INSTANCE: StopLocationDatabase? = null

        fun getDatabase(context: Context): StopLocationDatabase{
            val tempInstance = INSTANCE
            if(tempInstance != null){
                return tempInstance
            }
            synchronized(this){
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    StopLocationDatabase::class.java,
                    "stop_locations"
                ).build()
                INSTANCE = instance
                return instance
            }
        }
    }



}