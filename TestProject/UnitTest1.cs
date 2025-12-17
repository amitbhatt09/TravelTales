using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

 [Test, Order(1)]
public async Task Backend_Test_Method_GetPlaceById_In_PlaceService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.PlaceService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo getPlaceByIdMethod = serviceType.GetMethod("GetPlaceById");

            if (getPlaceByIdMethod != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(2)]
public async Task Backend_Test_Method_GetAllPlaces_In_PlaceService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.PlaceService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("GetAllPlaces");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(3)]
public async Task Backend_Test_Method_AddPlace_In_PlaceService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.PlaceService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("AddPlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(4)]
public async Task Backend_Test_Method_UpdatePlace_In_PlaceService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.PlaceService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("UpdatePlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(5)]
public async Task Backend_Test_Method_DeletePlace_In_PlaceService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.PlaceService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("DeletePlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
 [Test, Order(6)]
public async Task Backend_Test_Method_GetAllPlaces_In_PlaceController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.PlaceController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("GetAllPlaces");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(7)]
public async Task Backend_Test_Method_GetPlaceById_In_PlaceController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.PlaceController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("GetPlaceById");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(8)]
public async Task Backend_Test_Method_AddPlace_In_PlaceController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.PlaceController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("AddPlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(9)]
public async Task Backend_Test_Method_UpdatePlace_In_PlaceController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.PlaceController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("UpdatePlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(10)]
public async Task Backend_Test_Method_DeletePlace_In_PlaceController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.PlaceController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("DeletePlace");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(11)]
public async Task Backend_Test_Method_Login_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("Login");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(12)]
public async Task Backend_Test_Method_Register_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetPlaceById method
            MethodInfo Method = serviceType.GetMethod("Register");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
}
}

