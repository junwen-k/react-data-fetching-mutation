## Overview

This example uses `react-query` and `ky` to fetch and mutate data in a client-side React app. Upon successfully adding a new post, `invalidateQueries` is used to refetch the posts, ensuring the data stays up-to-date.