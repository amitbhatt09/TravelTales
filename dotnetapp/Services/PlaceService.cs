using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class PlaceService
    {
        private readonly ApplicationDbContext _context;

        public PlaceService(ApplicationDbContext context)
        {
            _context=context;
        }

        public async Task<IEnumerable<Place>> GetAllPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        public async Task<Place> GetPlaceById(int placeId)
        {
            return await _context.Places.FindAsync(placeId);   
        }

        public async Task<bool> AddPlace(Place place)
        {
            var existingPlace=await _context.Places.FirstOrDefaultAsync(p => p.Name == place.Name);

            if(existingPlace != null)
            {
                return false;
            }
            _context.Places.Add(place); 
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePlace(int placeId,Place place)
        {
            var existingPlace=await _context.Places.FindAsync(placeId);

            if(existingPlace == null)
            {
                return false;
            }

            var categoryExists=await _context.Places.FirstOrDefaultAsync(p => p.Category==place.Category  &&  p.PlaceId !=placeId);
            if(categoryExists != null)
            {
                return false;
            }

            existingPlace.Name=place.Name;
            existingPlace.Category=place.Category;
            existingPlace.BestTimeToVisit=place.BestTimeToVisit;
            existingPlace.PlaceImage=place.PlaceImage;
            existingPlace.Location=place.Location;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlace(int placeId)
        {
            var existingPlace=await _context.Places.FindAsync(placeId);
            if(existingPlace != null){
                _context.Places.Remove(existingPlace);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}