/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Import Controllers (lazy loading)
const RegisterController = () => import('#controllers/register_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
const UserProfileController = () => import('#controllers/user_profile_controller')
const PostLikesController = () => import('#controllers/post_likes_controller')
const FeedController = () => import('#controllers/feed_controller')

/**
 * Public Routes
 */
router.get('/', [FeedController, 'index'])

router.get('register', [RegisterController, 'create'])
router.post('register', [RegisterController, 'store'])

router.get('login', [AuthController, 'create'])
router.post('login', [AuthController, 'store'])

/**
 * Authenticated Routes (with auth middleware)
 */
router
  .group(() => {
    // Posts
    router.post('posts', [PostsController, 'store'])
    router.get('posts/:id/edit', [PostsController, 'edit'])
    router.patch('posts/:id', [PostsController, 'update'])
    router.delete('posts/:id', [PostsController, 'destroy'])

    // Likes
    router.post('posts/:id/likes', [PostLikesController, 'store'])
    router.delete('posts/:id/likes', [PostLikesController, 'destroy'])

    // Logout
    router.delete('logout', [AuthController, 'destroy'])
  })
  .middleware(middleware.auth())

/**
 * User Profile
 */
router.get(':username', [UserProfileController, 'index'])
