using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Extenstions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;
using API.DTOs;
using AutoMapper;
using API.Services;
using CloudinaryDotNet.Actions;

namespace API.Controllers
{
    [Authorize]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            string userName = User.Identity.Name;
            IQueryable<Product> query = _context.Products
            .Include(x => x.User)
            .Where(x => string.Equals(x.User.UserName.ToLower(), userName.ToLower()))
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            PagedList<Product> products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }
        
        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            string userName = User.Identity.Name;
            Product product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.Id == id && string.Equals(x.User.UserName.ToLower(), userName.ToLower()));

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            // Get the currently logged-in user's username
            string userName = User.Identity.Name;

            // Query for products associated with the current user
            IQueryable<Product> userProductsQuery = _context.Products
                .Where(x => string.Equals(x.User.UserName.ToLower(), userName.ToLower()));

            // Retrieve distinct brands and types from the user's products
            List<string> brands = await userProductsQuery.Select(p => p.Brand).Distinct().ToListAsync();
            List<string> types = await userProductsQuery.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }


        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDto)
        {

            Product product = _mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                ImageUploadResult imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            string userName = User.Identity.Name;
            if (!string.IsNullOrEmpty(userName))
            {
                product.User = await _context.Users.SingleOrDefaultAsync(x => string.Equals(x.UserName.ToLower(), userName.ToLower()));
            }
            else
            {
                return BadRequest(new ProblemDetails { Title = "Problem creating new product: owner not found" });
            }
            _context.Products.Add(product);

            bool result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct(UpdateProductDto productDto)
        {
            string userName = User.Identity.Name;
            Product product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.Id == productDto.Id && string.Equals(x.User.UserName.ToLower(), userName.ToLower()));

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

            if (productDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(product.PublicId))
                    await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            product.User = await _context.Users.SingleOrDefaultAsync(x => string.Equals(x.UserName.ToLower(), userName.ToLower()));
            bool result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating inventory item" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            string userName = User.Identity.Name;
            Product product = await _context.Products.Include(x => x.User).SingleOrDefaultAsync(x => x.Id == id && string.Equals(x.User.UserName.ToLower(), userName.ToLower()));

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting inventory item" });
        }
    }
}