﻿using BC = BCrypt.Net.BCrypt;

namespace HMI.API.Services.Auth
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using HMI.API.DataAccess.Contexts;
    using HMI.API.DataAccess.Models.Auth;
    using HMI.API.Services.Auth.ApiModels;
    using HMI.API.Services.CustomExceptions;

    /// <summary>
    /// The user service.
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// The context.
        /// </summary>
        private readonly ApplicationContext context;

        /// <summary>
        /// The mapper.
        /// </summary>
        private readonly IMapper mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="mapper">The mapper.</param>
        public UserService(
            ApplicationContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /// <inheritdoc/>
        public IEnumerable<UserResponse> GetAll()
        {
            var users = this.context.Users;
            return this.mapper.Map<IList<UserResponse>>(users);
        }

        /// <inheritdoc/>
        public User GetUser(int id)
        {
            var user = this.context.Users.Find(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            return user;
        }

        /// <inheritdoc/>
        public UserResponse GetUserById(int id)
        {
            var user = this.GetUser(id);
            return this.mapper.Map<UserResponse>(user);
        }

        /// <inheritdoc/>
        public UserResponse Create(CreateUserRequest model)
        {
            // validate
            if (this.context.Users.Any(x => x.Username == model.Username))
            {
                throw new UserException($"Username '{model.Username}' is already registered");
            }

            // map model to new user object
            var user = this.mapper.Map<User>(model);
            user.Created = DateTime.UtcNow;

            // hash password
            user.PasswordHash = BC.HashPassword(model.Password);

            // save user
            this.context.Users.Add(user);
            this.context.SaveChanges();

            return this.mapper.Map<UserResponse>(user);
        }

        /// <inheritdoc/>
        public void ResetPassword(int requesterId, ResetPasswordRequest model)
        {
            var user = this.GetUser(requesterId);
            if (!BC.Verify(model.OldPassword, user.PasswordHash))
            {
                throw new UserException("Old password is invalid");
            }

            // update password  
            user.PasswordHash = BC.HashPassword(model.NewPassword);

            this.context.Users.Update(user);
            this.context.SaveChanges();
        }

        /// <inheritdoc/>
        public void ResetPassword(ResetPasswordAdminRequest model)
        {
            var user = this.GetUser(model.Username);

            // update password  
            user.PasswordHash = BC.HashPassword(model.NewPassword);

            this.context.Users.Update(user);
            this.context.SaveChanges();
        }

        /// <inheritdoc/>
        public UserResponse Update(int id, UpdateUserRequest model)
        {
            var user = this.GetUser(id);

            // validate
            if (user.Username != model.Username && this.context.Users.Any(x => x.Username == model.Username))
            {
                throw new UserException($"Username '{model.Username}' is already in use");
            }

            if (user.Username != model.Username && user.IsDefault)
            {
                throw new ForbiddenException($"Username for default users could not be changed");
            }

            // hash password if it was entered
            if (!string.IsNullOrEmpty(model.Password))
            {
                user.PasswordHash = BC.HashPassword(model.Password);
            }

            // copy model to user and save
            this.mapper.Map(model, user);
            user.Updated = DateTime.UtcNow;
            this.context.Users.Update(user);
            this.context.SaveChanges();

            return this.mapper.Map<UserResponse>(user);
        }

        /// <inheritdoc/>
        public void Delete(int id)
        {
            var user = this.GetUser(id);

            if (user.IsDefault)
            {
                throw new ForbiddenException($"Default users could no be deleted");
            }

            this.context.Users.Remove(user);
            this.context.SaveChanges();
        }

        /// <summary>
        /// The get user.
        /// </summary>
        /// <param name="username">The username.</param>
        /// <returns>The <see cref="User"/>.</returns>
        private User GetUser(string username)
        {
            var user = this.context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new KeyNotFoundException("Username not found");
            }

            return user;
        }
    }
}
