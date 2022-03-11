using Dating_App.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Dating_App.Extentions;
using Dating_App.Entities;
using Dating_App.DTOs;
using System.Collections.Generic;
using Dating_App.Data;
using Dating_App.Helpers;

namespace Dating_App.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly ILikesRepository likesRepository;
        private readonly DataContext context;



        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository, DataContext context)
        {
            this.context = context;
            this.userRepository = userRepository;
            this.likesRepository = likesRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = await userRepository.GetUserByUsernameAsync(User.GetUsername());
            var likedUser = await userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await likesRepository.GetUserWithLikes(sourceUserId.Id);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot like yourself");

            var userLike = await likesRepository.GetUserLike(sourceUserId.Id, likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId.Id,
                LikedUserId = likedUser.Id
            };

            context.Likes.Add(userLike);
            //sourceUser.LikedUsers.Add(userLike);

            if (await userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            //return await likesRepository.GetUserLikes(predicate, User.GetUserId());
            var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());
            likesParams.UserId = user.Id;
            var users = await likesRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,users.TotalCount,
                users.TotalPages);
            
            return Ok(users);
        }

    }
}
